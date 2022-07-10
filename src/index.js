import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 600;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};




//  https://restcountries.com/v2/all?fields=name,capital,currencies

const debouncedOnInput = debounce(onInput, DEBOUNCE_DELAY)

refs.input.addEventListener('input', debouncedOnInput);

function onInput(e) {
    e.preventDefault();
    console.log(refs.input.value);
    fetchCountries(refs.input.value).then(country => {
    console.log(country);
});
};

// нужно узнать как получать только нужные свойства