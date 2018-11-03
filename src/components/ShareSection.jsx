import React from 'react';
import jump from 'jump.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook, faMedium } from '@fortawesome/free-brands-svg-icons';

import Base from './Base';

export default class ShareSection extends Base {
    constructor(props) {
        super(props);
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
                    key={'share-nav-' + i}
                    onClick={() => this.handleNavClick(d.anchor)}
                    className='nav-tile'
                >{d.name}</p>
            );
        })
    }
    renderSocialTiles(socials) {
        return socials.map((d, i) => {
            return (
                <a 
                    className='social-tile'
                    key={'socialsTile-' + i}
                    href={d.url}
                    rel='nopener noreferrer' 
                    target='_blank'
                >
                    <FontAwesomeIcon 
                        className={'social-icon'}
                        icon={d.faIconName}
                        size={'lg'}
                    />
                </a>
            )
        })
    }
    render() {

        const socialIcon = [
            {
                faIconName: faInstagram,
                url: 'https://www.instagram.com/setcoins/?hl=en'
            },
            {
                faIconName: faTwitter,
                url: 'https://twitter.com/setcoins?lang=en'
            },
            {
                faIconName: faFacebook,
                url: 'https://www.facebook.com/Setcoins/'
            },
            {
                faIconName: faMedium,
                url: 'https://medium.com/setcoins'
            },
        ];
        
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
            <div className='ShareSection'>
                <div className='nav-selection'>
                    {this.renderNavTiles(navTitle)}
                </div>
                <div className='social-location-container'>
                    <p>511 SE 5th Ave, Fort Lauderdale, Florida, 33301</p>
                    <div className='socials-container'>
                        {this.renderSocialTiles(socialIcon)}
                    </div>
                </div>
            </div>
        );
    }
}

