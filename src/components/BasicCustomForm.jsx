import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import Base from './Base';
import Button from './Button';
    
let BasicCustomForm = ((props) => {

    console.log('BasicCustomForm');
    console.log(props)
    function componentWillMount() {
        console.log('testing shit may not work')
    }

    function renderInputs(inputData) {
        return inputData.map((d, i) => {
            return (
                <Field 
                    {...d}
                    key={`${d.name}-${i}`}
                />
            )
        })
    }

    const {
        handleSubmit,
        valid,
        formError,
    } = props;

    let validStatus = valid ? 'valid' : 'invalid';

    return (
        <div className='BasicCustomForm'>
            <form 
                className='BasicCustomForm-form'
                onSubmit={handleSubmit(props.onSubmit)}
            >  
                <p>{props.title}</p>
                {formError !== null && <p className='err'>{formError}</p>}
                {renderInputs(props.customInputs)}
                <Button
                    onClick={handleSubmit(props.onSubmit)}
                    type='submit'
                    className={'basic-custom-form-button ' + validStatus}
                >
                    <p>{props.buttonText}</p>
                </Button>
            </form>
        </div>
    );
})


BasicCustomForm.propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    customInputs: PropTypes.arrayOf(PropTypes.object),
};

export default BasicCustomForm = reduxForm({forceUnregisterOnUnmount: true })(BasicCustomForm);

