import './css/styles.css';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce( inputCountry, DEBOUNCE_DELAY ));

inputCountry(val){
    const nameInput = val.target.value.trim();

    fetchCountries(nameInput)
        .then(createCountryInfo)
        .catch(createError)
}

function createError() {
    Notify.failure('Oops, there is no country with that name')
}