const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment(); //создание фрагмента

const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsLoader = document.querySelector('.comments-loader');
const socialCommentCounter = document.querySelector('.comments-counter');

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

//функция для показа 5 следующих комментариев
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
        if (i>4){
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

  const bigPicture = document.querySelector('.big-picture');
  const picturesNode = document.querySelectorAll('.picture');
  const cancelBigPicture = document.querySelector('#picture-cancel');

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
};

export {createThumbnails,picturesFragment};
