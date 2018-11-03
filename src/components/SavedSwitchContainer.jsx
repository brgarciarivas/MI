import React from 'react';
import SavedAnalysisSwitcher from './SavedAnalysisSwitcher';


const SavedSwitchContainer = (props) =>  {
    return (
        <div className='SavedSwitchContainer'>
            <h5>{props.title}</h5>
            <SavedAnalysisSwitcher/>
        </div>
    );
    
}

export default SavedSwitchContainer;