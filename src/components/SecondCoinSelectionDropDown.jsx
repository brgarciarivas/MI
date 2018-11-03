import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons';

import Base from './Base';
import DropDown from './DropDown';
import CoinDisplay from './CoinDisplay';

import { fetchSecondCoinData } from '../reducers/compare';
import { showSelectedLockedCoinOverlay, toggleSelectedLockedCoin } from '../reducers/environment';

class SecondCoinSelectionDropDown extends Base {

    handleClickedCoin(unlocked, coin) {

        console.log('handleClickedCoin');
        console.log('unlocked', unlocked);
        console.log('coin', coin);
        const {
            fetchSecondCoinData, 
            showSelectedLockedCoinOverlay,
            toggleSelectedLockedCoin
        } = this.props;

        if (unlocked) {
            fetchSecondCoinData(coin.id);
        } else {
            toggleSelectedLockedCoin(coin);
            showSelectedLockedCoinOverlay();
        }
    }
    
    renderAllCoinTIle() {
        return this.props.allCoins.map((d, i) => {

            const {
                subscription,
                purchasedCoins,
                showSelectedLockedCoinOverlay
            } = this.props

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
                    className={'body-tiles ' + (this.props.selectedSecondCoin.id == d.id ? 'selected' : '')}
                    onClick={() => this.handleClickedCoin(unlocked, d)}
                >
                    <CoinDisplay 
                        imageUrl={d.image_url}  
                        tickerSymbol={d.ticker_symbol}
                        name={d.name}
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
            selectedSecondCoin: {
                name,
                tickerSymbol,
                image_url,

            }
        } = this.props;

       
        return (
            <div className='SecondCoinSelectionDropDown'>
                <DropDown
                    borderColor={'#108355'}
                    header={<DropDown.Header imageUrl={image_url} name={name} logo tickerSymbol={tickerSymbol}/>}
                    body={this.renderAllCoinTIle()}
                >
                </DropDown>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, coin, compare }) => {
    return {
        subscription: auth.user.subscription,
        purchasedCoins: auth.user.purchasedCoins,
        selectedCoin: coin.selectedCoin,
        allCoins: coin.allCoins,
        selectedSecondCoin: compare.selectedSecondCoin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSecondCoinData: (id) => dispatch(fetchSecondCoinData(id)),
        showSelectedLockedCoinOverlay: () => dispatch(showSelectedLockedCoinOverlay()),
        toggleSelectedLockedCoin: (coin) => dispatch(toggleSelectedLockedCoin(coin)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondCoinSelectionDropDown);
