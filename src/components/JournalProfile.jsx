import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class JournalProfile extends Base {
    render() {
        return (
            <div className='JournalProfile'>
                <h6>JournalProfile</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(JournalProfile);
