import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// функция - обработки вводимых данных по количеству символов ============================================
function onFormInput(e) {
  e.preventDefault();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  const inputData = input.value.trim();
  if (inputData === '') {
    return;
  }

  fetchCountries(inputData)
    .then(country => {
      if (country.length === 1) {
        createCountryInfo(country);
      } else if (country.length > 1 && country.length <= 10) {
        createCountryList(country);
      } else if (country.length > 10) {
        onInputLotsOfData();
      }
    })
    .catch(onError);
}

// функция - оповещение НЕТ СТРАН ДЛЯ ВЫВОДА ====================================================
function onError() {
  Notiflix.Notify.warning('Oops, there is no country with that name', {
    position: 'center-top',
  });
}

// функция - оповещение СЛИШКОМ МНОГО СТРАН ДЛЯ ВЫВОДА ====================================================
function onInputLotsOfData() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.',
    { position: 'center-top' }
  );
}

// функция - добавить разметку список СТРАН ====================================================
function createCountryList(e) {
  const showCountry = e
    .map(({ name, flags }) => {
      return `<li class="country-list__item">
        <img class="country-list__item--img" src='${flags.svg}' alt='Flag of ${name.official}' width="100">
        <h2 class="country-list__item--header">${name.official}</h2>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', showCountry);
}

// функция - добавить разметку поной информация СТРАНА ====================================================
function createCountryInfo([{ name, flags, capital, population, languages }]) {
  const showAllCountryInfo = ` 
            <div class="country-info__cont">
              <img class="country-info__item--img" src="${
                flags.svg
              }" alt="Flag of ${name.official}" width="100">
              <h2 class="country-info__item--header">${name.official}</h2>
            </div>
            <ul class="country-info__list">
                <li class="country-info__item"><span>Capital: </span>${capital}</li>
                <li class="country-info__item"><span>Population: </span>${population}</li>
                <li class="country-info__item"><span>Languages: </span>${Object.values(
                  languages
                ).join(', ')}</li>
            </ul>`;
  countryInfo.insertAdjacentHTML('beforeend', showAllCountryInfo);
}
