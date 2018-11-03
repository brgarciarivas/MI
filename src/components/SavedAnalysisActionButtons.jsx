import React from 'react';

import Button from './Button';

const SavedAnalysisActionButtons = (props) => {
    
    return (
        <div className='SavedAnalysisActionButtons'>
            {props.children}
        </div>
    );
}


export default SavedAnalysisActionButtons
