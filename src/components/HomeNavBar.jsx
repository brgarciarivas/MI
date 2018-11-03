import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group';
import { push, goBack } from 'connected-react-router';

import Base from './Base';

import { NAV_OPTIONS_MENU } from '../constants';

const NavTile = (props) => {

    const iconStyle = {
        backgroundImage: `url("${props.img}")`
    }

   
    return (
        <div
            className={'navTile ' + (props.selected ? 'active' : '')}
            onClick={() => props.handleNavTileClick(props.route, props.title)}
        >
            <div 
                className='icon-img'
                style={iconStyle}
            />
            <p>{props.title}</p>
        </div>
    )
}

const AnimationContainer = (props) => {
    return (
        <div className='AnimationContainer'>
            {props.children}
        </div>
    )
   
}
class HomeNavBar extends Base {
    handleNavTileClick = (route, title) => {
        //mixpanel.track(title + ' Tab clicked');
        this.props.jumpTabs(route);
    }

    render() {
    
        return (
           
            <div className='HomeNavBar'>
                <div className='logo-contianer'>
                    <div className='logo'/>
                </div>
                <CSSTransition
                    classNames='home-nav'
                    appear
                    in
                    timeout={2000}
                >
                    <AnimationContainer>
                        <div className={'buffer ' + (this.props.homeHeaderVisibility ? 'show' : 'hide')} />
                        
                        {
                            NAV_OPTIONS_MENU.map((d, i) => 
                                <NavTile 
                                    {...d}
                                    key={'navTile-' + i}
                                    selected={this.props.location.pathname.indexOf(d.route) != -1}
                                    handleNavTileClick={this.handleNavTileClick}
                                /> 
                            )
                        }
                    </AnimationContainer>
                </CSSTransition>
            </div>
            
        );
    }
}

const mapStateToProps = ({ environment, router }) => {
    return {
        homeHeaderVisibility: environment.homeHeaderVisibility,
        ...router,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        jumpTabs: (route) => dispatch(push(route))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);
