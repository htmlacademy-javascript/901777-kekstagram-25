// eslint-disable-next-line no-use-before-define
export {scaleControlValue,imageUploadPreview};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview').children[0];

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const slider = document.querySelector('.img-upload__effect-level');
const percent = '%';

//скрываем слайдер эффекта
slider.classList.add('hidden');

//генерируем слайдер
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

//обработчик изменения полузнка слайдера
effectLevelSlider.noUiSlider.on('update',()=>{
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  switch (imageUploadPreview.classList[0]) {
    case 'effects__preview--chrome': imageUploadPreview.style.filter = `grayscale(${effectLevelSlider.noUiSlider.get()})`;
      break;
    case 'effects__preview--sepia': imageUploadPreview.style.filter = `sepia(${effectLevelSlider.noUiSlider.get()})`;
      break;
    case 'effects__preview--marvin': imageUploadPreview.style.filter = `invert(${effectLevelSlider.noUiSlider.get()}%)`;
      break;
    case 'effects__preview--phobos': imageUploadPreview.style.filter = `blur(${effectLevelSlider.noUiSlider.get()}px)`;
      break;
    case 'effects__preview--heat': imageUploadPreview.style.filter = `brightness(${effectLevelSlider.noUiSlider.get()})`;
      break;
  }
});

//функция которая передается при выборе эффекта
const addClassPhotoPreview = function (evt) {
  imageUploadPreview.className = '';
  imageUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  slider.classList.remove('hidden');
  switch (imageUploadPreview.classList[0]) {
    case 'effects__preview--chrome': effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }); imageUploadPreview.style.filter = 'chrome(1)';
      break;
    case 'effects__preview--sepia': effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    }); imageUploadPreview.style.filter = 'sepia(1)';
      break;
    case 'effects__preview--marvin': effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    }); imageUploadPreview.style.filter = 'invert(100%)';
      break;
    case 'effects__preview--phobos': effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }); imageUploadPreview.style.filter = 'blur(3px)';
      break;
    case 'effects__preview--heat': effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    }); imageUploadPreview.style.filter = 'brightness(3)';
      break;
    case 'effects__preview--none': imageUploadPreview.style.filter = ''; slider.classList.add('hidden');
      break;
  }
};

//обработчик клика по эффекту
effectsList.addEventListener ('click', addClassPhotoPreview);

//уменьшение масштаба фото
scaleControlSmaller.addEventListener('click', ()=>{
  const scaleValue = parseInt(scaleControlValue.value, 10);
  const transformValue = (scaleValue - 25) / 100;
  if (transformValue < 0.25) {
    return;
  }
  scaleControlValue.value = (scaleValue - 25) + percent;
  imageUploadPreview.style.transform = `scale(${transformValue})`;
});

//увелечение масштаба фото
scaleControlBigger.addEventListener ('click',()=>{
  const scaleValue = parseInt(scaleControlValue.value, 10);
  const transformValue = (scaleValue + 25) / 100;
  if (transformValue > 1) {
    return;
  }
  scaleControlValue.value = (scaleValue + 25)+percent;
  imageUploadPreview.style.transform = `scale(${transformValue})`;
});

