import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons';

import CoinDisplay from './CoinDisplay';
import DropDown from './DropDown';

import { updateSelectedCoin } from '../reducers/coin';
import { fetchCoinData } from '../reducers/chart';
import { showSelectedLockedCoinOverlay, toggleSelectedLockedCoin } from '../reducers/environment';


class CoinSelectionDropDown extends React.Component {
   
    handleClickedCoin(unlocked, coin) {

        console.log('handleClickedCoin');
        console.log('unlocked', unlocked);
        console.log('coin', coin);
        const {
            fetchCoinData, 
            showSelectedLockedCoinOverlay,
            toggleSelectedLockedCoin
        } = this.props;

        if (unlocked) {
            fetchCoinData(coin.id);
        } else {
            toggleSelectedLockedCoin(coin);
            showSelectedLockedCoinOverlay();
        }
    }
    renderAllCoinTIle() {

        const {
            subscription,
            purchasedCoins,
            allCoins,
            selectedCoin,
            fetchCoinData,
            showSelectedLockedCoinOverlay,

        } = this.props;

        return allCoins.map((d, i) => {
            let unlocked = false;

            function findPurchasedCoin(c, i) {
                return c.coin.id == d.id
            }
            
            if (subscription !== null) {
                unlocked = true;
            } else if ( purchasedCoins.find(findPurchasedCoin) !== undefined) {
                unlocked = true;
            }

            const imageStyle = {
                backgroundImage: `url("${d.image_url}")`
            }

            
            return (
                <div 
                    key={'CoinSelection-' + i}
                    className={'body-tiles ' + (selectedCoin.id == d.id ? 'selected' : '')}
                    onClick={() => this.handleClickedCoin(unlocked, d)}
                >
                    <CoinDisplay 
                        name={d.name}
                        tickerSymbol={d.ticker_symbol}
                        imageUrl={d.image_url}
                        displayTicker
                    />
                    {
                        !unlocked &&
                        <FontAwesomeIcon 
                            className={'header-icon'}
                            icon={faLock}
                        />
                    }   
                </div>
            )
        })
    }   


    render() {
        const {
            selectedCoin: {
                name,
                tickerSymbol,
                image_url,

            }
        } = this.props;

        return (
            <div className='CoinSelectionDropDown'>
                <DropDown 
                    header={
                        <DropDown.Header 
                            name={name}
                            tickerSymbol={tickerSymbol}
                            imageUrl={image_url}
                        />
                    }
                    borderColor={'#42C3F7'}
                    body={this.renderAllCoinTIle()}
                >
                    
                </DropDown>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, coin }) => {

    return {
        subscription: auth.user.subscription,
        purchasedCoins: auth.user.purchasedCoins,
        selectedCoin: coin.selectedCoin,
        allCoins: coin.allCoins,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCoinData: (id) => dispatch(fetchCoinData(id)),
        updateSelectedCoin: (coin) => dispatch(updateSelectedCoin(coin)),
        showSelectedLockedCoinOverlay: () => dispatch(showSelectedLockedCoinOverlay()),
        toggleSelectedLockedCoin: (coin) => dispatch(toggleSelectedLockedCoin(coin)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinSelectionDropDown);
