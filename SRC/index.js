function locationDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#current").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "c306699dcaafe44db5b96f95639efe63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c306699dcaafe44db5b96f95639efe63";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#location-date");
let currentTime = new Date();
dateElement.innerHTML = locationDate(currentTime);

let searchForm = document.querySelector("#location-submit");
searchForm.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentlocation);

searchCity("Newcastle");
