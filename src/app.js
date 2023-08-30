//global area

let currentWeather = 20;

// search city functionality
function displayTemperature(response) {
  console.log(response.data);
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.city;
  let li = document.querySelector(".condition");
  li.innerHTML = response.data.condition.description;
  let span = document.querySelector("#temperature");
  currentWeather = Math.round(response.data.temperature.current);
  span.innerHTML = `${currentWeather}°`;
  let image = document.querySelector("#weather-icon");
  image.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  let liHumidity = document.querySelector(".humidity");
  liHumidity.innerHTML = `Humidity:${Math.round(
    response.data.temperature.humidity
  )} %`;
  let liWind = document.querySelector(".wind");
  liWind.innerHTML = `Wind:${Math.round(response.data.wind.speed)} km/h`;

  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let liCurrentDay = document.querySelector(".current-day");
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  liCurrentDay.innerHTML = `${day} ${hour}:${minutes}`;
}
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let city = cityInput.value;
  let apiKey = "831d2db70736b432af4c7ca0oe8f007t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCity);
//current button functionality
//unit conversion to fahrenheit

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempInCelcius = currentWeather;
  let tempInFahrenheit = Math.round(tempInCelcius * (9 / 5) + 32);
  let tempInFahrenheitResult = document.querySelector("#temperature");
  tempInFahrenheitResult.innerHTML = `${tempInFahrenheit}°`;
}
let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//unit conversion to celcius
function convertToCelcius(event) {
  event.preventDefault();
  let tempInCelciusResult = document.querySelector("#temperature");
  tempInCelciusResult.innerHTML = `${currentWeather}°`;
}

let celciusLink = document.querySelector("#celcius-unit");
celciusLink.addEventListener("click", convertToCelcius);

//forecast area
function showForecast() {
  let forecastElement = document.querySelector("#weather-forecast-container");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">
  <div class="col-2 six-day-forecast">
    <div class="weather-forecast-day">Tuesday</div>
    <img
      src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
      alt="rain-day"
      id="forecast-weather-icon"
    />
    <div class="weather-forecast-temperature">
      <span class="weather-forecast-maximum-temp">18°</span>
      <span class="weather-forecast-minimum-temp"> 16°</span>
    </div>
  </div>
</div>`;
  forecastElement.innerHTML = forecastHTML;
}

showForecast();
