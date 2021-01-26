import './styles/style.scss';
import * as App from './js/App.js';

document.addEventListener('DOMContentLoaded', () => {
    onPageLoad();
});

document.addEventListener('click', (event) => {
    App.hookEvents(event);
});

const root = document.getElementById('root');

const onPageLoad = () => {
    App.render(root);
};

export { App };

/*
import './styles/footer.scss';
import { updateScreen, clearResult, addResult, showHideFormResults } from './js/updateScreen';
import { handleSubmit } from './js/formHandler';
import { postData, getData } from './js/asyncFunctions';
import { validate } from './js/formValidation';

export { handleSubmit, updateScreen, clearResult, addResult, showHideFormResults, postData, getData, validate };

*/
