import { response } from 'express';
import fetch from 'node-fetch';

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
                    return {
                        image: {
                            url: hits[0].webformatURL,
                            width: hits[0].webformatWidth,
                            height: hits[0].webformatHeight,
                        },
                    };
                } else {
                    return {
                        image: {
                            url: undefined,
                            width: undefined,
                            height: undefined,
                        },
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

export default Pixabay;
