import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


import { toggleDateRange } from '../reducers/chart';

const DateTile = (props) => {
    return (
        <div className='DateTile'>
            {props.children}
        </div>
    )
};

var DateRangeSelector = (props) => {

    function handleStartDateChange(date) {
        props.toggleDateRange([date, props.dateRange[1]]);

    }
    function handleEndDateChange(date) {
        props.toggleDateRange([props.dateRange[0], date]);
    }

    const {
        dateRange,
        toggleDateRange
    } = props;

    return (
        <div className='DateRangeSelector'>
            <DateTile>
                <DatePicker
                    selected={dateRange[0]}
                    selectsStart
                    filterDate={(date) => {
                        if (date > dateRange[1]) {
                            return false
                        } else {
                            return moment() > date;
                        }
                        
                    }}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={handleStartDateChange}
                />
            </DateTile>
            <span>-</span>
            <DateTile>
                <DatePicker
                    selected={dateRange[1]}
                    selectsEnd
                    filterDate={(date) => {
                        if (date < dateRange[0]) {
                            return false
                        } else {
                            return moment() > date;
                        }
                        
                    }}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={handleEndDateChange}
                />
            </DateTile>
        </div>
    );
    
}

const mapStateToProps = ({ chart }) => {
    return {
        dateRange: chart.dateRange,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDateRange: (range) => dispatch(toggleDateRange(range))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateRangeSelector);
