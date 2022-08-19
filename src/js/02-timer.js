// ИМПОРТЫ ===================================================================
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// ВЕШАЕМ КОНСТАНТЫ - СЛУШАТЕЛЬ ЗНАЧЕНИЙ =====================================
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// функция подсчета времени ====================================================
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// функция форматирует внешний вид интерфейса ==================================
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// настройки выбора даты =======================================================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    }
  },
};

// функция запуска кнопки СТАРТ (отсчет времени) ================================
function onStartTimer() {
  let timerId = setInterval(() => {
    let countDiff = new Date(input.value) - new Date();
    startBtn.disabled = true;

    if (countDiff >= 0) {
      let time = convertMs(countDiff);
      days.textContent = addLeadingZero(time.days);
      hours.textContent = addLeadingZero(time.hours);
      minutes.textContent = addLeadingZero(time.minutes);
      seconds.textContent = addLeadingZero(time.seconds);
    } else if (countDiff <= 1) {
      Notiflix.Notify.success('FINISH', { position: 'center-top' });
      clearInterval(timerId);
    }
  }, 1000);
}

// ИНИЦИИРУЕМ =====================================================================
flatpickr(input, options);
startBtn.addEventListener('click', onStartTimer);
