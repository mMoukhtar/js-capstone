import Api from '../Api.js';

let store = [];

const updateState = (state, newState) => {
    Object.assign(state, newState);
};

const Main = () => {
    return `
    <main class="main lightGrey">
            ${TripList()}
            ${NewTripForm()}
    </main>`;
};

const TripList = () => {
    return `
    <div class="main__list flex flex-col magenta">
        <div class="list-top flex flex-ai-c flex-jc-sb">
            <p>My Trips</p>
            <button id="addNewTripButton">add trip</button>
        </div>
        ${Trip()}
    </div>
    `;
};

const Trip = () => {
    return `
    <div class="list-body green">
        <div class="left flex flex-col flex-ai-c yellow">
            <div class="left__trip-image"></div>
            <div class="left__trip-buttons flex flex-col flex-ai-c">
                <button>add lodging info</button>
                <button>add packing list</button>
                <button>add notes</button>
            </div>
        </div>
        <div class="right red">
            Right
        </div>
    </div>
    `;
};

const NewTripForm = () => {
    let state = {
        destination: '',
        departureDate: '',
    };

    return `
    <form id="newTrip" class="main__form flex flex-col">
        <div class="row">
            <label>My trip to:</label>
            <input id="city" type="text" placeholder="Enter city name"/>
        </div>
        <div class="row">
            <label></label>
            <select name="countries" id="countries">
                <option value="none">Please select a country</option>
                <option value="US">USA</option>
                <option value="GB">England</option>
                <option value="FR">France</option>
            </select>
        </div>
        <div class="row">
            <label>Departing:</label>
            <input id="datepicker" type="text" placeholder="MM/DD/YYYY"/>
        </div>
        <div class="row">
            <button id="saveTripButton">save trip</button>
            <button id="removeTripButton">remove trip</button>
        </div>
    </form>
    `;
};

const saveTripButtonOnClick = () => {
    const cityName = document.getElementById('city').value;
    const departureDate = document.getElementById('datepicker').value;
    const countries = document.getElementById('countries');
    const countryCode = countries.options[countries.selectedIndex].value;
    const countryName = countries.options[countries.selectedIndex].text;

    Api(cityName, countryCode, countryName, departureDate)
        .then(response => {
            store.push(response);
            console.log(store);
        })
        .catch(error => console.log('error', `saveTripButtonOnClick:: ${error}`));
};

export { saveTripButtonOnClick, Main };
