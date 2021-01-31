const path = require('path');
const express = require('express');
const GeoNames = require('../Api/geonames.js');
const Weatherbit = require('../Api/weatherbit.js');
const Pixabay = require('../Api/pixabay.js');

// Routers
const router = express.Router();

// Default Endpoint
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../dist/index.html'));
});

// Geonames Endpoint
router.get('/geo', async (req, res) => {
    const { cityName, countryCode } = req.query;
    const geoApi = new GeoNames(process.env.geonames_api_key);
    try {
        const coordinates = await geoApi.searchByCityName(cityName, countryCode, 5);
        res.send(coordinates);
    } catch (error) {
        console.log('error', error);
        res.send({ lng: 'unknown', lat: 'unknown' });
    }
});

// Geonames Endpoint
router.get('/weather', async (req, res) => {
    const { lat, lng, days } = req.query;
    const weatherbitApi = new Weatherbit(process.env.weatherbit_api_key, days);
    try {
        const weather = await weatherbitApi.getWeather(lat, lng);
        res.send(weather);
    } catch (error) {
        console.log('error', error);
        res.send({});
    }
});

// Geonames Endpoint
router.get('/image', async (req, res) => {
    const { searchKey } = req.query;
    const pixabayApi = new Pixabay(process.env.pixabay_api_key);
    try {
        const image = await pixabayApi.searchForImage(searchKey);
        res.send(image);
    } catch (error) {
        console.log('error', error);
        res.send({});
    }
});

module.exports = router;
