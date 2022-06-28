// Get current Date info
function formatDate(data) {
  let date = data.getDate();
  let hours = data.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  let month = months[data.getMonth()];
  let dateCalendar = `${date} ${month}`;
  let hourClock = `${hours}:${minutes}`;
  return `${dateCalendar}, ${hourClock}`;
}

function formatDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
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
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#descripton").innerHTML =
    response.data.weather[0].descripton;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function converToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let currentTime = new Date();
document.querySelector("#actual-date").innerHTML = formatDate(currentTime);
document.querySelector("#week-day").innerHTML = formatDay(currentTime);

let searchButton = document.querySelector("#form-search");
searchButton.addEventListener("submit", citySearch);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", currentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", converToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", converToCelsius);

searchCity("Lisbon");
