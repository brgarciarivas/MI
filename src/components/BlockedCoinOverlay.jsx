import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';
import CoinDisplay from './CoinDisplay';
import Button from './Button';

import { togglePurchasOverlay, hidePurchaseOverlay } from '../reducers/environment'

class BlockedCoinOverlay extends Base {
    handlePurchaseButtonClick = () => {

        this.props.hidePurchaseOverlay();
        this.props.togglePurchasOverlay(true);
    }
    showCoinInfo = () => {
        
        const {
            selectedLockedCoin
        } = this.props
       
        return (
            <div className='blocked-coin-container'>
                <CoinDisplay 
                    name={selectedLockedCoin.name}
                    imageUrl={selectedLockedCoin.image_url}
                    className=' locked large'
                    tickerSymbol={selectedLockedCoin.ticker_symbol}
                />
            </div>
        )
        
        
    }
    render() {
        
        const {
            user: {
                subscription
            }
        } = this.props;

        return (
            <div className='BlockedCoinOverlay'>
                {
                    this.showCoinInfo()
                }
                <span>Looks like you've selected a locked coin</span>
                <p>Purchase or Subscribe to see this coin true potential!</p>
                
                <div className='divider'/>
                <div className='button-container'>
                    <Button
                        onClick={() => this.handlePurchaseButtonClick()}
                    >
                        <p>Purchase coin</p>
                    </Button>
                    {
                        subscription == null &&
                        <p className='or'>Or Even Better</p>
                    }   
                    {
                        subscription == null &&
                        <Button
                            onClick={() => this.handlePurchaseButtonClick()}
                        >
                            <p>Purchase Subscription</p>
                        </Button>
                    }
                   
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, environment, coin, }) => {
    return {
        selectedLockedCoin: environment.selectedLockedCoin,
        allCoins: coin.allCoins,
        user: auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hidePurchaseOverlay: () => dispatch(hidePurchaseOverlay()),
        togglePurchasOverlay: (status) => dispatch(togglePurchasOverlay(status)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockedCoinOverlay);
