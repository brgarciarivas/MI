import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import CoinDisplay from './CoinDisplay';
import { SavedRowItem, StartRowSection, EndRowSection } from './SavedHeader';
import SavedRowTile from './SavedRowTile';
import SavedSquareTile from './SavedSquareTile';
import SavedRowAction from './SavedRowAction';

import Base from './Base';

import { toggleSelectedComparison, deleteSavedComparison } from '../reducers/compare';

class SavedComparisonsContainer extends Base {
        

    render() {
        console.log('SavedComparisonsContainer -> this.props');
        console.log(this.props);
        
        return (
            <div className={'SavedComparisonsContainer'}>
                <div className='column'>
                    {
                        this.props.savedComparison.map((d, i) => {
                           
                            
                            const actionData = [
                                {
                                    title: 'Share This Pattern',
                                    icon: faPaperPlane,
                                    action: () => console.log('share this pattern'),
                                },
                                {
                                    title: 'Delete This Pattern',
                                    icon: faTrash,
                                    action: () => this.props.deleteSavedComparison(d.id)
                                }
                            ]
                            return (
                                <CSSTransition
                                    key={'savedContainerRow-' + d.id}
                                    timeout={2000 + ( i * 10)}
                                    classNames={'row'}
                                    in={this.props.savedTileType}
                                    appear
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <SavedRowTile
                                        onClick={() => this.props.toggleSelectedComparison(d)}
                                    >
                                        <StartRowSection>
                                            <SavedRowItem
                                                className='first'
                                            >
                                                <CoinDisplay 
                                                    name={d.firstCoin.name}
                                                    imageUrl={d.firstCoin.image_url}
                                                    displayTicker={false}
                                                />
                                                
                                            </SavedRowItem>
                                            <SavedRowItem
                                                className='name'
                                            >
                                                <CoinDisplay 
                                                    name={d.secondCoin.name}
                                                    imageUrl={d.secondCoin.image_url}
                                                    displayTicker={false}
                                                />
                                            </SavedRowItem>
                                            <SavedRowItem
                                                className=''
                                            >
                                                <p >{d.selected_metric}</p>
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
                                                    className='savedComparison-row-action'
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
                        })
                    }
                </div>
                <div className='row'>
                    {this.props.savedComparison.map((d, i) => {

                        const actionData = [
                            {
                                title: 'Share This Pattern',
                                icon: faPaperPlane,
                                action: function() {
                                    console.log('share this pattern ');
                                },
                            },
                            {
                                title: 'Delete This Pattern',
                                icon: faTrash,
                                action: () => this.props.deleteSavedComparison(d.id)
                            }
                        ]

                        return (
                            <CSSTransition
                                key={'savedComparisonSquare-' + i}
                                timeout={2000 + ( i * 10)}
                                classNames={'square'}
                                appear
                                mountOnEnter
                                unmountOnExit
                                in={!this.props.savedTileType}
                            >
                                <SavedSquareTile
                                    onClick={() => this.props.toggleSelectedComparison(d)}
                                    action={
                                        <SavedRowAction
                                            className='savedComparison-row-action'
                                            actionData={actionData}
                                        >
                                            <FontAwesomeIcon 
                                                className={'row-icon'}
                                                icon={faEllipsisV}
                                            />
                                        </SavedRowAction>
                                    }
                                > 
                                    <div className='title-container'>
                                        <p className='title'>{d.selected_metric}</p>
                                        <div className='info-container'>
                                            <p>{d.firstCoin.name}</p>
                                            <p>{d.secondCoin.name}</p>
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
}

const mapStateToProps = ({ compare, environment }) => {
    return {
        savedComparison: compare.savedComparison,
        savedTileType: environment.savedTileType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSelectedComparison: (comparison) => dispatch(toggleSelectedComparison(comparison)),
        deleteSavedComparison: (id) => dispatch(deleteSavedComparison(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedComparisonsContainer);
