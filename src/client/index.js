import './styles/style.scss';
import * as App from './js/App.js';
import fetch from 'node-fetch';

document.addEventListener('DOMContentLoaded', () => {
    onPageLoad();
});

document.addEventListener('click', event => {
    App.hookEvents(event);
});

const root = document.getElementById('root');

const onPageLoad = () => {
    App.render(root);
    $('#datepicker').datepicker();
};

export { App };
