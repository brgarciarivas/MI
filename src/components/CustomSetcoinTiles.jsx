import React from 'react';

import Base from './Base';

export default class CustomSetcoinTiles extends Base {
    render() {

        return (
            <div className={'CustomSetcoinTiles ' + this.props.className}>
                 <div className='social-tiles'>
                    <div className='top'>
                        <div className='tile-container one'>
                            <p>Ethereum</p>
                            <div className='white-bg '>
                                <div 
                                    className='inner sm'
                                    id='eth'
                                >
                                </div>
                            </div>
                        </div>
                        <div className='tile-container two'>
                            <p>Ripple</p>
                            <div className='white-bg '>
                                <div 
                                    className='inner md'
                                    id='xrp'
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='tile-container there'>
                            <p>Bitcoin</p>
                            <div className='white-bg '>
                                <div 
                                    className='inner md'
                                    id='btc'
                                >
                                    
                                </div>
                            </div>
                        </div>
                        <div className='tile-container four'>
                            <p>Monero</p>
                            <div className='white-bg '>
                                <div 
                                    className='inner sm'
                                    id='xmr'
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

