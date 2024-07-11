const apiKey = '64630afbd6092a2b7211b495a2844bcd';  // Your actual API key

async function getWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Location not found: ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function getWeatherByDropdown() {
    const citySelect = document.getElementById('citySelect');
    const location = citySelect.value;
    if (location) {
        getWeather(location);
    } else {
        alert('Please select a city');
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error(`Location not found: ${response.statusText}`);
                }
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                displayError(error.message);
            }
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `<p>${message}</p>`;
}
