const BASE_URL = 'https://restcountries.com/v3.1/name/';
const option = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}${option}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        });
}