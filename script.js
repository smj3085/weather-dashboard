var cities = [];
var citySearchFormEl = document.querySelectorAll("#search-form");
var cityInputFormEl = document.querySelectorAll("#search-city");
var weatherContainer = document.querySelectorAll("#city-weather-container");
var citySearchInputEl = document.querySelectorAll("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var clearButtonEl = document.querySelectorAll("#clear-storage");



var getCityWeather = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};