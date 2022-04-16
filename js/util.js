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

//Функция получает рандомный элемент из массива
const getRandomElem = function (arr){
  return arr[getRandomNumber(0,arr.length-1)];
};

//Вводим функцию счетчики для того чтобы значения не повторялись в нужных значениях объекта
const getCounter = function () {
  let counter = 1;
  return function() {
    return counter++;
  };
};

const debounce = function (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {getRandomNumber, getMaxLength,getRandomElem, getCounter,debounce};
