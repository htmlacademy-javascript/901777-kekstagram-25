/* eslint-disable no-use-before-define */
import {getCounter,getRandomNumber,getRandomElem} from './util.js';
export {createPhotosArr};


const descriptionArr = ['Это красиво','Моё новое фото', 'Сфотографировал на телефон'];

const nameArr = ['Виктор','Юлия','Люпита','Вашингтон', 'Себастьян'];

const messageArr = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const countId= getCounter(); //счетчик ID
const countUrl = getCounter(); //счетчик Url для фото
const countCommentsId= getCounter(); //счетчик ID комментариев
const countAvatar = getCounter(); //счетчик для аватарок

//Функция генерирующая объект - комментарий к фотографии
const getComment = function() {
  const comment = {
    'id': countCommentsId(),
    'avatar': `img/avatar-${getRandomNumber(1,6) }.svg`,
    'message': getRandomElem(messageArr),
    'name': getRandomElem(nameArr)
  };
  return comment;
};

//Функция генерирует объект, каждый объект это описание фотографии с комментом.
const getObjPhoto = function() {
  const obj = {
    'id': countId(),
    'url': `photos/${  countUrl()  }.jpg`,
    'description':getRandomElem(descriptionArr),
    'likes':getRandomNumber(15,200),
    'comments': Array.from({length: 2},getComment) //генерируем массив комментариев из двух элементов
  };
  return obj;
};

//генерируем массив с объектами
const createPhotosArr = Array.from({length: 25},getObjPhoto);
