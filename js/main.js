/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
//Функия выводит рандомное число из переданного диапозона
const getRandomNumber = function (min,max) {
  if ((min>=0 && max>=0) && (min<max)){
    min = Math.ceil(min); //делаем целое число, округляем в меньшую сторону
    max = Math.floor(max); // делаем целове число округляя в большую сторону
    return Math.floor(Math.random() * (max - min + 1)) + min; //возвращаем рандомное число
  }
};


//Функция проверки длины строки
const getMaxLength = function(string, maxLength){
  if(string.length <= maxLength){
    return true;
  }else{
    return false;
  }
};

//вводим значения которыми будет оперировать для генерации массива с объектами
const descriptionArr = ['Это красиво','Моё новое фото', 'Сфотографировал на телефон'];

const nameArr = ['Виктор','Юлия','Люпита','Вашингтон', 'Себастьян'];

const messageArr = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

//Функция получает рандомный элемент из массива
const getRandomElem = function (arr){
  return arr[getRandomNumber(0,arr.length-1)];
};

//Вводим функцию счетчики для того чтобы значения не повторялись в нужных значениях объекта
function getCounter() {
  let counter = 1;
  return function() {
    return counter++;
  };
}
const countId= getCounter(); //счетчик ID
const countUrl = getCounter(); //счетчик Url для фото
const countCommentsId= getCounter(); //счетчик ID комментариев
const countAvatar = getCounter(); //счетчик для аватарок

//Функция генерирующая объект - комментарий к фотографии
const getComment = function() {
  let comment = {
    'id': countCommentsId(),
    'avatar': `img/avatar-${countAvatar() }.svg`,
    'message': getRandomElem(messageArr),
    'name': getRandomElem(nameArr)
  };
  return comment;
};

//Функция генерирует объект, каждый объект это описание фотографии с комментом.
const getObjPhoto = function() {
  let obj = {
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

