// ИМПОРТЫ ===================================================================
import Notiflix from 'notiflix';

// ВЕШАЕМ КОНСТАНТЫ и ПЕРЕМЕННЫЕ - СЛУШАТЕЛЬ ЗНАЧЕНИЙ ========================
const form = document.querySelector('form');
let delay = document.querySelector('input[name="delay"]');
let step = document.querySelector('input[name="step"]');
let amount = document.querySelector('input[name="amount"]');

// функция рандомного исполнения ПРОМИС ======================================
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// функция ГЕНЕРИРОВАНИЯ КОЛИЧЕСТВА ПРОМИС =====================================
function onFormSubmit(event) {
  event.preventDefault();
  delay = Number(event.currentTarget.delay.value);
  step = Number(event.currentTarget.step.value);
  amount = Number(event.currentTarget.amount.value);
  if (delay >= 0 && step >= 0 && amount > 0) {
    for (let position = 1; position <= amount; position += 1) {
      delay += step;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  } else {
    Notiflix.Notify.warning('Put value > 0');
  }
}

// ИНИЦИИРУЕМ =====================================================================
form.addEventListener('submit', onFormSubmit);
