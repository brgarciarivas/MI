import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class HomeNavBar extends Base {
    render() {
        return (
            <div className='HomeNavBar'>
                <div className='row align-center'>
                    <div className='avatar'/>
                    <div className='nav-section'>
                        <p>Dashboard</p>
                        <p>Profile</p>
                        <p>Settings</p>
                    </div>
                </div>
                <div className='searhbar' />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);
