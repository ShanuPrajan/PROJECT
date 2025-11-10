// Replace with your actual API key from OpenWeatherMap
const API_KEY = '648d8cd674f9f1f36add02a74da86c33';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const errorMessage = document.getElementById('error-message');
const cityNameEl = document.getElementById('city-name');
const dateTimeEl = document.getElementById('date-time');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const unitToggle = document.getElementById('unit-toggle');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');

let units = localStorage.getItem('units') || 'metric';

// Load last searched city on page load
window.addEventListener('load', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        fetchWeather(lastCity);
    }
    updateUnitToggle();
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name.');
        return;
    }
    fetchWeather(city);
});

unitToggle.addEventListener('click', () => {
    units = units === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('units', units);
    updateUnitToggle();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

function updateUnitToggle() {
    unitToggle.textContent = units === 'metric' ? '°F' : '°C';
}

function fetchWeather(city) {
    const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            localStorage.setItem('lastCity', city);
        })
        .catch(error => {
            showError(error.message);
        });
}

function displayWeather(data) {
    const { name, sys, main, weather, wind, timezone } = data;
    const cityCountry = `${name}, ${sys.country}`;
    const tempUnit = units === 'metric' ? '°C' : '°F';
    const temp = `${Math.round(main.temp)}${tempUnit}`;
    const desc = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const humidity = main.humidity;
    const windSpeedUnit = units === 'metric' ? 'km/h' : 'mph';
    const windSpeedMultiplier = units === 'metric' ? 3.6 : 2.237; // m/s to km/h or mph
    const windSpeed = Math.round(wind.speed * windSpeedMultiplier);

    // Date and time in city's timezone
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utcTime + (timezone * 1000));
    const dateTimeString = cityTime.toLocaleString();

    cityNameEl.textContent = cityCountry;
    dateTimeEl.textContent = dateTimeString;
    weatherIconEl.src = iconUrl;
    temperatureEl.textContent = temp;
    descriptionEl.textContent = desc;
    humidityEl.textContent = humidity;
    windSpeedEl.textContent = `${windSpeed} ${windSpeedUnit}`;

    // Set background based on weather
    document.body.dataset.weather = weather[0].main;

    weatherDisplay.style.display = 'block';
    errorMessage.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    weatherDisplay.style.display = 'none';
}