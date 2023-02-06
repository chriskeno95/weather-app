$(document).ready(function(){

const APIKey = "b126ab1310c05c69b64388237ff59e49"
var city;
var weatherAPIURL = "http://api.openweathermap.org"
//var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=";
//console.log(city);
const userHistoryArr = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : []

console.log(userHistoryArr);

var locationBtn = $(".location");
var searchBtn = $(".search");
var currentDate = $("#currentDate");
var currentTime = $("#currentTime");
var suggestions = $("#suggestions");
var userSearch = $("#search").val().trim().toUpperCase()


window.setInterval(function () {
    currentDate.html(moment().format("dddd, D MMMM YYYY"))
     currentTime.html(moment().format("h:mm a"))
}, 1000);


function fetchWeather(location){
    console.log(location);
    let latitude = location.lat;
    let longitude = location.lon;
    console.log(latitude)
    console.log(longitude)

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
        }
      //console.log(response);
      //var results = response.data
      //console.log(results)
  })
}


function displayLocationWeather(city){
    let queryURL = weatherAPIURL + "/data/2.5/weather?q="

    $.ajax({
    url: queryURL + city + "&appid=" + APIKey,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(response);
      //var results = response.data
      //console.log(results)
  })
   // console.log(city)
}

locationBtn.on("click", function() {
    let location = $(this).val();
  alert("button clicked " + location)})


  searchBtn.on("click", function(event) {
  event.preventDefault()
  var searchedLocation = $("#search").val().trim().toUpperCase() || "";

  if(searchedLocation === ""){
    alert("please enter a city")
    return
  }

  if(searchedLocation != ""){
    city = searchedLocation
console.log(city) 

displayLocationWeather(city)
getCoordinates(city)
}



  createLocation(searchedLocation)
  $("#search").val('');
  return city
})

function displayHistory(){
    let locations = "";
    for(let i = 0; i < userHistoryArr.length; i++) 
    //var newBtn = $("<button>").addClass(buttonStyle);
    locations += `<button class="btn btn-primary m-1 rounded-pill location" "value="${userHistoryArr[i]}" type="submit">${userHistoryArr[i]}</button>`
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











//var newBtn = $("<button>").addClass(buttonStyle)
//  newBtn.attr("value",searchedLocation);
 // newBtn.text((localStorage.getItem("searchedLocation")))
 // suggestions.prepend(newBtn);


displayHistory()
  })