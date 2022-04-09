import './css/styles.css';

const DEBOUNCE_DELAY = 300;

var debounce = require('lodash.debounce');

const inputRef = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

