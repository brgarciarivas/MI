import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class StreamViewer extends Base {
    render() {
        return (
            <div className='StreamViewer'>
                <h6>StreamViewer</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(StreamViewer);
