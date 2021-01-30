const getDaysDiffFromCurrentDate = date => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    const days = parseInt((date.getTime() - new Date(`${month}/${day}/${year}`).getTime()) / (1000 * 3600 * 24));
    return Number.isNaN(days) || days < 0 ? NaN : days;
};

export { getDaysDiffFromCurrentDate };
