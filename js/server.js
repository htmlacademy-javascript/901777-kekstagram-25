import {createThumbnails} from './gallery.js';
import { imgFilter } from './filters.js';

const PICTURES_DATA = 'https://25.javascript.pages.academy/kekstagram/data';
const FORM_SUBMIT_URL = 'https://25.javascript.pages.academy/kekstagram';

fetch(PICTURES_DATA)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    createThumbnails(data);
    imgFilter.classList.remove('img-filters--inactive');
  }).catch((err) => {
    document.body.textContent = err;
  });

export {FORM_SUBMIT_URL,PICTURES_DATA};
