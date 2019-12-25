export default function validation(values) {
    let errors = {};
    if (!values.name) {
        errors.name = 'Required';
    }
    else if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    else if (!values.password) {
        errors.password = 'Required';
    }
    // password validation
    else if (values.password.length < 8) {
        errors.password = 'password should be 8 character long';
    }

    return errors;
}