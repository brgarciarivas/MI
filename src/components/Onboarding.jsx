import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group';

import Base from './Base';
import Button from './Button';
import BasicCustomForm from './BasicCustomForm';
import { OnboardingContainer, OnboardingForgotPassword, SuccessContainer } from './OnboardingContainer';
import SocialMeidaLogins from './SocialMeidaLogins';

import { LOGIN_FORM_FIELDS, SIGN_UP_FORM_FIELDS, FORGOT_PASSWORD_INPUTS } from '../constants';

import { validateSignUp, validateLogin, validateForgotPassword } from '../scripts/validation';

import { loginWithEmail, clearFomrError, registerWithEmail, loginWithFacebook, forgotPassword } from '../reducers/auth';

class Onboarding extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleSignupSubmit', 'handleLoginSubmit', 'handleFacebook', 'handleForgotPasswordSubmit');

    }
    handleSignupSubmit(values) {
        console.log('handleSignupSubmit');
        console.log(values)
        const params = {
            email: values.signupEmail,
            password: values.signupPassword
        }
        this.props.registerWithEmail(values);
    }
    handleForgotPasswordSubmit(values) {
        this.props.forgotPassword(values.email);
    }
    handleLoginSubmit(values) {
        console.log('handleLoginSubmit');
        console.log(values)
        this.props.loginWithEmail(values);
    }
    handleFacebook() {
        var that = this;

        FB.login(function(res) {
            console.log('Facebook res');
            console.log(res);
            that.props.loginWithFacebook(res.authResponse.accessToken);
        })
    
    }
    componentWillUnmount() {
        this.props.clearFomrError();
    }
    render() {
        console.log('Onboarding');
        console.log(this.props)
        const {
            location,
            match
        } = this.props
        const currentKey = location.pathname.split('/')[1] || '/'
        const timeout = { enter: 300, exit: 200 }
        const forgotPw = location.pathname.indexOf('forgot') !== -1 ? 'shrink' : '';

        const onboardPath = '/welcome/onboard'
        return (
            <div className='Onboarding'>
                <div 
                    className='background'
                    onClick={() => this.props.push('/welcome')}
                />
                <div className={'container ' + forgotPw}>
                    
                        <Switch>
                            <Route 
                                path={`${onboardPath}/login`} 
                                render={(props) => {
                                    return (
                                        <OnboardingContainer 
                                            form={
                                                <BasicCustomForm 
                                                    customInputs={LOGIN_FORM_FIELDS}
                                                    title='Login'
                                                    buttonText='Login'
                                                    formError={this.props.formError}
                                                    onSubmit={this.handleLoginSubmit}
                                                    validate={validateLogin}
                                                    form={'onboard-form'}
                                                />
                                            }
                                            socialMedia={
                                                <SocialMeidaLogins
                                                    handleFacebook={this.handleFacebook}
                                                    facebookButtonText={'Login With Facebook'}
                                                >
                                                    <p className='socials-title-text'>If you don’t already have an account click the button below to create your account.</p>
                                                    <Button 
                                                        onClick={() => this.props.push('/welcome/onboard/signup')}
                                                    >
                                                        <p>CREATE ACCOUNT</p>
                                                    </Button>
                                                    <p className='socials-title-text'>OR</p>
                                                </SocialMeidaLogins>
                                            }
                                            title={
                                                <p className='sub-text'>So you can’t get in to your account?   
                                                    <span
                                                        onClick={() => this.props.push('/welcome/onboard/forgot')}
                                                    >
                                                          Did you forget your password?
                                                    </span>
                                                </p>
                                            }
                                        />
                                    )
                                }}
                            />
                            <Route 
                                path={`${onboardPath}/signup`} 
                                render={(props) => {
                                    return (
                                        <OnboardingContainer 
                                            form={
                                                <BasicCustomForm 
                                                    customInputs={SIGN_UP_FORM_FIELDS}
                                                    title='Create An Account'
                                                    buttonText='Create Account'
                                                    formError={this.props.formError}
                                                    onSubmit={this.handleSignupSubmit}
                                                    validate={validateSignUp}
                                                    form={'onboard-form'}
                                                />
                                            }
                                            socialMedia={
                                                <SocialMeidaLogins
                                                    handleFacebook={this.handleFacebook}
                                                    facebookButtonText={'Login With Facebook'}
                                                >
                                                    <p className='socials-title-text'>Have a Facebook or Google account?</p>
                                                    <p className='socials-title-text'>Use it to login into Setcoins</p>
                                                    <Button 
                                                        onClick={() => this.props.push('/welcome/onboard/login')}
                                                    >
                                                        <p>Login With Email</p>
                                                    </Button>
                                                </SocialMeidaLogins>
                                            }
                                            title={<p className='sub-text'>Welcome to the most advanced cryptocurrency research platform to date!</p>}
                                        />
                                    )
                                }}
                            />
                            <Route 
                                path={`${onboardPath}/forgot`}
                                render={(props) => {
                                    return (    
                                        <OnboardingForgotPassword>
                                            <BasicCustomForm 
                                                customInputs={FORGOT_PASSWORD_INPUTS}
                                                title='Forgot Your Password?'
                                                buttonText='Reset Password'
                                                formError={this.props.formError}
                                                onSubmit={this.handleForgotPasswordSubmit}
                                                validate={validateForgotPassword}
                                                form={'forgot-password-form'}
                                            />
                                            <span
                                                onClick={() => this.props.push('/welcome/onboard/login')}
                                            >Go Back</span>
                                        </OnboardingForgotPassword>
                                    );   
                                }}
                            />
                            <Route 
                                path={`${onboardPath}/success`}
                                render={(props) => {
                                    return (    
                                        <OnboardingForgotPassword>
                                            <div className='check-container'>
                                                <SuccessContainer/>
                                            </div>
                                           
                                            <p className='success-text'>Please Check your email to reset your password</p>
                                        </OnboardingForgotPassword>
                                    );   
                                }}
                            />
                        </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        formError: auth.formError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        push: (route) => dispatch(push(route)),
        loginWithEmail: (params) => dispatch(loginWithEmail(params)),
        registerWithEmail: (params) => dispatch(registerWithEmail(params)),
        clearFomrError: () => dispatch(clearFomrError()),
        loginWithFacebook: (fbToken) => dispatch(loginWithFacebook(fbToken)),
        forgotPassword: (email) => dispatch(forgotPassword(email)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
