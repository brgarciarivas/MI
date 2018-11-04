import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class JournalNavigation extends Base {
    render() {
        return (
            <div className='JournalNavigation'>
               
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

export default connect(mapStateToProps, mapDispatchToProps)(JournalNavigation);
