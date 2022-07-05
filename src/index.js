// Get current Date info
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Dececember",
  ];
  let month = months[date.getMonth()];

  return `${day} ${month} at ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function searchCity(city) {
  let apiKey = "198980771e81f379fdd6a032c49dd66d";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(getWeather);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function getWeather(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#descripton").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#actual-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#week-day").innerHTML = formatDay(response.data.dt);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getInfoForecast(response.data.coord);
}

function getInfoForecast(coordinates) {
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiKey = "198980771e81f379fdd6a032c49dd66d";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let apiURL = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(getForecast);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "198980771e81f379fdd6a032c49dd66d";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(getWeather);
}

function converToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function converToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function getForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col d1">
      <br />
      <div class="dayWeek">${formatDay(forecastday.dt)}</div>
      <div class="dayNumber">${formatDateForecast(forecastday.dt * 1000)}</div>
      <div class="dweatherIcon"><img src="http://openweathermap.org/img/wn/${
        forecastday.weather[0].icon
      }@2x.png" alt="" width="80"/></div>
      <div class="forecastTemperature">
        <span class="maxTemperature">${Math.round(forecastday.temp.max)}º</span>
        <strong> | </strong>
        <span class="minTemperature">${Math.round(forecastday.temp.min)}º</span>
      </div>
      <div class="dweatherInfo">${forecastday.weather[0].main}</div>

   </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function formatDateForecast(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[date.getMonth()];

  return `${day}/${month}`;
}

let celsiusTemperature = null;

let searchButton = document.querySelector("#form-search");
searchButton.addEventListener("submit", citySearch);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", converToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", converToCelsius);

searchCity("Lisbon");
