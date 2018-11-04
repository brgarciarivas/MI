import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class JournalStream extends Base {
    handleRecordClick = () => {
        console.log('handleRecordClick');
        
    }
    render() {
        return (
            <div className='JournalStream'>
                <div 
                    className='record-button'
                    onClick={() => this.handleRecordClick()}
                >

                </div>
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
