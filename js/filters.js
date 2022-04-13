import { getRandomNumber,debounce } from './util.js';
import { PICTURES_DATA } from './server.js';
import {createThumbnails} from './gallery.js';

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


function genrateRandom (min,max) {
  const arr =  [];
  return function () {
    let randomNumber = getRandomNumber(min,max);
    while (arr.includes(randomNumber)){
      randomNumber = getRandomNumber(min,max);
    }
    arr.push(randomNumber);
    return randomNumber;
  };
}

const createRandomFilter = function (data){
  removePicturesNodes();
  const getGenerateRandomNumber = genrateRandom(0,24);
  const arrPhotos = [];
  for (let i=0;i<10;i++){
    arrPhotos.push(data[getGenerateRandomNumber()]);
  }
  createThumbnails(arrPhotos);
};

const createDiscussedFilter = function (data){
  removePicturesNodes();
  const arr = data.slice();
  arr.sort((a,b)=>b.comments.length - a.comments.length);
  createThumbnails(arr);
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
    // eslint-disable-next-line no-alert
      alert(err);
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
    // eslint-disable-next-line no-alert
      alert(err);
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
    // eslint-disable-next-line no-alert
      alert(err);
    });
};

filterDeafault.addEventListener('click',debounce(getFilterDefaultPictures));
filterRandom.addEventListener('click',debounce(getFilterRandomPictures));
filterDiscussed.addEventListener('click',debounce(getFilterDiscussedPictures));

export {imgFilter};
