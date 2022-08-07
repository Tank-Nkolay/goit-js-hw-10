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
