import React from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const SetcoinsChart = (props) => {
    
    return (
        <div className='SetcoinsChart'>
            <Line 
                data={props.data} 
                options={props.options}
            />
        </div>
    );
    
}


export default SetcoinsChart;