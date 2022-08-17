const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

// функция генератор случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    console.log(color);
    body.style.backgroundColor = color;
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerId);
  console.log('STOP');

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

// =====================================================================================
