import React from 'react';
import { CSSTransition } from 'react-transition-group';

import SavedSwitchContainer from './SavedSwitchContainer';
import { SavedHeader, SavedRowItem, StartRowSection, EndRowSection } from './SavedHeader';

import SavedComparisonsContainer from './SavedComparisonsContainer';


const SavedComparisons = (props) => {
   
    return (
        <div className='SavedComparisons'>
            <SavedSwitchContainer 
                title='Saved Comparisons'
            />
            <CSSTransition
                in={props.savedTileType}
                classNames='drop'
                appear
                timeout={{
                    enter: 600,
                    exit: 600,
                }}
            >
                <SavedHeader>
                    <StartRowSection>
                        <SavedRowItem
                            className=''
                        >
                            <p>Cryptocurrency One</p>
                        </SavedRowItem>
                        <SavedRowItem
                            className=''
                        >
                            <p>Cryptocurrency Two</p>
                        </SavedRowItem>
                        <SavedRowItem
                            className=''
                        >
                            <p>Metric</p>
                        </SavedRowItem>
                       
                        
                    </StartRowSection>
                    <EndRowSection>
                        <SavedRowItem
                            className=''
                        >
                            <p>Saved on</p>
                        </SavedRowItem>
                        <SavedRowItem 
                            className='action'
                        >
                            <p>Actions</p>
                        </SavedRowItem>
                    </EndRowSection>
                </SavedHeader>
            </CSSTransition>
            <SavedComparisonsContainer />
        </div>
    );
    
}


export default SavedComparisons
