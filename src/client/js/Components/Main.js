const Main = state => {
    return `
    <main class="main">
            ${TripList(state)}
            ${NewTripForm()}
    </main>`;
};

const TripList = state => {
    return `
    <div class="main__list flex flex-col">
        <div class="list-top flex flex-ai-c flex-jc-sb">
            <p>My Trips</p>
            <button id="addNewTripButton">add trip</button>
        </div>
        ${Trip(state)}
        <div class="flex flex-jc-sb flex-ai-c">
            <button id="previousTripButton"><</button>
            <button id="nextTripButton">></button>
        </div>
    </div>
    `;
};

const Trip = state => {
    if (state.trips.length === 0) {
        return `
        <div class="list-body green">
        </div>
        `;
    } else {
        const { currentTrip, trips } = state;
        return `
        <div class="list-body">
            <div class="left flex flex-col flex-ai-c ">
                <div class="left__trip-image" style="background-Image: url('${trips[currentTrip].image.url}')">
                </div>
                <div class="left__trip-buttons">
                    <button>add lodging info</button>
                    <button>add packing list</button>
                    <button>add notes</button>
                </div>
            </div>
            <div class="right">
                <h3>My Trip to: ${trips[currentTrip].cityName}, ${trips[currentTrip].countryName}</h3>
                <h3>Departing: ${trips[currentTrip].departureDate}</h3>
                <div class="flex flex-jc-s">
                    <div>
                        <p>Flight Info:</p>
                    </div>
                    <div>
                        <p>ORD 3:00 PM</p>
                        <p>Flight UR322</p>
                    </div>
                </div>
                <div>
                    <button>save trip</button>
                    <button id="removeTripButton">remove trip</button>
                </div>
                <div>
                    <p>${trips[currentTrip].cityName}, ${trips[currentTrip].countryName} is days ${trips[currentTrip].days} away</p>
                    <p>Typical weather for then is:</p>
                    <p>High -${trips[currentTrip].weather.maxTemp} ,Low - ${trips[currentTrip].weather.minTemp}</p>
                    <p>${trips[currentTrip].weather.description}</p>
                </div>
            </div>
        </div>
        `;
    }
};

const NewTripForm = () => {
    let state = {
        destination: '',
        departureDate: '',
    };

    return `
    <form id="newTrip" class="main__form flex flex-col">
        <div class="row">
            <label for="city">My trip to:</label>
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
            <label for="datepicker">Departing:</label>
            <input id="datepicker" type="text" placeholder="MM/DD/YYYY"/>
        </div>
        <div class="row">
            <button id="saveTripButton">save trip</button>
            <button id="removeTripButton">remove trip</button>
        </div>
        <div class="row validation hidden">
            <label id="cityValidator">*</label>
        </div>
    </form>
    `;
};

export default Main;
