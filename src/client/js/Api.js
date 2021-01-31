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

const loadGeo = (cityName, countryCode) => {
    let apiURL = new URL('http://localhost:8000/geo');
    apiURL.search = new URLSearchParams({ cityName, countryCode }).toString();
    return fetch(apiURL)
        .then(response => response.json())
        .catch(error => console.log('error', `loadGeo:: ${error}`));
};

const loadWeather = (lng, lat, days) => {
    let apiURL = new URL('http://localhost:8000/weather');
    apiURL.search = new URLSearchParams({ lng, lat, days }).toString();
    return fetch(apiURL)
        .then(response => response.json())
        .catch(error => console.log('error', `loadWeather:: ${error}`));
};

const loadImage = searchKey => {
    let apiURL = new URL('http://localhost:8000/image');
    apiURL.search = new URLSearchParams({ searchKey }).toString();
    return fetch(apiURL)
        .then(response => response.json())
        .catch(error => console.log('error', `loadImage:: ${error}`));
};

export default Api;
