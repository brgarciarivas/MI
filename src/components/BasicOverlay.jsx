import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

class BasicOverlay extends Base {
    render() {
        return (
            <div className='BasicOverlay'>
                <div 
                    className='background'
                    onClick={() => this.props.handleExitClick()}
                />
                <div className={'container ' + this.props.className}>
                    {this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicOverlay);
