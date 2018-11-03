import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

import Base from './Base';
import Button from './Button';
import SavedAnalysisActionButtons from './SavedAnalysisActionButtons';
import ShareAnalysis from './ShareAnalysis';
import SavedAnalysisText from './SavedAnalysisText';

import { fetchSavedAnalysis, receiveSelectedAnalysis } from '../reducers/analyze';

class SavedAnalysisInfo extends Base {
    componentWillMount() {
        console.log('SavedAnalysisInfo -> componentWillMount')
        console.log(this.props.analyzeId)
        this.props.fetchSavedAnalysis(this.props.match.params.analyzeId);
    }
    componentWillUnmount() {
        console.log('SavedAnalysisInfo componentWillUnmount');
        console.log(this.props);
        this.props.receiveSelectedAnalysis();
    }

    render() {
        console.log('SavedAnalysisInfo');
        console.log(this.props);
        return (
            <div className='SavedAnalysisInfo'>
                
                <div className='background' />
                <div 
                    className='icon-container'
                    onClick={() => this.props.goToAnalyzePage()}
                >
                    <FontAwesomeIcon 
                        className={'exit-icon'}
                        icon={faTimes}
                    />
                </div>
                <div className='SavedAnalysisInfo-container column'>
                    
                    <SavedAnalysisText 
                        {...this.props.selectedAnalysis}
                    />
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
                        <Button 
                            className='second'
                        >
                            <FontAwesomeIcon 
                                className={'icon'}
                                icon={faCheck}
                            />
                            <p>Save</p>
                        </Button>
                    </SavedAnalysisActionButtons>
                </div>
                <div className='buffer'/>
            </div>
        );
    }
}

const mapStateToProps = ({ analyze }, params) => {
    return {
        //analyzeId: params.match.params.analyzeId,
        selectedAnalysis: analyze.selectedAnalysis,
        savedAnalysis: analyze.savedAnalysis,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSavedAnalysis: (id) => dispatch(fetchSavedAnalysis(id)),
        goToAnalyzePage: () => dispatch(push('/home/analyze')),
        receiveSelectedAnalysis: () => dispatch(receiveSelectedAnalysis(null)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedAnalysisInfo);
