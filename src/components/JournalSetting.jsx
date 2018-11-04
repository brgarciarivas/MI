import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class JournalSetting extends Base {
    render() {
        return (
            <div className='JournalSetting'>
                <h6>JournalSetting</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(JournalSetting);
