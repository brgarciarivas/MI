import React from 'react';

import Base from './Base.jsx';

export default class Footer extends Base {
    constructor(props) {
        super(props);
    }
   
    render() {


        return (
            <div className='Footer'>
                <div className='content-container'>
                    <div className='logo-container'>
                        <div className='logo'/>
                        <p>Setcoins</p>
                    </div>
                    <p>© 2018 Copyright Setcoins</p>
                    <p>Made in South Florida</p>
                </div>
            </div>
        );
    }
}

