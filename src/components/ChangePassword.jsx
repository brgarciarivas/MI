import React from 'react';
import { connect } from 'react-redux';
import { push, back } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group';

import Base from './Base';
import BasicCustomForm from './BasicCustomForm';
import { OnboardingContainer, OnboardingForgotPassword, SuccessContainer } from './OnboardingContainer';

import { CHANGE_PASSWORD_INPUTS } from '../constants';
import { validateUpdatePassword } from '../scripts/validation';

import { saveNewPassword } from '../reducers/auth';

class ChangePassword extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handlePasswordSubmit');

    }
    handlePasswordSubmit(value) {
        this.props.saveNewPassword(value.password);
    }
    render() {
        console.log('ChangePassword');
        console.log(this.props)
        return (
            <div className='ChangePassword'>
                <CSSTransition
                    in={location.pathname.indexOf('success') != -1}
                    classNames='overlay'
                    timeout={500}
                >
                    <Route 
                        path={'/home/settings/updatePassword/success'}
                        render={(props) => {
                            return (    
                                <div className='success-state'>
                                    <OnboardingForgotPassword>
                                        <div className='check-container'>
                                            <SuccessContainer/>
                                        </div>
                                       
                                        <p className='success-text'>Password has been updated</p>
                                    </OnboardingForgotPassword>
                                </div>
                            );   
                        }}
                    />
                </CSSTransition>
                <div 
                    className='background'
                    onClick={() => this.props.push('/home/settings')}
                />
                <div className='container'>
                    <BasicCustomForm
                        customInputs={CHANGE_PASSWORD_INPUTS}
                        title='Change Your Password'
                        buttonText='Change Password'
                        formError={this.props.formError}
                        onSubmit={this.handlePasswordSubmit}
                        validate={validateUpdatePassword}
                        form={'forgot-password-form'}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, history }) => {
    return {
        formError: auth.formError,
        history: history,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveNewPassword: (pw) => dispatch(saveNewPassword(pw)),
        push: (route) => dispatch(push(route)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
