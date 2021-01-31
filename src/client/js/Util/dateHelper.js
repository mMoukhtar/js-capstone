const getDaysDiffFromCurrentDate = date => {
    const days = parseInt((date.getTime() - getCurrentDate().getTime()) / (1000 * 3600 * 24));
    return Number.isNaN(days) || days < 0 ? NaN : days;
};

const getCurrentDateAsString = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return `${month}/${day}/${year}`;
};

const getCurrentDate = () => {
    return new Date(getCurrentDateAsString());
};

export { getCurrentDateAsString, getDaysDiffFromCurrentDate, getCurrentDate };
