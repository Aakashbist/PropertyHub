import { useState, useEffect } from 'react'
import { object } from 'prop-types';


const useForms = (initialState, validate) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = object.keys(errors).length === 0
            if (noErrors) {
                isSubmitting(true);
            }
            else {
                setSubmitting(false);
            }
        }
    }, [errors])

    handleBlur = () => {
        const validationErrors = validate(values);
    }

    handleSubmit = (event) => {
        const validationErrors = validate(values);
        setSubmitting(true)
    }

    handleChange = (event) => {
        setValues({
            ...values, [event.target.name]: event.target.values
        })
    }

    return { values, handleChange, handleSubmit, handleBlur, errors, isSubmitting }
}

export default useForms