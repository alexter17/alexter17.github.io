const city = document.getElementById("city");
const currentLocation = document.getElementById("location");
const temperature = document.getElementById("temperature");
const feels = document.getElementById("feels");
const weather = document.getElementById("weather");
const humid = document.getElementById("humidity");
const wind = document.getElementById("wind-speed");

const time = document.getElementById("time");
const temperatureTime = document.getElementById("temperatureTime");
const feelsTime = document.getElementById("feelsTime");
const weatherTime = document.getElementById("weatherTime");
const humidTime = document.getElementById("humidityTime");
const windTime = document.getElementById("wind-speedTime");

const slider = document.getElementById("slider");

const Br = document.getElementById("firstBr");

const apiKey = '615b67c1a11bc619efb63edf2b298c72';
const cityInputBtn = document.getElementById('cityInput');
const searchBtn = document.getElementById("searchBtn");
let latitude;
let longitude;
let num = 0;

if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)) {
            Br.style.display = "none";
            device.innerHTML = "Einige Funktionen funktionieren möglicherweise nicht auf Ihrem Gerät"
         }

function ClearInput() {
  document.getElementById("cityInput").value = "";
}

function ClearFields() {
  city.innerHTML = ""
  temperature.innerHTML = "";
  feels.innerHTML = "";
  weather.innerHTML = "";
  humid.innerHTML = "";
  wind.innerHTML = "";
}

cityInputBtn.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();

  }
})

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition, showError);
    } else { 
      ClearFields();
      city.innerHTML = "Lokalisierung wird von diesem Browser nicht unterstützt.";
    }
  }

function savePosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getWeatherCurrent();
  getWeatherCurrentTime();
}
  
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      ClearFields();
      city.innerHTML = "Benutzer hat die Anfrage nach Lokalisierung abgelehnt."
      break;
    case error.POSITION_UNAVAILABLE:
      ClearFields();
      city.innerHTML = "Standortinformationen sind nicht verfügbar."
      break;
    case error.TIMEOUT:
      ClearFields();
      city.innerHTML = "Die Anfrage des Benutzerstandorts ist abgelaufen."
      break;
    case error.UNKNOWN_ERROR:
      ClearFields();
      city.innerHTML = "Ein unbekannter Fehler ist aufgetreten."
      break;
  }
}

function cityNotFound(){
  city.innerHTML = "Stadt nicht gefunden"
  temperature.innerHTML = "";
  feels.innerHTML = "";
  weather.innerHTML = "";
  humid.innerHTML = "";
  wind.innerHTML = "";

  time.innerHTML = "";
  temperatureTime.innerHTML = "";
  feelsTime.innerHTML = "";
  weatherTime.innerHTML = "";
  humidTime.innerHTML = "";
  windTime.innerHTML = "";

  slider.style.display = "none";
}

async function getWeatherCurrent(){
  const apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  city.innerHTML =  "Wetter gerade in " + data.name + ", " + data.sys.country;
  temperature.innerHTML = "Temperatur: " + Math.round(data.main.temp) + "°C";
  feels.innerHTML = "Gefühlt: " + Math.round(data.main.feels_like) + "°C";
  weather.innerHTML = "Wetterlage: " + data.weather[0].description;
  humid.innerHTML = "Luftfeuchtigkeit: " + data.main.humidity + "%";
  wind.innerHTML = "Windgeschwindigkeit: " + Math.round(data.wind.speed) + " km/h";

  slider.style.display = "flex";
  num = 0;
  document.getElementById("sliderRange").value = 0;
}

async function getWeatherCity(){
  const cityInput = document.getElementById('cityInput').value;
  const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if(data.cod == "404"){
    cityNotFound();
    return;

  }

  latitude = data.coord.lat;
  longitude = data.coord.lon;

  city.innerHTML =  "Wetter gerade in " + data.name + ", " + data.sys.country;
  temperature.innerHTML = "Temperatur: " + Math.round(data.main.temp) + "°C";
  feels.innerHTML = "Gefühlt: " + Math.round(data.main.feels_like) + "°C";
  weather.innerHTML = "Wetterlage: " + data.weather[0].description;
  humid.innerHTML = "Luftfeuchtigkeit: " + data.main.humidity + "%";
  wind.innerHTML = "Windgeschwindigkeit: " + Math.round(data.wind.speed) + " km/h";

  slider.style.display = "flex";
  num = 0;  
  document.getElementById("sliderRange").value = 0;
}

async function getWeatherCurrentTime(){
  const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  time.innerHTML = "Wetter am " + data.list[num].dt_txt.substr(8,2) + "." + data.list[num].dt_txt.substr(5,2) + " um " + data.list[num].dt_txt.substr(11,5) + " Uhr";
  temperatureTime.innerHTML = "Temperatur: " + Math.round(data.list[0].main.temp) + "°C";
  feelsTime.innerHTML = "Gefühlt: " + Math.round(data.list[0].main.feels_like) + "°C";
  weatherTime.innerHTML = "Wetterlage: " + data.list[0].weather[0].description;
  humidTime.innerHTML = "Luftfeuchtigkeit: " + data.list[0].main.humidity + "%";
  windTime.innerHTML = "Windgeschwindigkeit: " + Math.round(data.list[0].wind.speed) + " km/h";
}

async function getWeatherCityTime(){
  const cityInput = document.getElementById('cityInput').value;
  const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  time.innerHTML = "Wetter am " + data.list[num].dt_txt.substr(8,2) + "." + data.list[num].dt_txt.substr(5,2) + " um " + data.list[num].dt_txt.substr(11,5) + " Uhr";
  temperatureTime.innerHTML = "Temperatur: " + Math.round(data.list[0].main.temp) + "°C";
  feelsTime.innerHTML = "Gefühlt: " + Math.round(data.list[0].main.feels_like) + "°C";
  weatherTime.innerHTML = "Wetterlage: " + data.list[0].weather[0].description;
  humidTime.innerHTML = "Luftfeuchtigkeit: " + data.list[0].main.humidity + "%";
  windTime.innerHTML = "Windgeschwindigkeit: " + Math.round(data.list[0].wind.speed) + " km/h";
}

slider.oninput = function() {
  num = document.getElementById("sliderRange").value;
  getTime(num);
}

async function getTime(num){
  const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=de`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  time.innerHTML = "Wetter am " + data.list[num].dt_txt.substr(8,2) + "." + data.list[num].dt_txt.substr(5,2) + " um " + data.list[num].dt_txt.substr(11,5) + " Uhr";
  temperatureTime.innerHTML = "Temperatur: " + Math.round(data.list[num].main.temp) + "°C";
  feelsTime.innerHTML = "Gefühlt: " + Math.round(data.list[num].main.feels_like) + "°C";
  weatherTime.innerHTML = "Wetterlage: " + data.list[num].weather[0].description;
  humidTime.innerHTML = "Luftfeuchtigkeit: " + data.list[num].main.humidity + "%";
  windTime.innerHTML = "Windgeschwindigkeit: " + Math.round(data.list[num].wind.speed) + " km/h";
}
