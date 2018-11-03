import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import Base from './Base';
import Button from './Button';

const SocialMeidaLogins = (props) => {
    
    return (
        <div className='SocialMeidaLogins'>
            {props.children}
            <Button
                onClick={props.handleFacebook}
                style={{backgroundColor: '#3B5998'}}
                className='facebook'
            >
                <div className='row'>
                    <p style={{marginRight: 6}}>{props.facebookButtonText}</p>
                    <FontAwesomeIcon 
                        className={'social-icon'}
                        icon={faFacebook}
                        size={'lg'}
                    />
                </div>
            </Button>
        </div>
    );
    
}

export default SocialMeidaLogins