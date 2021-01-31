import * as dateUtil from './Util/dateHelper.js';

const Api = async (cityName, countryCode, countryName, departureDate) => {
    try {
        const days = dateUtil.getDaysDiffFromCurrentDate(new Date(departureDate));
        if (isNaN(days)) throw new Error('Invalid Departure Date');
        const coordinates = await loadGeo(cityName, countryCode);
        if (!coordinates.lat && !coordinates.lng) throw new Error('Invalid Location Entered!');
        const [{ value: weather }, { value: image }] = await Promise.allSettled([
            loadWeather(coordinates.lng, coordinates.lat, days),
            loadImage(`${cityName} ${countryName}`),
        ]);
        return {
            coordinates,
            countryName,
            countryCode,
            cityName,
            departureDate,
            days,
            weather,
            image,
        };
    } catch (error) {
        throw error;
    }
};

// Question1
// what is port changed how can I handle this? in other words if server port become
// 8080 instead of 8081 all the below functions will not work, is there a way to fix this automatically?

// Question2
// I didn't encounter any problems with weather api, and I didn't need to use solution in the link https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
// Question3
// When do I need to use cros?
//Question4
// Wha is the meaning of jsonP?
const loadGeo = (cityName, countryCode) => {
    let apiURL = new URL('http://localhost:8081/geo');
    apiURL.search = new URLSearchParams({ cityName, countryCode }).toString();
    return fetch(apiURL)
        .then(response => response.json())
        .catch(error => console.log('error', `loadGeo:: ${error}`));
};

const loadWeather = (lng, lat, days) => {
    let apiURL = new URL('http://localhost:8081/weather');
    apiURL.search = new URLSearchParams({ lng, lat, days }).toString();
    return fetch(apiURL)
        .then(response => response.json())
        .catch(error => console.log('error', `loadWeather:: ${error}`));
};

const loadImage = searchKey => {
    let apiURL = new URL('http://localhost:8081/image');
    apiURL.search = new URLSearchParams({ searchKey }).toString();
    return fetch(apiURL)
        .then(response => response.json())
        .catch(error => console.log('error', `loadImage:: ${error}`));
};

export default Api;
