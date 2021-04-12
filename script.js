var apiKey = "d43ac1f55c002c78fde32d40ed83cebe"
var searchBtn = $("#search-button");
var clearBtn = $("#clear-button");

// store the value of the input
var currentCity = "";
var lastCity = "";

// right content - searched city current weather
var cityName = $(".city-name")
var currentDate = $(".current-date");
var weatherIcon = $(".weather-icon");
var tempCEl = $(".tempC");
var humidityEl = $(".humidity");
var windEl = $(".wind");
var uvIndexEl = $(".uv-index");

searchBtn.click(function(event) {
    event.preventDefault()

    const searchCity = $('#search-city').val();
    const apiKey = 'd43ac1f55c002c78fde32d40ed83cebe';

    const getCityGeoCoords = async () => {
    const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`);
    const data = await request.json();
    return data.coord;
    };

    const getForecastData = async coords => {
    const request = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`);
    const data = await request.json();
    return data;
    };

    const callDataInOrder = async () => {
    const cityGeoCoords = await getCityGeoCoords();
    const forecastData = await getForecastData(cityGeoCoords);
    console.log(forecastData)
};

    callDataInOrder();

    
//     .then(response => response.json())
//         .then(data => {
//     let currentWeatherHTML = `
//     <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
//     <ul class="list-unstyled">
//         <li>Temperature: ${response.current.temp}&#8457;</li>
//         <li>Humidity: ${response.current.humidity}%</li>
//         <li>Wind Speed: ${response.current.wind_speed} mph</li>
//         <li>UV Index: ${response.current.uvi} </li>
//     </ul>`;
// // Append the results to the DOM
// $('#current-weather').html(currentWeatherHTML);


})