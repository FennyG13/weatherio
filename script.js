function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temp-value");
  temperatureElement.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  let weatherDescription = response.data.condition.description;
  descriptionElement.innerHTML = `${weatherDescription}`;

  let iconElement = document.querySelector("#icon");
  let weatherIcon = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${weatherIcon}"/>`;

  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windSpeedElement = document.querySelector("#wind-value");
  windSpeedElement.innerHTML = response.data.wind.speed;

  let currentDay = document.querySelector("#current-date");
  let now = new Date();
  currentDay.innerHTML = formatDate(now);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function searchCity(city) {
  let apiKey = "b80459da9dft5ob63a3c208bf6a17d18";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Boston");
