import * as dateUtil from './dateHelper.js';
const validate = (city, countriesSelectedIndex, date) => {
    const message = [];
    let isValid = true;
    if (!isValidString(city)) {
        message.push('Please enter a valid city name');
        isValid = false;
    }
    if (!isValidDate(date)) {
        message.push('Please enter a valid date');
        isValid = false;
    }
    if (countriesSelectedIndex === 0) {
        message.push('Please select a country');
        isValid = false;
    }
    return {
        isValid,
        message,
    };
};

const isValidString = value => {
    const regEx = /^([A-Za-z]{3,})+/;
    return regEx.test(value);
};

const isValidDate = value => {
    const regEx = /\d+\/\d+\/\d{4,4}/;
    return regEx.test(value) && dateUtil.getCurrentDate() <= new Date(value);
};

export default validate;
