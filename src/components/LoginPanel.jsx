import React from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'connected-react-router';

import Button from './Button';
import Base from './Base';
import TextInput from './TextInput';
import BasicCustomForm from './BasicCustomForm';

import { validateLogin as validate } from '../scripts/validation';

export const LOGIN_FORM_FIELDS = [
    {
        type: 'text',
        component: TextInput,
        className: 'login-fields',
        label: 'Email',
        name: 'emailAddress',
    },
    {
        type: 'passwrod',
        component: TextInput,
        className: 'login-fields',
        label: 'Password',
        name: 'password',
    }
]

class LoginPanel extends Base {
    handleUserLogin= (values) => {
        console.log('handleUserLogin', values);
        this.props.goToDashboard();
    }
    render() {
        return (
            <div className='LoginPanel'>
                <div className='row '>
                    <div className='form-container flex'>
                       
                        <div className='login-form-con'>
                            <h1>Welcome to MI</h1>
                            <BasicCustomForm 
                                title='User Login'
                                buttonText='Login'
                                customInputs={LOGIN_FORM_FIELDS}
                                onSubmit={this.handleUserLogin}
                                validate={validate}
                                form={'login-form'}
                            />
                        </div>
                    </div>
                    <div className='more'/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToDashboard: () => dispatch(push('/home')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel);
