import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Base from './Base';
import Button from './Button';
import SplashPage from './SplashPage';
import HomePageContent from './HomePageContent';
import CustomSetcoinTiles from './CustomSetcoinTiles';
import LandingHeader from './LandingHeader';
import ShareSection from './ShareSection';
import Footer from './Footer';
import Onboarding from './Onboarding';


export default class LandingPage extends Base {
    constructor(props) {
        super(props);
    }
   
    render() {

        const {
            location,
            match
        } = this.props;

        const currentKey = location.pathname.split('/')[1] || '/'

        return (
            <div className='LandingPage'>
                <Route 
                    path='/welcome/onboard'    
                    children={props => {
                        return (
                            <CSSTransition
                                in={location.pathname.indexOf('onboard') != -1}
                                classNames='overlay'
                                appear
                                timeout={800}
                                mountOnEnter
                                unmountOnExit
                            >
                                <Onboarding {...props} />
                            </CSSTransition>
                        )
                        
                    }} 
                />
    
                <LandingHeader />
                <SplashPage/>
                <HomePageContent>
                    <HomePageContent.RowCon>
                        <a className='platform'/>
                        <HomePageContent.TextCon
                            className='custom shit'
                        >
                            <h3>Designed For The Engaged Investor & Blockchain Explorer</h3>
                            <p>Setcoins was built by recreational cryptoenthusiasts for small to mid-sized investors looking for nothing short of a cutting-edge, innovative, fundamentals focused research platform. Our goal is to provide accurate, insightful investment data to the entire crypto sphere. 
                            </p>
                        </HomePageContent.TextCon>
                        <HomePageContent.AssetCon>
                            <CustomSetcoinTiles />
                        </HomePageContent.AssetCon>

                    </HomePageContent.RowCon>
                    <HomePageContent.RowCon
                        className='reverse'
                    >
                        <a className='summary'/>
                        <HomePageContent.AssetCon>
                            <div className='phone-container'>
                                <div 
                                    className='asset-image phone'
                                    style={{backgroundImage: "url(https://s3.us-east-2.amazonaws.com/setcoins.com/images/IphoneShots.png)"}}
                                />
                            </div>
                        </HomePageContent.AssetCon>
                        <HomePageContent.TextCon
                            className='custom shit'
                        >
                            <div className='right-side text-container'>
                                <h3>Crypto Comparisons & Portfolio Tracking</h3>
                                <p>Directly compare two different cryptocurrencies across multiple fundamental and technical metrics.Use powerful GitHub data to determine which projects have a healthy and active development community. 
                                </p>
                                <p>Add your portfolio to Setcoins to easily monitor all your investments. Never lose track of where you stand as the market moves.
                                </p>
                            </div>
                        </HomePageContent.TextCon>
                    </HomePageContent.RowCon>
                    <HomePageContent.RowCon>
                        <a className='features'/>
                        <HomePageContent.TextCon>
                            <div className='left-side text-container'>
                                <h3>Advanced Chart Pattern Analysis</h3>
                                <p>Setcoins uses the latest machine learning technology to identify technical trading patterns.  Not sure if it’s a good time to buy or sell? Our technical analysis data will help you anticipate where the market is headed to next. 
                                </p>
                            </div>
                        </HomePageContent.TextCon>
                        <HomePageContent.AssetCon
                        >
                            <div className='phone-container'>
                                <div 
                                    className='asset-image sentiment'
                                    style={{backgroundImage: "url(https://s3.us-east-2.amazonaws.com/setcoins.com/images/ChartPatternV3.png)"}}
                                />
                            </div>
                        </HomePageContent.AssetCon>
                    </HomePageContent.RowCon>
                    <HomePageContent.RowCon
                        className='reverse short'
                    >
                        
                        <HomePageContent.AssetCon>
                            <div className='phone-container'>
                                <div 
                                    className='asset-image ipad'
                                    style={{backgroundImage: "url(https://s3.us-east-2.amazonaws.com/setcoins.com/images/IpadAir.png)"}}
                                />
                            </div>
                        </HomePageContent.AssetCon>
                        <HomePageContent.TextCon
                            className=''
                        >
                            <div className='show-text text-container'>
                                <h3>Augmented Reality (AR)</h3>
                                <p>Get ready to experience and interact with blockchains in a brand new form. Investigate the fundamental value of cryptocurrencies by exploring their real use and fundamental statistics in a hands-on manner.
                                </p>
                            </div>
                        </HomePageContent.TextCon>
                    </HomePageContent.RowCon>
                    <HomePageContent.RowCon
                        className='short'
                    >
                        <a className='future'/>
                        <HomePageContent.TextCon>
                            <div className='show-text text-container'>
                                <h3>Where To Next?</h3>
                                <p>Setcoins is developing a revolutionary sentiment analysis tracker. Analyze the public’s general attitude for a cryptocurrency on all social media or narrow your search to a single platform. 
                                </p>
                            </div>
                        </HomePageContent.TextCon>
                        <HomePageContent.AssetCon>
                            <div className='phone-container'>
                                <div 
                                    className='asset-image iphoneNext'
                                    style={{backgroundImage: "url(https://s3.us-east-2.amazonaws.com/setcoins.com/images/SentimentAnalaysis.png)"}}
                                />
                            </div>
                        </HomePageContent.AssetCon>
                    </HomePageContent.RowCon>
                </HomePageContent>
                <div className='end-section-container'>
                    <div className='line'/>
                    <div className='end-text-con'>
                        <div className='text-con'>
                            <p>Setcoins is here to provide the next generation of fintech research tools.
                            </p>
                            <p>Get the mobile app today!</p>
                        </div>

                        <a href="https://itunes.apple.com/us/app/setcoins/id1153859584?mt=8" target="_blank">
                            <div className='button'>
                                <p>iOS App</p>
                            </div>
                        </a>

                    </div>
                    <div className='line'/>
                </div>
                <a className='contact'/>

                <ShareSection />
                <p className='contact-text'>For business inquiries, partnership solicitations, and recruitment opportunities, email <span>contact@sectoins.com</span></p>
                <Footer />

            </div>
        );
    }
}

//
