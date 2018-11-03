import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Base from './Base';
import Button from './Button';
import { HomeContainer, Section } from './Home';
import ChartHeader from './ChartHeader';
import CoinSelectionDropDown from './CoinSelectionDropDown';
import IntervalSelection from './IntervalSelection';
import DateRangeSelector from './DateRangeSelector';
import SecondCoinSelectionDropDown from './SecondCoinSelectionDropDown';
import AnalyzeTypeDropDown from './AnalyzeTypeDropDown';
import ComparisonChartContainer from './ComparisonChartContainer';
import SavedComparisons from './SavedComparisons';
import SavedComparisonInfo from './SavedComparisonInfo';


import { fetchSecondCoinData, savedComparison } from '../reducers/compare';

import { createChartData } from '../scripts';


class ComparisonPage extends Base {

    componentWillMount() {
        console.log('ComparisonPage -> componentWillMount')
        this.props.fetchSecondCoinData(this.props.selectedSecondCoin.id);
    }

    handleSaveComparisonClick = () => {
        
        const {
            metricType,
            dateRange,
            userId,
            firstCoin,
            secondCoin,
        } = this.props;

        const firstCoinChartModel = {
            startRange: dateRange[0].format('x'),
            endRange: dateRange[1].format('x'),
            rangeDiff: dateRange[1].diff(dateRange[0], 'days'),
            chartData: this.props.firstCoin[metricType.value],
            metricType: metricType
        };

        const secondCoinChartModel = {
            startRange: dateRange[0].format('x'),
            endRange: dateRange[1].format('x'),
            rangeDiff: dateRange[1].diff(dateRange[0], 'days'),
            chartData: this.props.secondCoin[metricType.value],
            metricType: metricType
        }

        var firstCoinChartData = createChartData(firstCoinChartModel);
        var secondCoinChartData = createChartData(secondCoinChartModel);

       

        let firstCoinLength = firstCoinChartData.yValue.length - 1;
        let secondCoinLength = secondCoinChartData.yValue.length - 1;

       


        const params = {
            userId: userId,
            firstCoinId: firstCoin.coinId,
            secondCoinId: secondCoin.coinId,
            chartImageUrl: '',
            selectedMetric: metricType.title,
            startRangeTime: dateRange[0].format('x'),
            endRangeTime: dateRange[1].format('x'),
            firstCoinValue: firstCoinChartData.yValue[firstCoinLength],
            secondCoinValue: secondCoinChartData.yValue[secondCoinLength],
        }

       

        this.props.savedComparison(params);


    }
    render() {
        return (
            <div className='ComparisonPage'>
                <Section
                    className='first-section'
                >
                    <Route 
                        path='/home/compare/comparison/:comparisonId'   
                        children={(props) => ( 
                                <CSSTransition
                                    in={location.pathname.indexOf('comparison') != -1}
                                    classNames='saved'
                                    appear
                                    timeout={2000}
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <SavedComparisonInfo {...props}/>
                                </CSSTransition>
                            )
                        }
                    />
                    <ChartHeader>
                        <CoinSelectionDropDown />
                        <SecondCoinSelectionDropDown />
                        <AnalyzeTypeDropDown 
                            borderColor={'#F97137'}
                        />
                        <IntervalSelection />
                       
                        <DateRangeSelector />
                        <Button
                            className='save-button draw'
                            onClick={this.handleSaveComparisonClick}
                        >
                           
                            <p>Save</p>
                            <FontAwesomeIcon 
                                className={'social-icon'}
                                icon={faCheck}
                                size={'lg'}
                            />
                            
                        </Button>
                    </ChartHeader>
                    <ComparisonChartContainer />
                </Section>
                <Section
                    className='second-section'
                >
                    <FontAwesomeIcon 
                        className={'down-icon'}
                        icon={faArrowDown}
                        size={'lg'}
                    />
                    <SavedComparisons 
                        savedTileType={this.props.savedTileType}
                    />
                </Section>
            </div>
        );
    }
}

const mapStateToProps = ({ analyze, auth, chart, coin, compare, environment }) => {
    return {
        dateRange: chart.dateRange,
        firstCoinId: coin.selectedCoin.id,
        metricType: chart.metricType,
        selectedSecondCoin: compare.selectedSecondCoin,
        savedTileType: environment.savedTileType,
        userId: auth.user.id,
        firstCoin: {
            price: chart.price,
            contributionFrequency: chart.contributionFrequency,
            activeContributors: chart.activeContributors,
            marketCap: chart.marketCap,
            volume: chart.volume, 
            coinId: coin.selectedCoin.id,
        },
        secondCoin: {
            price: compare.price,
            marketCap: compare.marketCap,
            volume: compare.volume,
            contributionFrequency: compare.contributionFrequency,
            activeContributors: compare.activeContributors,
            coinId: compare.selectedSecondCoin.id,
        },
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        savedComparison: (params) => dispatch(savedComparison(params)),
        fetchSecondCoinData: (id) => dispatch(fetchSecondCoinData(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonPage);
