const { response } = require('express');
const fetch = require('node-fetch');

class Pixabay {
    constructor(apiKey) {
        this.baseURL = 'https://pixabay.com/api/';
        this.apiKey = apiKey;
    }
    //https://pixabay.com/api/?key=20066297-09485be2294cf9de2fa8434ae
    //&q=yellow+flowers
    //&image_type=photo
    searchForImage(searchKeyword) {
        const apiEndPoint = `${this.baseURL}?key=${this.apiKey}&q=${searchKeyword.split(' ').join('+')}&image_type=photo`;
        return fetch(apiEndPoint)
            .then(response => response.json())
            .then(({ total, totalHits, hits }) => {
                if (total > 0 && totalHits > 0 && hits.length > 0) {
                    const { webformatURL: url, webformatWidth: width, webformatHeight: height } = hits[0];
                    return {
                        url,
                        width,
                        height,
                    };
                } else {
                    return {
                        url: 'https://via.placeholder.com/600',
                        width: undefined,
                        height: undefined,
                    };
                }
            })
            .catch(error =>
                console.log(
                    'error',
                    `Pixabay api :: searchForImage
            ${error}`
                )
            );
    }
}

module.exports = Pixabay;
