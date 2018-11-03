import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import Base from './Base';
import SetcoinsChart from './SetcoinsChart';

import { createChartData } from '../scripts';

//moment(params.investmentDate, 'YYYY-MM-DD').format('X'),

class SavedComparisonChartContainer extends Base {

    renderChartData() {
        const {
            selectedComparisonCoinChartData: {
                firstCoin,
                secondCoin,
                selectedMetric,
            },
            selectedComparison: {
                end_range_time,
                start_range_time,
                first_coin_value,
                second_coin_value
            },
        } = this.props;

        var testFirstDate = moment.unix(start_range_time / 1000)
        var testSecondDate = moment.unix(end_range_time / 1000)

        console.log('testFirstDate');

        console.log(testFirstDate);
        console.log(testSecondDate);
        var dateDifference = testSecondDate.diff(testFirstDate, 'days');
        
        const firstCoinChartModel = {
            startRange: start_range_time,
            endRange: end_range_time,
            rangeDiff: dateDifference,
            chartData: firstCoin,
            metricType: selectedMetric
        };

        const secondCoinChartModel = {
            startRange: start_range_time,
            endRange: end_range_time,
            rangeDiff: dateDifference,
            chartData: secondCoin,
            metricType: selectedMetric
        }

        var firstCoinChartData = createChartData(firstCoinChartModel);
        var secondCoinChartData = createChartData(secondCoinChartModel);

        let data = {
            labels: firstCoinChartData.xValue,
            
                
            datasets: [
                {
                    fill: false,
                    backgroundColor: '#154D7B',
                    borderColor: '#154D7B',
                    data: firstCoinChartData.yValue,
                    datasetKeyProvider: 'firstCoin',
                    label: `${this.props.selectedComparison.firstCoin.name}  ${numeral(first_coin_value).format('0,0.00')}`,
                   

                },
                {
                    backgroundColor: '#027748',
                    borderColor: '#027748',
                    fill: false,
                    data: secondCoinChartData.yValue,
                    datasetKeyProvider: 'secondCoin',
                    label: `${this.props.selectedComparison.secondCoin.name}  ${numeral(second_coin_value).format('0,0.00')}`,
                    
                }
            ]
        };

        console.log('final shit yaayay');
        console.log(firstCoinChartData);
        console.log(secondCoinChartData);

        console.log(data)
        return data
    }

    renderChartOptions() {
        console.log('renderChartOptions');
        console.log(this.props);

        var testOptions = {
            title: {
                display: false,
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        let labelValue = numeral(tooltipItem.yLabel).format('0,0.00');
                        return labelValue
                    }
                }
            },
            legend: {
                display: true,
                labels: {
                    fontColor: '#102131',
                    fontSize: 12,
                    boxWidth: 40,

                }
               
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: false,
                        fontColor: '#102131',
                        callback: function(label, index, labels) {
                            let labelValue = numeral(label).format('0.a')
                            return labelValue
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: '#102131'
                    }
                }]
            }
           
        };

        const metricTypeId = this.props.selectedComparisonCoinChartData.selectedMetric.id;

        if ( metricTypeId == 1 ) {

            const newTick = function(label, index, labels) {
                const labelValue = numeral(label).format('($ 0.00 a)')
                return labelValue
            }

            const tooltipsLabel = function(tooltipItem, data) {
                const labelValue = numeral(tooltipItem.yLabel).format('$0,0.00');
                return labelValue
            }

            testOptions.tooltips.callbacks.label = tooltipsLabel;
            testOptions.scales.yAxes[0].ticks.callbacks = newTick;
        }

        return testOptions;
    }
   
    render() {
        const {
            selectedComparisonCoinChartData,
            selectedComparison
        } = this.props

        console.log('SavedComparisonChartContainer');
        console.log(this.props)
      
        return (
            <div className='SavedComparisonChartContainer'>
                <div className='chart-info-header'>
                    <h3>About {selectedComparison !== null ? selectedComparison.selected_metric : ''}</h3>
                    <p>{selectedComparisonCoinChartData.selectedMetric !== null ? selectedComparisonCoinChartData.selectedMetric.description : ''}</p>
                </div>
                <div className='chart-container'>
                    {
                        selectedComparisonCoinChartData.firstCoin.length > 0 ?
                          
                            <SetcoinsChart 
                                data={this.renderChartData()} 
                                options={this.renderChartOptions()}
                            />
                            
                        :
                            <div className='show-loadeer'>
                                loader
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ compare }) => {
    return {
        ...compare
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedComparisonChartContainer);
