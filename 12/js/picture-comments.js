import {picturesNode,bigPicture} from './full-size-picture.js';
import {createPhotosArr} from './data-photos.js';

const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsLoader = document.querySelector('.comments-loader');
const socialCommentCounter = bigPicture.querySelector('.comments-counter');

//динамический счетчик комментариев
const getCounterComments = function (){
  const commentsArr = socialComments.childNodes;
  const openCommentsArr = [];
  for(let i=0; i<commentsArr.length; i++){
    if (commentsArr[i].classList.value === 'social__comment'){
      openCommentsArr.push(commentsArr[i]);
    }
  }
  socialCommentCounter.textContent = openCommentsArr.length;
};

const getCommentsBigPicture = function (picture,comments) {
  picture.addEventListener ('click', ()=> {
    socialComments.innerHTML = '';
    comments.forEach((elem) => {
      const cloneComment = socialComment.cloneNode(true);
      cloneComment.querySelector('img').src = elem.avatar;
      cloneComment.querySelector('img').alt = elem.name;
      cloneComment.querySelector('.social__text').textContent = elem.message;
      socialComments.appendChild(cloneComment);
      for (let i=0; i<socialComments.children.length; i++){ //здесь выставлем показ 5 коменнтариве изначально
        if (i>4){
          socialComments.children[i].classList.add('hidden');
        }
      }
    });
    getCounterComments();
  });
};

for (let i=0; i<createPhotosArr.length;i++){
  getCommentsBigPicture(picturesNode[i],createPhotosArr[i].comments);
}

//генерируем функцию для показа 5 следующих комментариев
const getMoreComments = function (){
  const commentsArr = socialComments.childNodes;
  const hiddenCommentsArr = [];
  for (let i=0; i<commentsArr.length;i++){
    if (commentsArr[i].classList.value === 'social__comment hidden'){
      hiddenCommentsArr.push(commentsArr[i]);
    }
  }
  for (let i=0; i<5; i++){
    if (hiddenCommentsArr[i] === undefined){
      getCounterComments();
      return;
    }
    hiddenCommentsArr[i].classList.remove('hidden');
  }
  getCounterComments();
};

socialCommentsLoader.addEventListener('click', getMoreComments);

