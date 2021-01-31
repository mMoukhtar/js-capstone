const fetch = require('node-fetch');

const weatherbitEndpoints = {
    current: 'current?',
    daily: 'forecast/daily?',
    forecast: 'forecast/daily?',
};

Object.freeze(weatherbitEndpoints);

class Weatherbit {
    constructor(apiKey, days) {
        this.baseURL = 'https://api.weatherbit.io/v2.0/';
        this.apiKey = apiKey;
        this.days = days;
    }

    get endPoints() {
        if (this.days < 1) {
            return weatherbitEndpoints.daily;
        } else {
            return `${weatherbitEndpoints.forecast}days=${this.days <= 16 ? this.days : 16}&`;
        }
    }

    getWeather(lat, lng) {
        const apiEndPoint = `${this.baseURL}${this.endPoints}lat=${lat}&lon=${lng}&key=${this.apiKey}`;
        return fetch(apiEndPoint)
            .then(response => response.json())
            .then(({ data }) => {
                if (data && data.length > 0) {
                    const { max_temp: maxTemp, min_temp: minTemp, weather: { description } = {} } = data[0];
                    return {
                        description,
                        maxTemp,
                        minTemp,
                    };
                } else {
                    return {
                        description: undefined,
                        maxTemp: undefined,
                        minTemp: undefined,
                    };
                }
            })
            .catch(error =>
                console.log(
                    'error',
                    `weatherbit api :: getWeather
            ${error}`
                )
            );
    }
}

module.exports = Weatherbit;
