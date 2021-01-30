import { response } from 'express';
import fetch from 'node-fetch';

class GeoNames {
    constructor(apiKey) {
        this.baseURL = 'http://api.geonames.org/';
        this.apiKey = apiKey;
    }

    searchByCityName(cityName, countryCode, resultLength) {
        const apiEndPoint = `${this.baseURL}postalCodeSearchJSON?placename=${cityName}&country=${countryCode}&maxRows=${resultLength}&username=${this.apiKey}`;
        return fetch(apiEndPoint)
            .then(response => response.json())
            .then(({ postalCodes }) => {
                if (postalCodes.length === 0) {
                    return { lng: undefined, lat: undefined };
                } else {
                    const firstResult = postalCodes
                        .filter(x => x.placeName.toLowerCase().includes(cityName.toLowerCase()) && x.countryCode === countryCode)
                        .shift();
                    return { lng: firstResult.lng || undefined, lat: firstResult.lat || undefined };
                }
            })
            .catch(error =>
                console.log(
                    'error',
                    `GeoNames api :: searchByCityName
            ${error}`
                )
            );
    }
}

export default GeoNames;
