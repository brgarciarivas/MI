import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { DATE_INTERVALS } from '../constants';
import { toggleDateInterval, toggleDateIntervalForAllRange } from '../reducers/chart';

const IntervalTile = (props) => {
    return (
        <div 
            className={'IntervalTile ' + props.selected}
            onClick={props.onClick}
        >
            <div className={'background ' + props.selected}/>

            <p>{props.title}</p>
        </div>
    )
}
 
var IntervalSelection = (props) => {

    return (
        <div className='IntervalSelection'>
            <div className='container'>
                {DATE_INTERVALS.map((d, i) => {
                    const selected = props.dateInterval.id == i ? 'selected' : 'unselected';
                    if (d.title == 'All') {

                        let chartData = props[props.metricType.value];
                        let length = chartData.length;
                        let lastIndex = length - 1;
                      
                        if (chartData.length > 0) {
                            let firstIndex = moment.unix(chartData[0].date / 1000)
                            let secondIndex = moment.unix(chartData[lastIndex].date / 1000)

                            return (
                                <IntervalTile 
                                    {...d}
                                    key={'IntervalTile-' + i}
                                    selected={selected}
                                    onClick={() => props.toggleDateIntervalForAllRange([firstIndex ,secondIndex])}
                                />
                            );
                           
                        } else {
                            return (
                                <IntervalTile 
                                    {...d}
                                    key={'IntervalTile-' + i}
                                    selected={selected}
                                    onClick={() => props.toggleDateInterval(d)}
                                />
                            );
                        }

                    } else {
                        return (

                            <IntervalTile 
                                {...d}
                                key={'IntervalTile-' + i}
                                selected={selected}
                                onClick={() => props.toggleDateInterval(d)}
                            />
                        )
                    }
                   
                })}
            </div>
           
        </div>
    );
    
}

const mapStateToProps = ({ chart }) => {
    return {    
        ...chart,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDateInterval: (type) => dispatch(toggleDateInterval(type)),
        toggleDateIntervalForAllRange: (range) => dispatch(toggleDateIntervalForAllRange(range)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntervalSelection);
