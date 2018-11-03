import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class SavedAnalysisTile extends Base {
    render() {
        return (
            <div className='SavedAnalysisTile'>
                <h6>SavedAnalysisTile</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedAnalysisTile);
