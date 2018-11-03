import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class Dashboard extends Base {
    render() {
        return (
            <div className='Dashboard'>
                <h6>Dashboard</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
