import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Base from './Base';
import ChartHeader from './ChartHeader';
import AnalyzeChartContainer from './AnalyzeChartContainer';
import { HomeContainer, Section } from './Home';
import SavedAnalysis from './SavedAnalysis';
import SetAnimate from './SetAnimate';

import CoinSelectionDropDown from './CoinSelectionDropDown';
import AnalyzeTypeDropDown from './AnalyzeTypeDropDown';
import IntervalSelection from './IntervalSelection';
import DateRangeSelector from './DateRangeSelector';

import SavedAnalysisInfo from './SavedAnalysisInfo';


class AnalyzePage extends Base {
    render() {
        const {
            savedTileType 
        } = this.props
        return (
            <div className='AnalyzePage'>
                <Section className='chart-section first-section'>
                    <a className='SavedAnalysisInfo-link '/>
                    <Route 
                        path='/home/analyze/analysis/:analyzeId'   
                        children={(props) => ( 
                                <SetAnimate
                                    in={location.pathname.indexOf('analysis') != -1}
                                    classNames='saved'
                                    appear
                                    timeout={2000}
                                >
                                    <SavedAnalysisInfo {...props}/>
                                </SetAnimate>
                            )
                        }
                    />
                       
                    <ChartHeader>
                        <CoinSelectionDropDown />
                        <AnalyzeTypeDropDown 
                            borderColor={'#F97137'}
                        />
                        <IntervalSelection />
                        <DateRangeSelector />
                    </ChartHeader>  
                    <AnalyzeChartContainer />
                </Section>                    
                <Section
                    className='second-section'
                >
                    <FontAwesomeIcon 
                        className={'down-icon'}
                        icon={faArrowDown}
                        size={'lg'}
                    />
                    <SavedAnalysis 
                        savedTileType={savedTileType}
                    />
                </Section>
            </div>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        savedTileType: environment.savedTileType,  
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzePage);
