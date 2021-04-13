var apiKey = "d43ac1f55c002c78fde32d40ed83cebe"
var searchBtn = $("#search-button");
var clearBtn = $("#clearHistoryBtn");

// store the value of the input
var currentCity = "";
var lastCity = "";

// right content - searched city current weather
var cityName = $(".city-name")
var cityCurrentDate = $(".current-date");
var weatherIcon = $(".weather-icon");
var tempCEl = $(".tempC");
var humidityEl = $(".humidity");
var windSpeedEl = $(".wind");
var uvIndexEl = $(".uv-index");


searchBtn.click(function(event) {
    event.preventDefault()

    var searchCity = $('.search-input').val();
    var apiKey = 'd43ac1f55c002c78fde32d40ed83cebe';

    // received help for below 
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

        var cityDate = moment.tz(new Date(),forecastData.timezone).format('DD/MM/YY');

        console.log(cityDate)

        cityName.text(searchCity) 
        cityCurrentDate.text(` (${cityDate})`)
        tempCEl.text(`${forecastData.current.temp}\u00B0C`)
        humidityEl.text(forecastData.current.humidity)
        windSpeedEl.text(forecastData.current.wind_speed)
        uvIndexEl.text(forecastData.current.uvi)

        for (var i=0; i<5; i++) {
            // $(`#card-date-${i}`).text(new Date(forecastData.daily[i].dt))
            $(`#card-temp-${i}`).text(forecastData.daily[i].temp.day)
        }


        // Store searches into local storage 
        localStorage.setItem(searchCity, JSON.stringify(forecastData))
        $(`#city-history`).append(`<button id="${searchCity}">${searchCity}</button>`)
        
    };

    callDataInOrder();

})



clearBtn.on("click", function() {
    // clear all local storage
    localStorage.clear();

    // clear all description from page
    $(".search-history").val("");

})


//     
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


