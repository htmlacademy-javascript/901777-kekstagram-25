"use strict"
import {createThumbnails} from './create-thumbnails.js';
export {createDataPhotos};

const createDataPhotos = function () {
 return fetch('https://25.javascript.pages.academy/kekstagram/data')
 .then((response) => response.json());
};


// console.log(createDataPhotos());

fetch('https://25.javascript.pages.academy/kekstagram/data')
.then((response) => response.json())
  .then((data) => {
    console.log(data);
    createThumbnails(data);
  });