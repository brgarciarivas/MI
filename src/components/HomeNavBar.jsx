import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class HomeNavBar extends Base {
    render() {
        return (
            <div className='HomeNavBar'>
                <h6>HomeNavBar</h6>
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
