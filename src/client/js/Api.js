import * as dateUtil from './Util/dateHelper.js';

//Question:
// I had to add the below ref in order to be able to use this module with jest
// I understand the fetch api isn't implemented in node by default
// But I don't understand why jest needs fetch to pass the test
// also now since I added node-fetch does this mean I overrided the original fetch api that is valid for client side?
import fetch from 'node-fetch';
import { urlencoded } from 'body-parser';

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
  let apiURL = encodeURI(`/geo?cityName=${cityName}&countryCode=${countryCode}`);
  return fetch(apiURL)
    .then((response) => response.json())
    .catch((error) => console.log('error', `loadGeo:: ${error}`));
};

const loadWeather = (lng, lat, days) => {
  // let apiURL = new URL('/weather');
  // apiURL.search = new URLSearchParams({ lng, lat, days }).toString();
  let apiURL = encodeURI(`/weather?lng=${lng}&lat=${lat}&days${days}`);
  return fetch(apiURL)
    .then((response) => response.json())
    .catch((error) => console.log('error', `loadWeather:: ${error}`));
};

const loadImage = (searchKey) => {
  // let apiURL = new URL('/image');
  // apiURL.search = new URLSearchParams({ searchKey }).toString();
  let apiURL = encodeURI(`/image?searchKey=${searchKey}`);
  return fetch(apiURL)
    .then((response) => response.json())
    .catch((error) => console.log('error', `loadImage:: ${error}`));
};

export default Api;
