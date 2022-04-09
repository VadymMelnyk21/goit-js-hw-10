import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce( inputCountry, DEBOUNCE_DELAY ));

function inputCountry(val) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    const nameInput = val.target.value.trim();

    fetchCountries(nameInput)
        .then(createCountryInfo)
        .catch(createError)
}

function createCountryInfo(data) {
    if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return
    }

    if (data.length === 1) {
        oneCountyInfo(data, option)
        return
    }
    
    markupCountriesList(data)
}

function createError() {
    Notify.failure('Oops, there is no country with that name')
    return
}

function markupCountriesList(data) {
    countryInfo.textContent = '';

    const create = data.map(({ flags, name }) => `
    <li class="country-item"> 
    <img src="${flags.svg}" alt="${name.official}"
    width="60px" height="40px">
    <p class="county-name"> ${name.official} </p>
    </li>
    `,).join('');

    countryList.innerHTML = create;
}