import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Route } from 'react-router-dom';

import Base from './Base';
import Button from './Button';
import BasicCustomForm from './BasicCustomForm';
import AccountInfoForm from './AccountInfoForm';
import ChangePassword from './ChangePassword';
import SocialMeidaLogins from './SocialMeidaLogins';
import { HomeContainer, Section } from './Home';

import { validateSettingSupport } from '../scripts/validation';

import { logoutUser } from '../reducers/auth';
import { contactSupport, toggleSupportStatus, toggleAccountInfoStatus, unsubscripeFromStripeSubscription } from '../reducers/environment';

import { SUPPORT_INPUT } from '../constants';

class SettingsPage extends Base {
    constructor(props) {
        super(props);
        this.autoBind('handleSuppportFormSubmit', 'handleFacebookLink');

        // Object.defineProperty(window, '$r', {
        //   writable: false
        // });
    }
    handleSuppportFormSubmit(value) {
        console.log('handleSuppportFormSubmit');
        console.log(value);
        this.props.contactSupport(contactSupport)
    }
    handleFacebookLink() {
        console.log('linked');

    }
    handleSubscription = () => {
        this.props.unsubscripeFromStripeSubscription({ userId: this.props.user.id });
    }
    componentWillUnmount() {
        this.props.toggleSupportStatus(null);
        this.props.toggleAccountInfoStatus(null);
    }
    render() {
            
        const {
            supportStatus,
            user
        } = this.props;

        return (
            <div className='SettingsPage '>
                
                <Section 
                    className='first-section'
                >
                    <h1>Acount Settings</h1>
                    <div className='settings-container'>
                        <div className='inner-container'>
                            <div className='account-info-container'>
                                <h3>Account Information</h3>
                                <AccountInfoForm />
                            </div>
                        {
                            // <h5>Link My Account</h5>
                            // <div className='testing'>
                                
                                    // <SocialMeidaLogins 
                                    //     handleFacebookLink={this.handleFacebookLink}
                                    //     facebookButtonText={'Link Facebook Account'}
                                    // />
                                
                                
                            // </div>
                            // <p className='blue-text'>I want to delink my social media accounts from setcoins</p>
                        }
                            {
                                user.subscription !== null &&
                                <div className='subscription-container'>
                                    <h5>Subscription</h5>
                                    <span
                                        onClick={() => this.handleSubscription()}
                                        className='unsubscribe'
                                    >Unsubscribe from setcoins</span>
                                </div>
                            }
                            <h5>Support</h5>

                            <p className={'supportStatus-text ' + (supportStatus != null ? 'show' : 'hide')}>{supportStatus}</p>
                            <BasicCustomForm 
                                form={'setting-support-form'}
                                customInputs={SUPPORT_INPUT}
                                title='Have a question or problem? We’re here for you.'
                                buttonText='Submit Help Request'
                                validate={validateSettingSupport}
                                onSubmit={this.handleSuppportFormSubmit}
                            />
                            <Button
                                className='logout-button'
                                onClick={this.props.logoutUser}
                            >
                                <p>Log out</p>
                            </Button>
                        </div>
                    </div>  
                </Section>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, environment }) => {
    return {
        supportStatus: environment.supportStatus,
        user: auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        contactSupport: (params) => dispatch(contactSupport(params)),
        toggleSupportStatus: (status) => dispatch(toggleSupportStatus(status)),
        toggleAccountInfoStatus: (status) => dispatch(toggleAccountInfoStatus(status)),
        unsubscripeFromStripeSubscription: (params) => dispatch(unsubscripeFromStripeSubscription(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
