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

const hiddenModal = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentsLoader.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
};

const hiddenModalEsc = function (evt) {
  if (evt.keyCode === 27){
    hiddenModal();
    // eslint-disable-next-line no-use-before-define
    cancelBigPicture.removeEventListener('click', hiddenModalCancel);
  }
};

const hiddenModalCancel = function () {
  hiddenModal();
  document.removeEventListener('keydown', hiddenModalEsc);
};

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
  if (socialCommentCounter.textContent === commentsCount.textContent){
    socialCommentsLoader.classList.add('hidden');
    socialCommentCount.classList.add('hidden');
  }
};

//функция для показа 5 следующих комментариев
const commentsClickHandler = function (){
  const commentsArr = socialComments.childNodes;
  const hiddenCommentsArr = [];
  commentsArr.forEach((elem)=>{
    if (elem.classList.value === 'social__comment hidden'){
      hiddenCommentsArr.push(elem);
    }
  });
  hiddenCommentsArr.forEach((elem,index)=>{
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
const createThumbnails = function (arr){
  arr.forEach((elem) =>{
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = elem.url;
    pictureElement.querySelector('.picture__likes').textContent = elem.likes;
    pictureElement.querySelector('.picture__comments').textContent = elem.comments.length;
    picturesFragment.appendChild(pictureElement);
    picturesContainer.appendChild(picturesFragment);
  });

  const picturesNode = document.querySelectorAll('.picture');

  for (let i=0; i<picturesNode.length;i++){
    getCommentsBigPicture(picturesNode[i],arr[i].comments);
  }

  picturesNode.forEach((element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img').children[0].src = element.querySelector('img').src;
      bigPicture.querySelector('.likes-count').textContent = element.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = element.querySelector('.picture__comments').textContent;
      document.body.classList.add('modal-open');
      cancelBigPicture.addEventListener('click', hiddenModalCancel, {once: true});
      document.addEventListener('keydown', hiddenModalEsc, {once: true});
    });
  });
};

export {createThumbnails,picturesFragment};
