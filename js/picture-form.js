// eslint-disable-next-line no-use-before-define
export {scaleControlValue,imageUploadPreview};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');

const percent = '%';

scaleControlSmaller.addEventListener('click', (evt)=>{
  const scaleValue = parseInt(scaleControlValue.value, 10);
  const transformValue = (scaleValue - 25) / 100;
  if (transformValue < 0.25) {
    return;
  }
  scaleControlValue.value = (scaleValue - 25) + percent;
  imageUploadPreview.style.cssText = `transform: scale(${transformValue})`;
});

scaleControlBigger.addEventListener ('click',(evt)=>{
  const scaleValue = parseInt(scaleControlValue.value, 10);
  const transformValue = (scaleValue + 25) / 100;
  if (transformValue > 1) {
    return;
  }
  scaleControlValue.value = (scaleValue + 25)+percent;
  imageUploadPreview.style.cssText = `transform: scale(${transformValue})`;
});
