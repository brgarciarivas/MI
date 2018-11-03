import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';

const TextArea = (props) => {

    const { input, meta: { touched, error, active }, name, label, placeholder, rows, className, disabled } = props;

    let labelStatus = active ? 'active' : 'inactive';
    let valueStatus = input.value ? 'filled' : 'empty'
    let disabledStatus = disabled ? 'disabled' : 'enabled';
    let errorStatus = touched && error ? 'error' : '';

    return (
        <div className={`TextArea column ${className}`}>
            <p
                htmlFor={name} 
                className={`main_label  ${labelStatus} ${disabledStatus} ${valueStatus} ${errorStatus}` }
            >
                {label}
            </p>
           
            <textarea
                {...input}
                disabled={disabled}
                placeholder={placeholder}
                rows={rows}
                className='input_fields'
            />
            <span className='bar'/>
            {
                touched && (error && <label htmlFor={name} className='error_label'>{error}</label>)
            }
        </div>
    );
} 


export default TextArea;
