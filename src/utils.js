'use strict';

module.exports.getRandomDateOfLastThreeMonths = () => {
  const start = new Date(new Date(new Date().setMonth(new Date().getMonth()-3)));
  const end = new Date();
  const startHour = 0;
  const endHour = 24;
  const date = new Date(+start + Math.random() * (end - start));
  const hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date.getDate() + "-"
    + (date.getMonth()+1)  + "-"
    + date.getFullYear() + " "
    + date.getHours() + ":"
    + date.getMinutes() + ":"
    + date.getSeconds();;
};


module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};
