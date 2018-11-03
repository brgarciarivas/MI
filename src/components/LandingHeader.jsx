import React from 'react';
import jump from 'jump.js';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Base from './Base.jsx';
import Button from './Button';

class LandingHeader extends Base {
    constructor(props) {
        super(props)
        
    }
    handleNavClick(anchor) {
        console.log('anchor');
        jump( anchor, {
            duration: 1500,
             offset: -230,
        })
    }
    renderNavTiles(navTitle) {
        return navTitle.map((d, i) => {
            return (
                <p
                    key={'nav-tile-'+ i}
                    onClick={() => this.handleNavClick(d.anchor)}
                    className='nav-tile'
                >{d.name}</p>
            );
        })
    }
       
    render() {
        const navTitle = [
            {
                name: 'Platform',
                anchor: '.platform',
            },
            {
                name: 'Summary',
                anchor: '.summary',
            },
            {
                name: 'Features',
                anchor: '.features',                
            },
            {
                name: 'Future',
                anchor: '.future',
            },
            {
                name: 'Contact Us',
                anchor: '.contact',
            },
        ];
        
        return (
            <div className='LandingHeader'>
                <div className='header-logo-con'>
                    <img className='setcoins-logo' src='https://i.imgur.com/L4cgBvg.png'></img>
                    <h1 id='setcoins-landing-header'>Setcoins</h1>
                </div>
                <div className='nav-section'>
                    {this.renderNavTiles(navTitle)}
                    <div className='sign-up-container'>
                        <p 
                            className='login'
                            onClick={() => this.props.push('/welcome/onboard/login')}
                        >
                            Log In
                        </p>
                    </div>
                </div>
                

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (route) => dispatch(push(route))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingHeader);