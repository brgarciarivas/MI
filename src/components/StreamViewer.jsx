import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';
import VideoPane from './VideoPane';

class StreamViewer extends Base {
    render() {
        return (
            <div className='StreamViewer'>
                <VideoPane isJournalist={false} roomName={this.props.roomName}/>
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
