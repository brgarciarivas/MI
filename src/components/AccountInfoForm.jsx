import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom'

import Base from './Base';
import Button from './Button';

import { ACCOUNT_INFO_SETTING } from '../constants';

import { updateUser } from '../reducers/auth';

class AccountInfoForm extends Base {
    constructor(props) {
        super(props)
        this.autoBind('onSubmit');

    }
    onSubmit(values) {
        
        const name = `${values.firstName} ${values.lastName}`

        const params = {
            userId: this.props.userId,
            updateFields: {
                full_name: name,
                email_address: values.email
            }
        }

        this.props.updateUser(params)
    }
    renderInputs() {
        return ACCOUNT_INFO_SETTING.map((d, i) => {
            return (
                <Field 
                    {...d}
                    key={`${d.name}-${i}`}
                />
            )
        })
    }

    render() {

        const {
            handleSubmit,
            valid,
            formError,
            dirty,
            updateAccountStatus,
        } = this.props;

        let validStatus = valid ? 'valid' : 'invalid';
        let dirtyStatus = dirty ? 'dirty' : 'clean';
        let updatedSatus = (updateAccountStatus !== null) && (updateAccountStatus == 'Updated') ? 'submited' : 'error';

        return (
            <div className='AccountInfoForm'>
                <form 
                    className='account-info-form'
                    onSubmit={handleSubmit(this.onSubmit)}
                >
                    <div className='form-container'>
                        {this.renderInputs()}

                        <Button
                            onClick={handleSubmit(this.onSubmit)}
                            type='submit'
                            className={`account-info-form-button ${validStatus} ${dirtyStatus} ${updatedSatus}`}
                        >
                            <p>{updateAccountStatus != null ? updateAccountStatus : 'Update Account'}</p>
                        </Button>
                    </div>
                </form>
                <Link
                    to='/home/settings/updatePassword'
                >
                    <p className='toggle_text'>I want to change my account password</p>
                </Link>
            </div>
        );
    }
}

AccountInfoForm = reduxForm({
    form: 'account-info-form'
})(AccountInfoForm);

const mapStateToProps = ({ auth, environment }) => {
    var firstName = null;
    var lastName = null;

    if ( auth.user.full_name != null) {
        var names = auth.user.full_name.split(' ');
        firstName = names[0];
        lastName = names[1];
    } 
   

    return {
        updateAccountStatus: environment.updateAccountStatus,
        userId: auth.user.id,
        initialValues: {
            email: auth.user.email_address,
            firstName: firstName,
            lastName: lastName
        } 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (params) => dispatch(updateUser(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoForm);
