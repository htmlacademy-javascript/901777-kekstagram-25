import {createPhotosArr} from './data-photos.js';

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment(); //создание фрагмента

//генерируем пикчи через перебор массива createPhotosArr
createPhotosArr.forEach((elem) =>{
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = elem.url;
  pictureElement.querySelector('.picture__likes').textContent = elem.likes;
  pictureElement.querySelector('.picture__comments').textContent = elem.comments.length;
  picturesFragment.appendChild(pictureElement);
  //elem.comments;
});

picturesContainer.appendChild(picturesFragment);


