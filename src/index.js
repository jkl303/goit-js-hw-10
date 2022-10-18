import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryList from './countryList.hbs';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry() {
  if (input.value.trim() === '') {
    list.innerHTML = '';
    info.innerHTML = '';
  } else {
    fetchCountries(input.value.trim()).then(countries => {
    
      if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
      }
      if (countries.length > 1 && countries.length <= 10) {
        console.log(countries[0].name.common);
        list.insertAdjacentHTML('beforeend', countryList(countries))
      } else {
      }
    
    }
    ).
      catch((error) => console.log(error));
  }
}
    // const { name, capital, population, flags, languages } = countries[0];
    //
    //     console.log(name.official);
    //     console.log(capital[0]);
    //     console.log(population);
    //     console.log(flags.svg);
    //     console.log(Object.values(languages));
    //     }
    console.log(8);