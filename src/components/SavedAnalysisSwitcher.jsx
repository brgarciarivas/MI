import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTh } from '@fortawesome/free-solid-svg-icons';

import Base from './Base';
import Switcher from './Switcher';


import { toggleSavedTileType } from '../reducers/environment';

class SavedAnalysisSwitcher extends Base {
    handleChange(status) {
        console.log('SavedAnalysisSwitcher handleChange');
        console.log(status);
        this.props.toggleSavedTileType(status)
    }
    render() {
        const {
            savedTileType,
            toggleSavedTileType
        } = this.props;
        return (
            <div className='SavedAnalysisSwitcher'>
                <Switcher 
                    firstOption={
                        <FontAwesomeIcon 
                            className={'switch-icon'}
                            icon={faBars}
                        />
                    }
                    status={savedTileType}
                    secondOption={
                        <FontAwesomeIcon 
                            className={'switch-icon'}
                            icon={faTh}
                        />
                    }
                    handleChange={toggleSavedTileType}
                >
                    {(status) => this.handleChange(status)}
                </Switcher>
            </div>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        savedTileType: environment.savedTileType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSavedTileType: (type) => dispatch(toggleSavedTileType(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAnalysisSwitcher);
