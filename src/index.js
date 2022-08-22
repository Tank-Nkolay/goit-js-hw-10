import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// ===========================================================

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
      if (country.length > 10) {
        tooManyMathes();
      } else if (country.length > 1 && country.length <= 10) {
        renderCountryList(country);
      } else if (country.length === 1) {
        renderCountryInfo(country);
      }
    })
    .catch(onError());
}

function onError() {
  Notiflix.Notify.warning('Oops, there is no country with that name', {
    position: 'center-top',
  });
}
function tooManyMathes() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.',
    { position: 'center-top' }
  );
}

function renderCountryList(country) {
  const markUpCountryList = country
    .map(({ name, flags }) => {
      return `<li class="country-list__new-country">
        <img class="country-list__country-flag" src='${flags.svg}' width="150" alt='Flag of ${name.official}'>
        <h2 class="country-list__item--name">${name.official}</h2>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markUpCountryList);
}

function renderCountryInfo([{ name, flags, capital, population, languages }]) {
  const markUpCountryInfo = ` <ul class="country-info__list">
            <li class="country-info__item">
              <img class="country-info__item--flag" src="${
                flags.svg
              }" width="150" alt="Flag of ${name.official}">
              <h2 class="country-info__item--name">${name.official}</h2>
            </li>
            <li class="country-info__item"><span class="country-info__item--categories">Capital: </span>${capital}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Population: </span>${population}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Languages: </span>${Object.values(
              languages
            ).join(', ')}</li>
        </ul>`;

  countryInfo.insertAdjacentHTML('beforeend', markUpCountryInfo);
}
