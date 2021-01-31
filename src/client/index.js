import './styles/style.scss';
import * as App from './js/App.js';
import fetch from 'node-fetch';

document.addEventListener('DOMContentLoaded', () => {
    onPageLoad();
});

document.addEventListener('click', event => {
    App.hookEvents(event);
});

const onPageLoad = () => {
    App.render();
};

export { App };
