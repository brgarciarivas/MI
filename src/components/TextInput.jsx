import React from 'react';

const TextInput = ((props) => {
    const { input, meta: { touched, error }, name, label, text, type, className, disabled } = props;
    
    let disabledStatus = disabled ? 'disabled' : 'enabled';

    return (
        <div className={`TextInput column ${className}`}> 
            <input 
                {...input}  
                disabled={disabled}
                required
                className='input_fields'
                type={type}
            />
            <span className='bar'/>
            <label
                htmlFor={name} 
                className={`main_label ${disabledStatus} `}

            >
                {label}
            </label>
            {
                touched && (error && <label htmlFor={name} className='error_label'>{error}</label>)
            }
            {
                touched && (error && <span className='error_bar'/>)
            }      
        </div>
    );
}) 

export default TextInput;