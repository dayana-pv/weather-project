let time = new Date();
let day = time.getDay();
let hour = time.getHours();
let minute = time.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[day];

if (minute < 10) {
  minute = `0${minute}`;
}

let formattedDate = `${currentDay}, ${hour}:${minute}`;

let date = document.querySelector("#date");
date.innerHTML = `${formattedDate}`;

function showData(response) {
  let cityElement = response.data.name;
  let city = document.querySelector("h1");
  city.innerHTML = cityElement;
  let temperatureElement = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#degree");
  temperature.innerHTML = temperatureElement;
  let weatherElement = response.data.weather[0].main;
  let weather = document.querySelector("#weather");
  weather.innerHTML = weatherElement;
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityElement;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
}

let apiKey = "1affa5bc7832c77e10fd88474a137ac1";

function inputCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

let element = document.querySelector("#search");
element.addEventListener("click", inputCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrent = document.querySelector("#current");
buttonCurrent.addEventListener("click", getCurrentPosition);
