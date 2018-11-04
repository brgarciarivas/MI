import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class DashboardPage extends Base {
    render() {
        return (
            <div className='DashboardPage'>
                <h6>DashboardPage</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
