function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(".current-temp-value");
  temperatureElement.innerHTML = `${temperature}`;
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector(".current-description");
  let weatherDescription = response.data.condition.description;
  descriptionElement.innerHTML = `${weatherDescription}`;

  let iconElement = document.querySelector(".current-weather-icon");
  let weatherIcon = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${weatherIcon}"/>`;

  let humidityElement = document.querySelector(".current-humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windSpeedElement = document.querySelector(".current-wind");
  windSpeedElement.innerHTML = response.data.wind.speed;

  let now = new Date();
  let currentDay = document.querySelector(".current-day");
  currentDay.innerHTML = formatDate(now);

  getForecast(response.data.city);
}

function formatDate(date) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b80459da9dft5ob63a3c208bf6a17d18";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector(".forecast-container");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecast">
          <div class="row">
            <div class="column-2">
              <div class="forecast-date">${formatDay(day.time)}</div>
              <img
                src="${day.condition.icon_url}" class="forecast-icon"/>
              <div class="forecast-temp"><span class="max-temp">${Math.round(
                day.temperature.maximum
              )}</span>° / <span class="min-temp">${Math.round(day.temperature.minimum)}°</span></div>
            </div>
          </div>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Boston");
