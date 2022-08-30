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
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
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

function search(city) {
  let apiKey = "0821c8cf6027f99510009d583653b393";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#inputC");
  search(cityInputElement.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

search("New York");

let city = document.querySelector("#nameChange");
let result = document.querySelector("#inputC");



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

function showFarenheitTemperature (event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9)/5 + 32;
  let temparatureElement = document.querySelector ("#temperature");
  temparatureElement.innerHTML = Math.round(farenheitTemperature);
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  celciusLink.classList.add("default");
}

function showCelciusTemperature (event) {
  event.preventDefault();
  let temparatureElement = document.querySelector ("#temperature");
  temparatureElement.innerHTML = Math.round(celsiusTemperature);
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#faren");
farenheitLink.addEventListener ("click", showFarenheitTemperature);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener ("click", showCelciusTemperature);
