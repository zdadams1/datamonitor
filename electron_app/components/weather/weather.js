const weatherNowEl = document.getElementById('weather-now');
const weatherHourlyEl = document.getElementById('weather-hourly');
const weatherDailyEl = document.getElementById('weather-daily');
const axios = require('axios');

const SERVER_URL = 'http://localhost:3001'; // Please replace with your server URL

function formatHour(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}${period}`;
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

async function updateWeather() {
  const weatherData = await axios.get(`${SERVER_URL}/weather`);
  const currentWeather = `${celsiusToFahrenheit(weatherData.data.current.temp).toFixed(1)}`;
  const hourlyWeather = weatherData.data.hourly
    .slice(0, 6)
    .map(
      (hour) => `<span class="white-label">${formatHour(hour.dt)}</span> ${celsiusToFahrenheit(hour.temp).toFixed(1)}`
    )
    .join(" ");
  const dailyWeather = weatherData.data.daily
    .slice(0, 6)
    .map(
      (day) => `<span class="white-label">${formatDate(day.dt)}</span> ${celsiusToFahrenheit(day.temp.max).toFixed(1)}`
    )
    .join(" ");
  weatherNowEl.innerHTML = currentWeather;
  weatherHourlyEl.innerHTML = hourlyWeather;
  weatherDailyEl.innerHTML = dailyWeather;
  console.log(weatherData);
}
updateWeather();
setInterval(updateWeather, 400000);

module.exports = {
  updateWeather: updateWeather
};
