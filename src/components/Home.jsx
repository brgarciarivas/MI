import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Base from './Base';
import HomeNavBar from './HomeNavBar';
import SettingsPage from './SettingsPage';
import AnalyzePage from './AnalyzePage';
import ComparisonPage from './ComparisonPage';
import TrackedPage from './TrackedPage';
import SetAnimate from './SetAnimate';


import { fetchBasicCoinData } from '../reducers/environment';
import { fetchCoinData } from '../reducers/chart';


export const HomeContainer = (props) => {
    return (
        <div className='HomeContainer'>
            {props.children}
        </div>
    )
}

export const Section = (props) => {
    return (
        <div className={'Section ' + props.className}>
            {props.children}
        </div>
    )
}


class Home extends Base {
    componentWillMount() {
        this.props.fetchBasicCoinData();
        this.props.fetchCoinData(this.props.selectedCoin.id);
        
    }
    render() {
        
        const {
            location
        } = this.props;
        const indexRoutePath = this.props.match.path
        return (
            <div className='Home'>
                <HomeNavBar />
                <div className='page-container'>
                    <div className='home-logo'/>
                    <Route 
                        exact 
                        path={'/home'}
                        render={ 
                            () => <Redirect to={'/home/compare'} /> 
                        } 
                    />
                    <Route
                        path={`${indexRoutePath}/analyze`}
                        children={props => {
                            return (
                                <SetAnimate
                                    in={location.pathname.indexOf('analyze') != -1}
                                    classNames='page'
                                    appear
                                    timeout={{
                                        enter: 1000,
                                        exit: 1000,
                                    }}
                                >
                                    <AnalyzePage {...props}/>
                                </SetAnimate>
                            )  
                        }}
                    />
                    <Route
                        path={`${indexRoutePath}/compare`}
                        children={props => {
                            return (
                                <SetAnimate
                                    in={location.pathname.indexOf('compare') != -1}
                                    classNames='page'
                                    appear
                                    timeout={{
                                        enter: 1000,
                                        exit: 1000,
                                    }}
                                >
                                    <ComparisonPage {...props}/>
                                </SetAnimate>
                            )  
                        }}
                    />
                        
                    <Route
                        path={`${indexRoutePath}/cryptos`}
                        children={props => {
                            return (
                                <SetAnimate
                                    in={location.pathname.indexOf('cryptos') != -1}
                                    classNames='page'
                                    appear
                                    timeout={{
                                        enter: 1000,
                                        exit: 1000,
                                    }}
                                    
                                >
                                    <TrackedPage {...props}/>
                                </SetAnimate>
                            )  
                        }}
                    />
                    <Route 
                        path={`${indexRoutePath}/settings`}
                        children={props => {
                            return (
                                <SetAnimate
                                    in={location.pathname.indexOf('settings') != -1}
                                    classNames='page'
                                    appear
                                    timeout={{
                                        enter: 1000,
                                        exit: 1000,
                                    }}
                                   
                                >
                                    <SettingsPage {...props}/>
                                </SetAnimate>
                            )  
                        }}
                    /> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ coin, router, environment }) => {
   
    return {
        location: router.location,
        selectedCoin: coin.selectedCoin,
        mainLoader: environment.mainLoader,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBasicCoinData: () => dispatch(fetchBasicCoinData()),
        fetchCoinData: (id) => dispatch(fetchCoinData(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
