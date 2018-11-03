import React from 'react';
import { CSSTransition } from 'react-transition-group';

import Base from './Base';
import SavedAnalysisContainer from './SavedAnalysisContainer';
import SavedSwitchContainer from './SavedSwitchContainer';
import { SavedHeader, SavedRowItem, StartRowSection, EndRowSection } from './SavedHeader';


const SavedAnalysis = (props) => {
    
    return (
        <div className='SavedAnalysis'>
            <SavedSwitchContainer 
                title={'Saved Analysis'}
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
                            <p>Cryptocurrency</p>
                        </SavedRowItem>
                        <SavedRowItem
                            className=''
                        >
                            <p>Pattern Found</p>
                        </SavedRowItem>
                        <SavedRowItem
                            className=''
                        >
                            <p>Metric</p>
                        </SavedRowItem>
                        <SavedRowItem
                            className=''
                        >
                            <p>Direction</p>
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
           
            <SavedAnalysisContainer />
        </div>
    );
    
}

export default SavedAnalysis

