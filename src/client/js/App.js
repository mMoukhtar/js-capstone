import Header from './Components/Header.js';
import Main from './Components/Main.js';
import Footer from './Components/Footer.js';

let state = [];

const render = (root) => {
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
const hookEvents = ({ target }) => {
    if (target.matches('#toggleButton')) {
        target.addEventListener('click', toggleOnClick);
    }
};

const toggleOnClick = () => {
    const header = document.querySelector('#header');
    const hasFadeItems = document.querySelectorAll('.has-fade');
    if (header.classList.contains('open')) {
        header.classList.remove('open');
        hasFadeItems.forEach((item) => {
            item.classList.remove('fade-in');
            item.classList.add('fade-out');
        });
    } else {
        header.classList.add('open');
        hasFadeItems.forEach((item) => {
            item.classList.remove('fade-out');
            item.classList.add('fade-in');
        });
    }
};

export { render, hookEvents };
