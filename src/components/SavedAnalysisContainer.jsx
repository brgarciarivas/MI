import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import CoinDisplay from './CoinDisplay';
import { SavedRowItem, StartRowSection, EndRowSection } from './SavedHeader';
import SavedRowTile from './SavedRowTile';
import SavedSquareTile from './SavedSquareTile';
import SavedRowAction from './SavedRowAction';

import { changeSelectedAnalysis, delteSavedAnalysis } from '../reducers/analyze';


const SavedAnalysisContainer = (props) => {
   
    return (
        <div className={'SavedAnalysisContainer '}>
            {
                <div className='column'>
                    {props.savedAnalysis.map((d, i) => {

                        const imageStyle = {
                            backgroundImage: `url("${d.coin.image_url}")`
                        }

                        const actionData = [
                            {
                                title: 'Share This Pattern',
                                icon: faPaperPlane,
                                action: () => console.log('share this pattern'),
                            },
                            {
                                title: 'Delete This Pattern',
                                icon: faTrash,
                                action: () => props.delteSavedAnalysis(d.id)
                            }
                        ]
                        return (
                            <CSSTransition
                                key={'savedAnalysisRow-' + i}
                                timeout={2000 + ( i * 10)}
                                classNames={'row'}
                                in={props.savedTileType}
                                appear
                                mountOnEnter
                                unmountOnExit
                            >
                                <SavedRowTile  
                                    onClick={() => props.changeSelectedAnalysis(d)}
                                >
                                    <StartRowSection>
                                        <SavedRowItem
                                            className='first'
                                        >
                                            <CoinDisplay 
                                                name={d.coin.name}
                                                imageUrl={d.coin.image_url}
                                                displayTicker={false}
                                            />
                                        </SavedRowItem>
                                        <SavedRowItem
                                            className=''
                                        >
                                            <p >{d.chart_pattern}</p>
                                        </SavedRowItem>
                                        <SavedRowItem
                                            className=''
                                        >
                                            <p >{d.selected_metric}</p>
                                        </SavedRowItem>
                                        <SavedRowItem
                                            className=''
                                        >
                                            <p>{d.signal_strength}</p>
                                        </SavedRowItem>
                                    </StartRowSection>
                                    <EndRowSection>
                                        <SavedRowItem
                                            className=''
                                        >   
                                            <p className=''>{moment.unix(d.timestamp / 1000).format('MM/DD/YYYY')}</p>
                                        </SavedRowItem>
                                        
                                        
                                        <SavedRowItem className='last'>
                                            <SavedRowAction
                                                className='savedAnalysis-row-action'
                                                actionData={actionData}
                                            >
                                                <FontAwesomeIcon 
                                                    className={'row-icon'}
                                                    icon={faEllipsisV}
                                                />
                                           </SavedRowAction>
                                                
                                        </SavedRowItem>
                                        
                                    </EndRowSection>
                                </SavedRowTile>
                            </CSSTransition>
                        )
                       
                    })}
                </div>
            }
                <div className='row'>
                    {props.savedAnalysis.map((d, i) => {

                        const actionData = [
                            {
                                title: 'Share This Pattern',
                                icon: faPaperPlane,
                                action: () => console.log('share this pattern'),
                            },
                            {
                                title: 'Delete This Pattern',
                                icon: faTrash,
                                action: () => this.props.delteSavedAnalysis(d.id)
                            }
                        ]
                        
                        return (
                            <CSSTransition
                                key={'savedAnalysisSquare-' + i}
                                timeout={2000 + ( i * 10)}
                                classNames={'square'}
                                appear
                                mountOnEnter
                                unmountOnExit
                                in={!props.savedTileType}
                            >
                                <SavedSquareTile  
                                    action={
                                        <SavedRowAction
                                            className='savedAnalysis-row-action'
                                            actionData={actionData}
                                        >
                                            <FontAwesomeIcon 
                                                className={'row-icon'}
                                                icon={faEllipsisV}
                                            />
                                        </SavedRowAction>
                                    }
                                    onClick={() => props.changeSelectedAnalysis(d)}
                                > 
                                    
                                    <div className='title-container'>
                                        <p className='title'>{d.chart_pattern}</p>
                                        <div className='info-container'>
                                            <p>{d.coin.name}</p>
                                            <p className=''>{moment.unix(d.timestamp / 1000).format('MM/DD')}</p>
                                        </div>
                                    </div>
                                </SavedSquareTile>
                            </CSSTransition>
                        )
                       
                    })}
            </div>
        </div>
    );
    
}

const mapStateToProps = ({ analyze, environment }) => {
    return {
        savedTileType: environment.savedTileType,
        savedAnalysis: analyze.savedAnalysis
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSelectedAnalysis: (analysis) => dispatch(changeSelectedAnalysis(analysis)),
        delteSavedAnalysis: (id) => dispatch(delteSavedAnalysis(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAnalysisContainer);
