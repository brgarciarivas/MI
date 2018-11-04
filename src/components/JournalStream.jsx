import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Base from './Base';
import VideoPane from './VideoPane';

class JournalStream extends Base {
    handleRecordClick = () => {
        console.log('handleRecordClick');
    }
    render() {
        return (
            <div className='JournalStream'>
                <VideoPane isJournalist={true} roomName={this.props.roomName}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(JournalStream);
