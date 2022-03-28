import {picturesNode} from './full-size-picture.js';
import {createPhotosArr} from './data-photos.js';


const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const getCommentsBigPicture = function (picture,comments) {
  picture.addEventListener ('click', ()=> {
    socialComments.innerHTML = '';
    comments.forEach((elem) => {
      const cloneComment = socialComment.cloneNode(true);
      cloneComment.querySelector('img').src = elem.avatar;
      cloneComment.querySelector('img').alt = elem.name;
      cloneComment.querySelector('.social__text').textContent = elem.message;
      socialComments.appendChild(cloneComment);
    });
  });
};

for (let i=0; i<createPhotosArr.length;i++){
  getCommentsBigPicture(picturesNode[i],createPhotosArr[i].comments);
}


