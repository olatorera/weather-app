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

const getForecast = (coordinates) => {
  const getForecastKey = "3f4aa0abbcaff6a7e1ba0obe64d3691t";
  const getForecastUnit = "metric";
  const getForecastApi = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${getForecastKey}&units=${getForecastUnit}`;
  console.log(getForecastApi, "metas");
  axios.get(getForecastApi).then(displayForecast);
};

function weatherResponse(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHToriML =
    response.data.condition.description;
  // iconElement.setAttribute(
  //   "src",
  //   `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/{response.data.condition.icon_url}`
  // );
  iconElement.setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function search(event) {
  event.preventDefault();
  // let cityElement = document.querySelector("#city");
  // let searchQuery = document.querySelector("#search-query");
  // cityElement.innerHTML = searchQuery.value;
  // Making an API call once i get the response it wil be displayed

  let apiKey = "3f4aa0abbcaff6a7e1ba0obe64d3691t";
  let city = document.querySelector("#search-query").value;
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  console.log(apiUrl, "me");
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

const displayForecast = (coordinates) => {
  console.log(coordinates.data.daily, "datares");
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col">
    <div class="card each-card">
      <h5>${day}</h5>
      <img
        src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png"
        class="card-img-top"
        alt="..."
      />
      <div>
        <span class="sec-2-text-max">31°</span>
        <span class="sec-2-text-min">24°</span>
      </div>
    </div>
  </div>
  `;
  });

  forecastElement.innerHTML = forecastHTML;

  forecastHTML = `</div>`;
};

displayForecast();
