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
    const nameInput = val.target.value.trim();

    if (!nameInput) {
        clearContent()
        return
    }

    fetchCountries(nameInput)
        .then(createCountryInfo)
        .catch(createError)
}

function createCountryInfo(data) {
    if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    }

    if (data.length === 1) {
        oneCountyInfo(data)
        return;
    }
    
    markupCountriesList(data)
}

function oneCountyInfo(data) {
    const { name, capital, population, flags } = data[0];
    const languages = Object.values(data[0].languages).join('; ');

    countryList.innerHTML = '';

    countryInfo.innerHTML = `
    <img src="${flags.svg}" alt="${name.official}"
    width="60px" height="40px">
    <p class="county-name"> ${name.official} </p>
    <ul class="one-country__list">
        <li class="one-country__item"> Capital: ${capital}
        </li>
        <li class="one-country__item"> Population: ${population} people
        </li>
        <li class="one-country__item"> Languages: ${languages}
        </li>
    </ul>
    `
}

function markupCountriesList(data) {
    countryInfo.innerHTML = '';

    const create = data.map(({ flags, name }) => `
    <li class="country-item"> 
    <img src="${flags.svg}" alt="${name.official}"
    width="90px" height="60px">
    <p class="county-name"> ${name.official} </p>
    </li>
    `,).join('');

    countryList.innerHTML = create;
}

function createError() {
    Notify.failure('Oops, there is no country with that name')
    inputRef.value='';
    return
}

function clearContent() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}