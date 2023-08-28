// search city functionality
function displayTemperature(response) {
  console.log(response.data);
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.city;
  let li = document.querySelector(".condition");
  li.innerHTML = response.data.condition.description;
  let span = document.querySelector("#temperature");
  span.innerHTML = Math.round(response.data.temperature.current);
  //let i = document.querySelector("#current-temperature-icon");
  //i.innerHTML = response.data.condition.icon;
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
    `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    `0${minutes}`;
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
