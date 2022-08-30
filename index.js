let now = new Date();
function formatDate(something) {
  let days = [
    "Sunday",
    "Monday",
    "Thuerday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = String(now.getMinutes()).padStart(2, "0");
  return day + ", " + hour + ":" + minutes;
}
let date = document.querySelector("h3.today");
date.innerHTML = formatDate(new Date());

function showWeather(response) {
  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML =temperature;
  let humid = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  humid.innerHTML = humidity;
  let windSpeed = document.querySelector("#wind");
  let windC = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = windC;
  let cityCity = response.data.name;
  city.innerHTML = cityCity;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let description = document.querySelector ("#weatherDespription");
  description.innerHTML = response.data.weather[0].description;
}

function citySearch(event) {
  event.preventDefault();
  let cityName = result.value;
  let apiKey = "0821c8cf6027f99510009d583653b393";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let city = document.querySelector("#nameChange");
let result = document.querySelector("#inputC");
let citySelect = document.querySelector("#city-form");
citySelect.addEventListener("click", citySearch);


function retrievePosition(position) {
  let apiKey = "0821c8cf6027f99510009d583653b393";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlGeo).then(showWeather);
}

function navigation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let locationSelect = document.querySelector(".fa-location-dot");
locationSelect.addEventListener("click", navigation);
