import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPaperPlane, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

import Base from './Base';
import Button from './Button';
import SavedAnalysisActionButtons from './SavedAnalysisActionButtons';
import SavedComparisonText from './SavedComparisonText';
import SavedComparisonChartContainer from './SavedComparisonChartContainer';

import { toggleSelectedComparison, fetchSelectedComparison, deleteSavedComparison, resetSelectedComparisonState, fetchSelectedComparisonCoinChartData } from '../reducers/compare';

class SavedComparisonInfo extends Base {
    componentWillMount() {
        console.log('SavedAnalysisInfo -> componentWillMount')
        console.log(this.props);
        if (this.props.selectedComparison == null) {
            this.props.fetchSelectedComparison(this.props.match.params.comparisonId);
        } else {
            const params = {
                firstCoinId: this.props.selectedComparison.firstCoin.id,
                secondCoinId: this.props.selectedComparison.secondCoin.id,
                selectedMetric: this.props.selectedComparison.selected_metric,
            }
            this.props.fetchSelectedComparisonCoinChartData(params)
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('SavedAnalysisInfo -> componentWillReceiveProps')
        console.log(nextProps);
        console.log(this.props)

    }
    componentWillUnmount() {
        console.log('SavedAnalysisInfo componentWillUnmount');
        console.log(this.props);
        this.props.resetSelectedComparisonState();
    }
    render() {
        console.log('SavedComparisonInfo');
        console.log(this.props)
        //let alreadySavedComparison = this.props.selectedComparison
        return (
            <div className='SavedComparisonInfo'>
                
                <div className='background' />
                <div 
                    className='icon-container'
                    onClick={() => this.props.goToComparePage()}
                >
                    <FontAwesomeIcon 
                        className={'exit-icon'}
                        icon={faTimes}
                    />
                </div>
                <div className='SavedComparisonInfo-container row'>
                    <div className='column info-container'>
                        <SavedComparisonText {...this.props.selectedComparison}/>
                        <SavedAnalysisActionButtons>
                            <Button 
                                className='first'
                            >
                                <FontAwesomeIcon 
                                    className={'icon'}
                                    icon={faPaperPlane}
                                />
                                <p>Share</p>
                            </Button>
                            {
                                this.props.selectedComparison != null ?
                                    <Button 
                                        className='second'
                                        onClick={() => this.props.deleteSavedComparison(this.props.selectedComparison.id)}
                                    >
                                        <FontAwesomeIcon 
                                            className={'icon'}
                                            icon={faTrash}
                                        />
                                        <p>Delete</p>
                                    </Button>
                                : 
                                    null
                            }
                            
                        </SavedAnalysisActionButtons>
                    </div>
                    <SavedComparisonChartContainer />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ compare }, props) => {
    return {
        ...compare
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSavedComparison: (id) => dispatch(deleteSavedComparison(id)),
        fetchSelectedComparison: (id) => dispatch(fetchSelectedComparison(id)),
        fetchSelectedComparisonCoinChartData: (params) => dispatch(fetchSelectedComparisonCoinChartData(params)),
        goToComparePage: () => dispatch(push('/home/compare')),
        resetSelectedComparisonState: () => dispatch(resetSelectedComparisonState()),
        toggleSelectedComparison: (comparison) => dispatch(toggleSelectedComparison(comparison)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedComparisonInfo);
