$(document).ready(function(){
    $(".re-search").addClass("hide")

const APIKey = "b126ab1310c05c69b64388237ff59e49"
var city;
var openWeatherMapImgURL = "https://openweathermap.org/img/w/"
var weatherAPIURL = "https://api.openweathermap.org"
//var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=";
//console.log(city);
const userHistoryArr = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : []

//console.log(userHistoryArr);

var locationBtn = $(".location");
var searchBtn = $(".search");
var currentDate = $("#currentDate");
var currentTime = $("#currentTime");
var suggestions = $("#suggestions");
var userSearch = $("#search").val().trim().toUpperCase()
var list = $(".data-Values");
var forecast = $(".forecast");


window.setInterval(function () {
    currentDate.html(moment().format("dddd, D MMMM "))
    currentTime.html(moment().format("h:mm a"))
    }, 1000);

function callWeatherReport(city, weatherData){
    let tempC = Math.round((weatherData["main"]["temp"]-32)*.5556);
    let windSpeed = Math.round(weatherData["wind"]["speed"]/1.609);
    let humidity = weatherData["main"]["humidity"];

    console.log(tempC, windSpeed, humidity);
    //let card = $("<div>");
    //let cardBody = $("<div>");
   // let heading = $("<h2>");
    
    let tempEl = $("<li>").addClass("list-group-item p-1 m-2 display-4 text-center list-item border-0 ");
    let windEL = $("<li>").addClass("list-group-item p-1 m-2 display-4 text-center list-item border-0");
    let humidityEL =$("<li>").addClass("list-group-item p-1 m-2 display-4 text-center list-item border-0 fw-bold");

    tempEl.html(`${tempC}C`);
    windEL.html(`${windSpeed}mph`)
    humidityEL.html(`${humidity}%`)

    let tempIcon = $("<img>").attr("src","./assets/images/temp.png").addClass("icon");
    let windIcon = $("<img>").attr("src","./assets/images/wind.png").addClass("icon");
    let humidityIcon = $("<img>").attr("src","./assets/images/humidity.png").addClass("icon");
    tempEl.prepend(tempIcon);
    windEL.prepend(windIcon)
    humidityEL.prepend(humidityIcon)
    //card.attr("class", "card");
    //cardBody.attr("class", "card-body");
    //card.append(cardBody)
    list.append(tempEl, windEL, humidityEL);

}
function callForecastWeather(weatherData){
    let titleCol = $("<div>");
    let heading =$("<h4>");

    titleCol.attr("class","col-12")
    heading.text("");
    titleCol.append(heading)

    forecast.html("")

    forecast.append(titleCol);
    console.log(weatherData)

    let futureForecast = weatherData.filter(function(forecast){
        return forecast.dt_txt.includes("12")

    })
   console.log(futureForecast)
    for(let i = 0; i < 5; i++){

        let iconURL = openWeatherMapImgURL + futureForecast[i].weather[0].icon + ".png";
        console.log(iconURL)

    let iconDescription = futureForecast[i].weather[0].description;
    let tempC = Math.round((futureForecast[i].main.temp-32)*.5556);
    let humidity = futureForecast[i].main.humidity;
    let windSpeed = Math.round(futureForecast[i].wind.speed/1.609);

    let col = $("<div>");
    let card = $("<div>");
    let cardBody = $("<div>");
    let cardTitle = $("<h5>");
    let weatherIcon = $("<img>")
    let tempEL = $("<p>");
    let windEL = $("<p>");
    let humidityEL = $("<p>");

    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEL, windEL, humidityEL);

    col.attr("class", "col-md-2 mb-3 mb-sm-0");
    card.attr("class", "card bg-primary text-white card-body h-100 text-center");
    cardTitle.attr("class", "card-title bg-white text-primary text-center title");
    tempEL.attr("class", "card-text");
    windEL.attr("class", "card-text");
    humidityEL.attr("class", "card-text");

    cardTitle.text(moment(futureForecast[i].dt_txt).format("ddd, D MMM "))
    weatherIcon.attr("src", iconURL);
    weatherIcon.attr("alt",iconDescription);
    tempEL.text(`temp: ${tempC}C`);
    windEL.text(`wind speed:${windSpeed}mph`);
    humidityEL.text(`humidity: ${humidity}%`);

    forecast.append(col);
    console.log(col)
    }


}


function fetchWeather(location){
        console.log(location);
    let latitude = location.lat;
    let longitude = location.lon;
    let country = location.country;
    let searchedCity = location.name;
    var newTitle = $("<h1>").addClass("text-center newTitle");

    $(".timeAndDate").addClass("hide");
    $(".search-bar").addClass("hide");
    $(".search-bar").addClass("hide");
    $(".timeAndDate").addClass("hide");
    $("#suggestions").addClass("hide");

    if (location.name === "Londonderry/Derry"){
        let searchedCity = "DERRY";
        newTitle.html(searchedCity + "," + country)
        } else {
        newTitle.html(searchedCity + ", " + country)
        var newTime = $("<h2>").addClass("text-center")

        window.setInterval(function () {
        newTime.html(moment().format("dddd, D MMMM h:mm a"))
        }, 1000);
    }
        $(".searchedData").append(newTime);
        $(".searchedData").prepend(newTitle)

        console.log(searchedCity);

        let weatherQueryURL = `${weatherAPIURL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=imperial`;
        console.log(weatherQueryURL);

        $.ajax({
            url: weatherQueryURL,
            method: "GET"
        }).then(function(response){
            console.log(response.list[0])
            callWeatherReport(city,response.list[0]);
        callForecastWeather(response.list);
        })

    }

function getCoordinates(city){
    let coordinatesURL = `${weatherAPIURL}/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;
    //console.log(coordinatesURL);

    $.ajax({
    url: coordinatesURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
        if(!response[0]){
        alert("location not found")
        } else {
        fetchWeather(response[0])
        console.log(response);
        //var results = response.data
        //console.log(results)
        }
      
  })
}


//function displayLocationWeather(city){
   //let queryURL = weatherAPIURL + "/data/2.5/weather?q="

   // $.ajax({
  // url: queryURL + city + "&appid=" + //APIKey,
  //  method: "GET"
  //})
    // After data comes back from the request
  //.then(function(response) {
  // console.log(response);
  //   var results = response.data
  //    console.log(results)
 //})
 //   console.log(city)
//}

function clickSearchHistory(event) {
    if(!$(event.target).hasClass("location")){
        return
    }
    let location = $(event.target).attr("value");
    //alert("button clicked " + location)

    getCoordinates(location);
    $(".re-search").removeClass("hide");
   
}

suggestions.on("click",clickSearchHistory)


  searchBtn.on("click", function(event) {
    event.preventDefault()
    var searchedLocation = $("#search").val().trim().toUpperCase() || "";

    if(searchedLocation === "" || searchedLocation === "LONDONDERRY" || searchedLocation === "LONDONDERRY/DERRY" || searchedLocation === "DERRY/LONDONDERRY" || searchedLocation === "DERRY LONDONDERRY" || searchedLocation === "LONDONDERRY DERRY"){
        alert("please enter a city")
        return
    } 

    if (searchedLocation != ""){
        city = searchedLocation
        //console.log(city) 
        getCoordinates(city)
        //displayLocationWeather(city)
    }

    createLocation(searchedLocation)
    $("#search").val('');
    console.log(city)
    $(".re-search").removeClass("hide");
    
    return city
    })

function displayHistory(){
    let locations = "";
    for(let i = 0; i < userHistoryArr.length; i++) 
    //var newBtn = $("<button>").addClass(buttonStyle);
    locations += `<button class="btn btn-primary m-1 rounded-pill location" value="${userHistoryArr[i]}" type="submit">${userHistoryArr[i]}</button>`
   // newBtn.text(userHistoryArr[i]);
   suggestions.prepend(locations);
}

function createLocation(searchedLocation){
    if(userHistoryArr.indexOf(searchedLocation) !== -1){
        return;
    }
    userHistoryArr.push(searchedLocation)
    localStorage.setItem("locations", JSON.stringify(userHistoryArr))
    //location.reload()
}


$(".refresh").on("click",function(){
location.reload()
})
$(".re-search").on("click",function(){
location.reload()
})








//var newBtn = $("<button>").addClass(buttonStyle)
//  newBtn.attr("value",searchedLocation);
 // newBtn.text((localStorage.getItem("searchedLocation")))
 // suggestions.prepend(newBtn);


displayHistory()
  })