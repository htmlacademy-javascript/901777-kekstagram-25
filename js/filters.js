import { getRandomNumber,debounce } from './util.js';
import { PICTURES_DATA } from './server.js';
import {createThumbnails} from './gallery.js';

const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFilter = document.querySelector('.img-filters');
const filterDeafault = imgFilter.querySelector('#filter-default');
const filterRandom = imgFilter.querySelector('#filter-random');
const filterDiscussed = imgFilter.querySelector('#filter-discussed');

const removePicturesNodes = function () {
  const picturesNodes = document.querySelectorAll('.picture');
  picturesNodes.forEach((elem)=>{
    elem.remove();
  });
};

const getActiveFilter = function (selectedFilter) {
  const filters = imgFilter.querySelector('form').children;
  for (let i=0; i<filters.length; i++){
    filters[i].classList.remove('img-filters__button--active');
  }
  selectedFilter.classList.add('img-filters__button--active');
};


const genrateRandom = function (min,max) {
  const numbers =  [];
  return function () {
    let randomNumber = getRandomNumber(min,max);
    while (numbers.includes(randomNumber)){
      randomNumber = getRandomNumber(min,max);
    }
    numbers.push(randomNumber);
    return randomNumber;
  };
};

const createRandomFilter = function (data){
  removePicturesNodes();
  const getGenerateRandomNumber = genrateRandom(0,24);
  const photos = [];
  for (let i=0;i<10;i++){
    photos.push(data[getGenerateRandomNumber()]);
  }
  createThumbnails(photos);
};

const createDiscussedFilter = function (data){
  removePicturesNodes();
  const datas = data.slice();
  datas.sort((a,b)=>b.comments.length - a.comments.length);
  createThumbnails(datas);
};

const getFilterRandomPictures = function () {
  getActiveFilter(filterRandom);
  fetch(PICTURES_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then((data) => {
      createRandomFilter(data);
    })
    .catch((err) => {
      document.body.textContent = err;
    });
};


const getFilterDefaultPictures = function () {
  getActiveFilter(filterDeafault);
  removePicturesNodes();
  fetch(PICTURES_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then((data) => {
      createThumbnails(data);
    })
    .catch((err) => {
      document.body.textContent = err;
    });
};

const getFilterDiscussedPictures = function () {
  getActiveFilter(filterDiscussed);
  removePicturesNodes();
  fetch(PICTURES_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }).then((data) => {
      createDiscussedFilter(data);
    })
    .catch((err) => {
      document.body.textContent = err;
    });
};

const getSwitchFilter = function (evt) {
  for (let i=0; i<imgFiltersForm.children.length; i++){
    if (evt.target === imgFiltersForm.children[0]){
      return getFilterDefaultPictures();
    }else if (evt.target === imgFiltersForm.children[1]){
      return getFilterRandomPictures();
    }else if (evt.target === imgFiltersForm.children[2]) {
      return getFilterDiscussedPictures();
    }
  }
};
imgFiltersForm.addEventListener('click',debounce((evt)=>{getSwitchFilter(evt);}));

export {imgFilter};
