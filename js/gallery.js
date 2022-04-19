/* eslint-disable no-use-before-define */
const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment(); //создание фрагмента

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = document.querySelector('#picture-cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.comments-loader');
const socialCommentCounter = document.querySelector('.comments-counter');
const commentsCount = document.querySelector('.comments-count');

const getHiddenModal = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentsLoader.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  cancelBigPicture.removeEventListener('click', closeModalCancel);
  document.removeEventListener('keydown', closeModalEsc);
};

const closeModalEsc = function (evt) {
  if (evt.keyCode === 27){
    getHiddenModal();
  }
};

const closeModalCancel = function () {
  getHiddenModal();
};

//динамический счетчик комментариев
const getCounterComments = function (){
  const comments = socialComments.childNodes;
  const openComments = [];
  for(let i=0; i<comments.length; i++){
    if (comments[i].classList.value === 'social__comment'){
      openComments.push(comments[i]);
    }
  }
  socialCommentCounter.textContent = openComments.length;
  if (socialCommentCounter.textContent === commentsCount.textContent){
    socialCommentsLoader.classList.add('hidden');
    socialCommentCount.classList.add('hidden');
  }
};

//функция для показа 5 следующих комментариев
const commentsClickHandler = function (){
  const comments = socialComments.childNodes;
  const hiddenComments = [];
  comments.forEach((elem)=>{
    if (elem.classList.value === 'social__comment hidden'){
      hiddenComments.push(elem);
    }
  });
  hiddenComments.forEach((elem,index)=>{
    if (index >= 5){
      return;
    }
    elem.classList.remove('hidden');
  });
  getCounterComments();
};
socialCommentsLoader.addEventListener('click', commentsClickHandler);

//функция добавляет комментари  при открытии миниатюры
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
        if (socialComments.children.length <= 5){
          socialCommentsLoader.classList.add('hidden');
          socialCommentCount.classList.add('hidden');
        }else if(i>4){
          socialCommentsLoader.classList.remove('hidden');
          socialCommentCount.classList.remove('hidden');
          socialComments.children[i].classList.add('hidden');
        }
      }
    });
    getCounterComments();
  });
};

// генерируем плитку из маленьких фото через перебор данных с сервера
// и добавляем их открытие по клику
const createThumbnails = function (dataPictures){
  dataPictures.forEach((elem) =>{
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = elem.url;
    pictureElement.querySelector('.picture__likes').textContent = elem.likes;
    pictureElement.querySelector('.picture__comments').textContent = elem.comments.length;
    picturesFragment.appendChild(pictureElement);
    picturesContainer.appendChild(picturesFragment);
  });

  const picturesNode = document.querySelectorAll('.picture');

  for (let i=0; i<picturesNode.length;i++){
    getCommentsBigPicture(picturesNode[i],dataPictures[i].comments);
  }

  picturesNode.forEach((element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img').children[0].src = element.querySelector('img').src;
      bigPicture.querySelector('.likes-count').textContent = element.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = element.querySelector('.picture__comments').textContent;
      document.body.classList.add('modal-open');
      cancelBigPicture.addEventListener('click', closeModalCancel);
      document.addEventListener('keydown', closeModalEsc);
    });
  });
};

export {createThumbnails,picturesFragment};
