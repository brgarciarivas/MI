import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class JournalNavigation extends Base {
    render() {
        return (
            <div className='JournalNavigation'>
                <h6>JournalNavigation</h6>
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
