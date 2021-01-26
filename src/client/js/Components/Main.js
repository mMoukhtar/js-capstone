const Main = () => {
    return `
    <main class="main lightGrey">
            ${TripList()}
            ${NewTrip()}
    </main>`;
};

const TripList = () => {
    return `
    <div class="main__list flex flex-col magenta">
        <div class="list-top flex flex-ai-c flex-jc-sb">
            <p>My Trips</p>
            <button>add trip</button>
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

const NewTrip = () => {
    let state = {
        destination: '',
        departureDate: '',
    };
    return `
    <form class="main__form flex flex-col">
        <div class="row">
            <label>My trip to:</label>
            <input type="text" placeholder="Enter Location"/>
        </div>
        <div class="row">
            <label>Departing:</label>
            <input type="text" placeholder="MM/DD/YYYY"/>
        </div>
        <div class="row">
            <button>save trip</button>
            <button>remove trip</button>
        </div>
    </form>
    `;
};
export default Main;
