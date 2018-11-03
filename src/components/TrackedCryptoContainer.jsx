import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faPlane, faTrash, faLock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import numeral from 'numeral';

import Base from './Base';
import CoinDisplay from './CoinDisplay';
import { SavedRowItem, StartRowSection, EndRowSection } from './SavedHeader';
import SavedRowTile from './SavedRowTile';
import SavedRowAction from './SavedRowAction';

import { showSelectedLockedCoinOverlay, toggleSelectedLockedCoin } from '../reducers/environment';

class TrackedCryptoContainer extends Base {
    handleClickedCoin(unlocked, coin) {

        const {
            showSelectedLockedCoinOverlay,
            toggleSelectedLockedCoin
        } = this.props;

        if (unlocked) {
            console.log('unlocked');

        } else {
            toggleSelectedLockedCoin(coin);
            showSelectedLockedCoinOverlay();
        }
    }

    render() {
        console.log('TrackedCryptoContainer');
        console.log(this.props)
        const {
            allCoins,
            previousAllCoins
        } = this.props;
        return (
            <div className='TrackedCryptoContainer'>
                <div className='column'>

                    {
                        this.props.previousAllCoins.length > 0 &&
                        this.props.allCoins.map((d, i) => {

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
                            
                            const handleClick = unlocked ? (id) => console.log(id) : showSelectedLockedCoinOverlay;


                            return (
                                <CSSTransition
                                    key={'savedContainerRow-' + i}
                                    timeout={2000 + ( i * 10)}
                                    classNames={'row'}
                                    in={this.props.savedTileType}
                                    appear
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <SavedRowTile
                                        onClick={() => this.handleClickedCoin(unlocked, d)}
                                    >
                                        <StartRowSection>
                                            <SavedRowItem>
                                                <CoinDisplay 
                                                    name={d.name}
                                                    tickerSymbol={d.ticker_symbol}
                                                    imageUrl={d.image_url}
                                                    displayTicker
                                                />
                                            </SavedRowItem>
                                            <SavedRowItem>
                                                <CSSTransition
                                                    timeout={1000}
                                                    classNames={'track'}
                                                    in={d.marketCap != previousAllCoins[i].marketCap}
                                                    appear
                                                >
                                                    <p>{numeral(d.marketCap).format('$0,0.00')}</p>
                                                </CSSTransition>
                                            </SavedRowItem>
                                            <SavedRowItem>
                                                <CSSTransition
                                                    timeout={1000}
                                                    classNames={'track'}
                                                    in={d.price != previousAllCoins[i].price}
                                                    appear
                                                >
                                                    <p>{numeral(d.price).format('$0,0.000')}</p>
                                                </CSSTransition>
                                            </SavedRowItem>
                                            <SavedRowItem>
                                                <CSSTransition
                                                    timeout={1000}
                                                    classNames={'track'}
                                                    in={d.volume != previousAllCoins[i].volume}
                                                    appear
                                                >
                                                    <p>{numeral(d.volume).format('$0,0.00')}</p>
                                                </CSSTransition>
                                            </SavedRowItem>


                                        </StartRowSection>
                                        <EndRowSection>
                                            <SavedRowItem className='last'>
                                                <SavedRowAction
                                                    className='tracked-action'
                                                    actionData={() => handleClick(d.id)}
                                                >
                                                    <FontAwesomeIcon 
                                                        className={'row-icon'}
                                                        icon={unlocked ? faEllipsisV : faLock}
                                                    />
                                                </SavedRowAction>
                                            </SavedRowItem>
                                        </EndRowSection>
                                    </SavedRowTile>
                                </CSSTransition>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, coin, environment }) => {
    return {
        subscription: auth.user.subscription,
        purchasedCoins: auth.user.purchasedCoins,
        savedTileType: environment.savedTileType,
        allCoins: coin.allCoins,
        previousAllCoins: coin.previousAllCoins,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showSelectedLockedCoinOverlay: () => dispatch(showSelectedLockedCoinOverlay()),
        toggleSelectedLockedCoin: (coin) => dispatch(toggleSelectedLockedCoin(coin)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackedCryptoContainer);
