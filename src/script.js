let getDate = (date) => {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${days[day]} ${hours} : ${minutes}`;
};

let timeSelector = document.querySelector("#current-time");
let date = new Date();
timeSelector.innerHTML = getDate(date);
let iconElement = document.querySelector("#icon");

function weatherResponse(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
  event.preventDefault();
  // let cityElement = document.querySelector("#city");
  // let searchQuery = document.querySelector("#search-query");
  // cityElement.innerHTML = searchQuery.value;
  // Making an API call once i get the response it wil be displayed
  let apiKey = "7b903fce3e3e1cc78f5ab959d5b024a5";
  let city = document.querySelector("#search-query").value;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weatherResponse);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

let convertToFahrenit = (event) => {
  event.preventDefault();
  let getTemperature = document.querySelector("#temperature");
  let temperature = getTemperature.innerHTML;
  temperature = Number(temperature);
  getTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
};

let fahrenitLink = document.querySelector("#fahrenit-link");
fahrenitLink.addEventListener("click", convertToFahrenit);

let convertToCelsuis = (event) => {
  event.preventDefault();
  let getTemperature = document.querySelector("#temperature");
  let temperature = getTemperature.innerHTML;
  temperature = Number(temperature);
  getTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
};

let celsuisLink = document.querySelector("#celsuis-link");
celsuisLink.addEventListener("click", convertToCelsuis);

// displaying the weather forecast multiple times

const displayForecast = () => {
  const forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = `"Forecast"`;
};

displayForecast();
