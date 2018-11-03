import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import Base from './Base';
import SetcoinsChart from './SetcoinsChart';

import { createChartData } from '../scripts';

class AnalyzeChartContainer extends Base {
    renderChartData() {
        const {
            metricType,
            dateRange
        } = this.props;


        const chartModel = {
            startRange: dateRange[0].format('x'),
            endRange: dateRange[1].format('x'),
            rangeDiff: dateRange[1].diff(dateRange[0], 'days'),
            chartData: this.props[metricType.value],
            metricType: metricType
        };


        let chartModelData = createChartData(chartModel);

        let data = {
            labels: chartModelData.xValue,
            datasets: [
                {
                    fill: false,
                    backgroundColor: '#42C3F7',
                    borderColor: '#42C3F7',
                  
                    data: chartModelData.yValue
                }
            ]
        };

        return data
    }
    renderChartOptions() {

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
                display: false,
                labels: {
                    fontColor: '#F97137',
                    fontSize: 18
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
                        fontColor: '#ffffff',
                        callback: function(label, index, labels) {
                            let labelValue = numeral(label).format('0.a')
                            return labelValue
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: '#ffffff'
                    }
                }]
            }
           
        };

        const metricTypeId = this.props.metricType.id;

        
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
            metricType,
        } = this.props
        

        return (
            <div className='AnalyzeChartContainer'>
                { 
                    this.props[metricType.value].length > 0 ?
                        <SetcoinsChart 
                            data={this.renderChartData()} 
                            options={this.renderChartOptions()}
                        />
                        
                    :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = ({ analyze, chart }) => {
    return {
        price: chart.price,
        contributionFrequency: chart.contributionFrequency,
        activeContributors: chart.activeContributors,
        marketCap: chart.marketCap,
        volume: chart.volume, 
        dateRange: chart.dateRange,
        metricType: chart.metricType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeChartContainer);
