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
function onSubmitBtn(e) {
  e.preventDefault();
  delay = Number(e.currentTarget.delay.value);
  step = Number(e.currentTarget.step.value);
  amount = Number(e.currentTarget.amount.value);
  if (delay >= 0 && step >= 0 && amount > 0) {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delay)
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
      delay += step;
    }
  } else {
    Notiflix.Notify.warning('Данные в полях, должны быть больше нуля', {
      position: 'center-top',
    });
  }
}

// ИНИЦИИРУЕМ =====================================================================
form.addEventListener('submit', onSubmitBtn);
