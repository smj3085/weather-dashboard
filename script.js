var apiKey = "d43ac1f55c002c78fde32d40ed83cebe"
var searchBtn = $("#search-button");
var clearBtn = $("#clearHistoryBtn");

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

    var searchCity = $('#search-input').val();
    var apiKey = 'd43ac1f55c002c78fde32d40ed83cebe';

    // received help with using async await
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

    const callForecastDataInOrder = async () => {
        const cityGeoCoords = await getCityGeoCoords();
        const forecastData = await getForecastData(cityGeoCoords);

        populateHtml(searchCity, forecastData);
        console.log(forecastData)

        // Store searches into local storage 
        localStorage.setItem(searchCity, JSON.stringify(forecastData))
        $(`#city-history`).append(`<button id="${searchCity}" class="btn btn-secondary btn-custom" onclick="onCityClick(event)">${searchCity}</button>`)
        
    };

    callForecastDataInOrder();
})

// Searched city main data 
function populateHtml(city, data) {
    var cityDate = moment.tz(new Date(), data.timezone).format('DD/MM/YY HH:MM');

    // var displayWeatherIcon = "http://openweathermap.org/img/wn/10d@2x.png"

    cityName.text(city) 
    cityCurrentDate.text(`(${cityDate})`)
    // weatherIcon.attr(displayWeatherIcon)
    tempCEl.text(`${data.current.temp}\u00B0C`)
    humidityEl.text(`${data.current.humidity}%`)
    windSpeedEl.text(`${data.current.wind_speed}MPH`)
    uvIndexEl.text(data.current.uvi)
    // // change UV functions
    var uvIndexRank  = data.current.uvi
        if(uvIndexRank<=2){
            uvIndexEl.addClass("favorable");
        }else if(uvIndexRank  >2 && uvIndexRank <=8){
            uvIndexEl.addClass("moderate");
        }
        else if(uvIndexRank  >8){
            uvIndexEl.addClass("severe");
        };

    // 5-day forecast data 
    for (var i=0; i<5; i++) {
      
        // $(`#card-date-${i}`).text(data.daily[i].dt)
        $(`#card-temp-${i}`).text(data.daily[i].temp.day)
        $(`#card-wind-${i}`).text(data.daily[i].wind_speed)
        $(`#card-humidity-${i}`).text(data.daily[i].humidity)
    }

function onCityClick(event) {
    var cityKey = event.srcElement.id;
    var storedCityData = localStorage.getItem(cityKey)
    populateHtml(cityKey, JSON.parse(storedCityData));
}

clearBtn.on("click", function() {
    // clear all local storage
    localStorage.clear();

    // clear all description from page
    function clearHistory() {
        var historyData = $(`#city-history`);
        historyData.remove();
    }

    clearHistory();
})}