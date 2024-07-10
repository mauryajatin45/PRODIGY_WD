const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');

function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherInfo.innerHTML = 'City not found!';
      } else {
        const city = data.name;
        const temperature = Math.round(data.main.temp);
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherInfo.innerHTML = `
          <h2>${city}</h2>
          <img src="${iconUrl}" alt="${weatherDescription}">
          <p>Temperature: ${temperature}&#8480;C</p>
          <p>Weather: ${weatherDescription}</p>
        `;
      }
    })
    .catch(error => {
      console.error(error);
      weatherInfo.innerHTML = 'Error fetching weather data!';
    });
}

searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
    cityInput.value = '';
  }
});
