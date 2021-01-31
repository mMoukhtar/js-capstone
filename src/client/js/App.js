import Header from './Components/Header.js';
import Main from './Components/Main.js';
import Footer from './Components/Footer.js';
import Api from './Api.js';
import validate from './Util/validations.js';

let store = { currentTrip: 0, trips: [] };
let trip = {};

const updateState = newState => {
    Object.assign(store, newState);
    render();
};
const addTrip = newTrip => {
    store.trips.push(newTrip);
    store.currentTrip = store.trips.length - 1;
    render();
};

const render = () => {
    const root = document.getElementById('root');
    renderAt(
        root,
        `
    ${Header()}
    ${Main(store)}
    ${Footer()}
    `
    );
    $('#datepicker').datepicker();
};

const renderAt = (element, html) => {
    element.innerHTML = html;
};

const hookEvents = event => {
    event.preventDefault();
    const { target } = event;
    let eventHandler = () => {};
    if (target.matches('#toggleButton')) {
        eventHandler = toggleOnClick;
    } else if (target.matches('#addNewTripButton')) {
        eventHandler = addTripOnClick;
    } else if (target.matches('#saveTripButton')) {
        eventHandler = saveTripOnClick;
    } else if (target.matches('#previousTripButton')) {
        eventHandler = previousTripOnClick;
    } else if (target.matches('#nextTripButton')) {
        eventHandler = nextTripOnClick;
    } else if (target.matches('#removeTripButton')) {
        eventHandler = removeTripOnClick;
    } else {
        return 0;
    }
    target.addEventListener('click', eventHandler(event));
};

// Events Handlers
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

const saveTripOnClick = () => {
    const cityName = document.getElementById('city').value;
    const departureDate = document.getElementById('datepicker').value;
    const countries = document.getElementById('countries');
    const countryCode = countries.options[countries.selectedIndex].value;
    const countryName = countries.options[countries.selectedIndex].text;
    const validation = document.querySelector('.validation');
    const { isValid, message } = validate(cityName, countries.selectedIndex, departureDate);
    if (isValid) {
        validation.classList.add('hidden');
        Api(cityName, countryCode, countryName, departureDate)
            .then(trip => {
                addTrip(trip);
            })
            .catch(error => console.log('error', `saveTripButtonOnClick:: ${error}`));
    } else {
        validation.innerHTML = message.join('</br>');
        validation.classList.remove('hidden');
    }
};

const addTripOnClick = () => {
    saveTripOnClick();
};

const previousTripOnClick = () => {
    let currentTrip = store.currentTrip;
    if (currentTrip > 0) {
        currentTrip--;
        updateState({ currentTrip });
    }
};

const nextTripOnClick = () => {
    let currentTrip = store.currentTrip;
    const tripsCount = store.trips.length;
    if (currentTrip < tripsCount - 1) {
        currentTrip++;
        updateState({ currentTrip });
    }
};

const removeTripOnClick = () => {
    let currentTrip = store.currentTrip;
    let trips = store.trips;
    if (trips.length > 0) {
        trips.splice(currentTrip, 1);
        currentTrip = currentTrip === 0 ? currentTrip : currentTrip - 1;
        updateState({ currentTrip, trips });
    }
};

export { render, hookEvents };
