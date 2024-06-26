("use strict");

let cities = [
  {
    name: "Los Angeles, CA",
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    name: "New York, NY",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    name: "Chicago, IL",
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    name: "Miami, FL",
    latitude: 25.7617,
    longitude: -80.1918,
  },
];

const cityList = document.querySelector("#cityList");
const weatherInfoTB = document.querySelector("#weatherInfoTB");

function buildCityList() {
  for (const city of cities) {
    let option = new Option(city.name);
    cityList.appendChild(option);
  }
}

function fillTable(city) {
  weatherInfoTB.innerText = "";
  for (const prop of city.properties.periods) {
    let row = weatherInfoTB.insertRow();

    let cell1 = row.insertCell();
    cell1.innerText = prop.name;

    let cell2 = row.insertCell();
    cell2.innerText = prop.temperature + prop.temperatureUnit;
    let cell3 = row.insertCell();
    cell3.innerText = prop.shortForecast;
  }
}

function loadWeather() {
  const city = cities.find((c) => c.name == cityList.selectedOptions[0].value);
  fetch(`https://api.weather.gov/points/${city.latitude},${city.longitude}`)
    .then((response) => response.json())
    .then((city) => {
      return city.properties.forecast;
    })
    .then((forecast) => {
      return fetch(`${forecast}`);
    })
    .then((response) => response.json())
    .then((city) => {
      console.log(city.properties.periods);
      fillTable(city);
    });
}

cityList.onchange = loadWeather;
buildCityList();
