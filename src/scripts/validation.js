
export const validateLogin = (values) => {
    const errors = {};
    const err = 'Required';

    if (!values.emailAddress) {
        errors.emailAddress = err;
    }
    
    if (values.emailAddress && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
        errors.emailAddress = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = err;
    }

    return errors;
}
