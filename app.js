const title = document.querySelector('#city-name');
const temperatureDisplay = document.querySelector('#temp');
const weatherDisplay = document.querySelector('#weather');
const maxTempDisplay = document.querySelector('#max-temp');
const minTempDisplay = document.querySelector('#min-temp');
const precipitationDisplay = document.querySelector('#precip-mm')
const feelsLikeDisplay = document.querySelector('#feels-like')
const image = document.querySelector('img');

const baseEndPoint = 'http://api.weatherapi.com/v1';
const APIKEY = null //API KEY HERE;

//function to fetch data
async function getWeather(type, city) {
    const response = await fetch(`${baseEndPoint}/${type}.json?key=${APIKEY}&q=${city}`)
    const data = await response.json();
    return data;
}


//change city on form input
const form = document.querySelector('form');
let selectedCity = 'geneva';

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    let search = document.querySelector('#city').value;
    search.toLowerCase();
    selectedCity = search;
    await updateWeatherInfo();
})

//functions to display each data point
let cityName = (city) => getWeather('current', city).then(data => title.innerText = data.location.name);
let currentTemp = (city) => getWeather('current', city).then(data => temperatureDisplay.innerText = data.current.temp_c);
let weather = (city) => getWeather('current', city).then(data => weatherDisplay.innerText = data.current.condition.text);
let feelslike = (city) => getWeather('current', city).then(data => feelsLikeDisplay.innerText = data.current.feelslike_c);
let precipitation = (city) => getWeather('forecast', city).then(data => precipitationDisplay.innerText = data.forecast.forecastday[0].day.totalprecip_mm);
let maxTemp = (city) => getWeather('forecast', city).then(data => maxTempDisplay.innerText = data.forecast.forecastday[0].day.maxtemp_c);
let minTemp = (city) => getWeather('forecast', city).then(data => minTempDisplay.innerText = data.forecast.forecastday[0].day.mintemp_c);
let img = (city) => getWeather('current', city).then(data => image.src = `http://${data.current.condition.icon}`);

async function updateWeatherInfo() {
    cityName(selectedCity);
    currentTemp(selectedCity);
    weather(selectedCity);
    feelslike(selectedCity);
    precipitation(selectedCity);
    maxTemp(selectedCity);
    minTemp(selectedCity);
    img(selectedCity);
}

// Initial weather data for the default city
updateWeatherInfo();
