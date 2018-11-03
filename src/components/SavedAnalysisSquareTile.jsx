import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class SavedAnalysisSquareTile extends Base {
    render() {
        return (
            <div className='SavedAnalysisSquareTile'>
                <h6>SavedAnalysisSquareTile</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedAnalysisSquareTile);
