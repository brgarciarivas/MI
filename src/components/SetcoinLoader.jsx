import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class SetcoinLoader extends Base {
    render() {
        return (
            <div className='SetcoinLoader'>
                <div className='logo-contianer'>
                    <div className='logo'/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        mainLoader: environment.mainLoader
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetcoinLoader);
