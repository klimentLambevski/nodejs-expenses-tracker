const capitalizeFirstChar = string => string.charAt(0).toUpperCase() + string.substring(1);

const validateRequired = (values, name, errors) => {
    if(!values[name] || values[name] === '') {
        errors[name] = `${capitalizeFirstChar(name)} is required`
    }
};

const validateEmail = (values, name, errors) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[name])) {
        errors[name] = 'Invalid email address';
    }
};

const validateFloat = (values, name, errors) => {
    if (values[name] && !/(\d+|\d+.\d+)$/i.test(values[name])) {
        errors[name] = 'Invalid number';
    }
};

export {
    validateRequired,
    validateEmail,
    validateFloat
}