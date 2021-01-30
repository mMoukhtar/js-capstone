import Header from './Components/Header.js';
import { Main, saveTripButtonOnClick } from './Components/Main.js';
import Footer from './Components/Footer.js';

let state = [];

const render = root => {
    renderAt(
        root,
        `
    ${Header()}
    ${Main()}
    ${Footer()}
    `
    );
};

const renderAt = (element, html) => {
    console.log(element);
    element.innerHTML = html;
};

const updateState = (state, newState) => {
    Object.assign(state, newState);
};

// Events Handlers
const hookEvents = event => {
    event.preventDefault();
    const { target } = event;
    let eventHandler = () => {};
    if (target.matches('#toggleButton')) {
        eventHandler = toggleOnClick;
    } else if (target.matches('#addNewTripButton')) {
    } else if (target.matches('#saveTripButton')) {
        eventHandler = saveTripButtonOnClick;
    } else {
        return 0;
    }
    target.addEventListener('click', eventHandler());
};

const toggleOnClick = () => {
    const header = document.querySelector('#header');
    const hasFadeItems = document.querySelectorAll('.has-fade');
    if (header.classList.contains('open')) {
        header.classList.remove('open');
        hasFadeItems.forEach(item => {
            item.classList.remove('fade-in');
            item.classList.add('fade-out');
        });
    } else {
        header.classList.add('open');
        hasFadeItems.forEach(item => {
            item.classList.remove('fade-out');
            item.classList.add('fade-in');
        });
    }
};

export { render, hookEvents };
