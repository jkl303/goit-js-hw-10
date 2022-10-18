import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryList from './countryList.hbs';
import countryInfo from './countryInfo.hbs'
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
function clearMarkup() {
  list.innerHTML = '';
  info.innerHTML = '';
}
input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry() {
  if (input.value.trim() === '') {
    clearMarkup();
  } else {
    fetchCountries(input.value.trim()).then(countries => {
      if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        clearMarkup();
      }
      if (countries.length > 1 && countries.length <= 10) {
        list.insertAdjacentHTML('beforeend', countryList(countries));
        info.innerHTML = '';

      }
      if (countries.length === 1) {
        info.innerHTML = countryInfo(countries[0]);
        list.innerHTML = '';
      }
    
    }
    ).catch((error) => {
      Notify.failure('Oops, there is no country with that name');
      clearMarkup(); });
  }
}