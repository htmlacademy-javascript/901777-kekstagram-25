//делаем сообщение об успешной отправке
const successTemplate = document.querySelector('#success').content;
const sectionSuccess = successTemplate.querySelector('section');

const createSuccessMessage = function (){
  sectionSuccess.classList.remove('hidden');
  document.body.appendChild(successTemplate);
};

document.addEventListener('click',(evt)=>{
  const succesInner = sectionSuccess.querySelector('.success__inner');
  const succesTittle = sectionSuccess.querySelector('.success__title');
  if(evt.target !== succesInner && evt.target !== succesTittle){
    sectionSuccess.classList.add('hidden');
  }
});

//делаем сообщение об ошибке отправки формы
const errorTemplate = document.querySelector('#error').content;
const sectionError = errorTemplate.querySelector('section');

const createErrorMessage = function (){
  sectionError.classList.remove('hidden');
  document.body.appendChild(errorTemplate);
};

document.addEventListener('click',(evt)=>{
  const errorInner = sectionError.querySelector('.error__inner');
  const errorTittle = sectionError.querySelector('.error__title');
  if(evt.target !== errorInner && evt.target !== errorTittle){
    sectionError.classList.add('hidden');
  }
});

export {createSuccessMessage,createErrorMessage,sectionSuccess,sectionError,errorTemplate};
