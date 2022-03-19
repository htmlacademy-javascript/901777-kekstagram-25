import './create-thumbnails.js';
import './full-size-picture.js';
import {picturesNode} from './full-size-picture.js';
import {createPhotosArr} from './data-photos.js';



const getCommentsBigPicture = function (picture,comments) {
picture.addEventListener ('click', ()=> {
   console.log(comments);
});
};


for (let i=0; i<createPhotosArr.length;i++){
  getCommentsBigPicture(picturesNode[i],createPhotosArr[i].comments);
}


