/* eslint-disable no-use-before-define */
import './create-thumbnails.js';
export {picturesNode,bigPicture};

const bigPicture = document.querySelector('.big-picture');
const picturesNode = document.querySelectorAll('.picture');
const cancelBigPicture = document.querySelector('#picture-cancel');


picturesNode.forEach((element) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').children[0].src = element.querySelector('img').src;
    bigPicture.querySelector('.likes-count').textContent = element.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = element.querySelector('.picture__comments').textContent;
    document.body.classList.add('modal-open');
  });
});


cancelBigPicture.addEventListener('click', ()=> {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27){
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});


