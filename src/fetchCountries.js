export function fetchCountries(name) {
  const baseUrl = 'https://restcountries.com/v3.1/name/';
  const ourFilter = '?fields=name,capital,population,flags,languages';
  return fetch(`${baseUrl}${name}${ourFilter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
