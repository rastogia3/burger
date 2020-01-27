export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    }
}


export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = (value.length <= rules.maxLength) && isValid;
    }
    if (rules.isEmail) {
        const pattern = /^\S+@\S+\.\S+$/
        isValid = pattern.test(value) && isValid;
    }
    return isValid;
}

export const createErrorMessage = (value, rules) => {
    for (const key in rules) {
        if (key === 'required' && rules[key] && value.trim() === '') {
            return 'This field is required.'
        }
        if (key === 'minLength' && value.length <= rules[key]) {
            return `Minimum Length ${rules[key]} is required.`
        }
        if (key === 'maxLength' && value.length >= rules[key]) {
            return `Maximum Length ${rules[key]} is required.`
        }
        if (key === 'maxLength' && value.length <= rules[key]) {
            return `Maximum Length ${rules[key]} is required.`
        }
        if (key === 'isEmail') {
            const pattern = /^\S+@\S+\.\S+$/
            return !(pattern.test(value)) ? "Email is not correct." : null;
        }
    }
    return null;
}