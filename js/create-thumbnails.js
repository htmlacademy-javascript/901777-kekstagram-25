// import {createPhotosArr} from './data-photos.js';
export {createThumbnails};
// import { createDataPhotos } from './server.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment(); //создание фрагмента


// генерируем пикчи через перебор массива createPhotosArr
const createThumbnails = function (arr){
  arr.forEach((elem) =>{
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = elem.url;
    pictureElement.querySelector('.picture__likes').textContent = elem.likes;
    pictureElement.querySelector('.picture__comments').textContent = elem.comments.length;
    picturesFragment.appendChild(pictureElement);
    picturesContainer.appendChild(picturesFragment);
  });
};
