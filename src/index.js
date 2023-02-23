import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    e.preventDefault()
    
    const inputValue = e.target.value.trim()
    
    fetchCountries(inputValue).then((response) => {
        
        checkQuantityOfCountries(response)
    })
    .catch(error => {
        console.log(error.message)
        Notify.failure("Oops, there is no country with that name")
        addMarkup('', '')
    })

}

function createMainMarkup({name, capital, population, flags, languages}) {
    
    return `<div class="country-info">
    <h2 class="country-name">Name: ${name.official}</h2>
    <p class="country-capital">Capital: ${capital}</p>
    <p class="country-population">Population: ${population}</p>
    <p class="country-flag">Flags: <img src="${flags.svg}" width="40"
   alt="flag"></p>
    <p class="country-language">Languages: ${Object.values(languages)}</p>
    </div>`
}

function createCountryList(countriesList = []) {
    return countriesList.map(({name, flags}) => {
       return `<li style="margin-bottom: 20px";><img src="${flags.svg}" alt="flag" width="40"  style="margin-right: 10px";/><span> ${name.official}</span></li>` 
    })
}

function addMarkup(mainMarkup = "", countriesList = "") {
    countryInfoEl.innerHTML = mainMarkup;
    countryListEl.innerHTML = countriesList;
}

function checkQuantityOfCountries(response = []) {

    if(response.length === 1) {
        
        const mainMarkup = createMainMarkup(response[0]);
        addMarkup(mainMarkup, '');
    } else if(response.length > 1 && response.length < 10) {
        
        const countryList = createCountryList(response)
        addMarkup('', countryList);
    } else if(response.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
    }
}
// {name, capital, population, flags, languages}