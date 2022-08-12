import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onChangingDataValues() {
  const saveData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (saveData) {
    Object.entries(saveData).forEach(([key, value]) => {
      formData[key] = value;
      form.elements[key].value = value;
    });
  }
}
onChangingDataValues();

function onFormSubmit(evt) {
  evt.preventDefault();

  const emeil = document.querySelector('input');
  const message = document.querySelector('textarea');
  if (emeil.value === '' || message.value === '') {
    alert(`Для отправки формы, заполните все поля`);
  } else {
    form.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}

console.log(formData);

// ===========================================================================

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
