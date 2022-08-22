import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault();
  const inputCountry = input.value.trim();
  if (inputCountry === '') {
    return;
  }
  fetchCountries(inputCountry)
    .then(country => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      if (country.length === 1) {
        renderCountryInfo(country);
      } else if (country.length <= 2 && country.length <= 10) {
        renderCountryList(country);
      } else if (country.length > 10) {
        tooManyMathes();
      }
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  Notiflix.Notify.warning('Oops, there is no country with that name');
}
function tooManyMathes() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
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
