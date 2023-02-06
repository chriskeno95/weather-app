$(document).ready(function(){

var locationBtn = $(".location");
var buttonStyle = "btn btn-primary m-1 rounded-pill location";
var searchBtn = $(".search");
var currentDate = $("#currentDate");
var currentTime = $("#currentTime");


window.setInterval(function () {
    currentDate.html(moment().format("dddd, D MMMM YYYY"))
     currentTime.html(moment().format("h:mm a"))
}, 1000);



locationBtn.on("click", function() {
    let location = $(this).val();
  alert("button clicked" + location)})


  searchBtn.on("click", function() {
  var searchedLocation = $("#search").val().trim();
  localStorage.setItem(searchedLocation,searchedLocation);

  alert("search location is" + searchedLocation);

  //let newSuggestion = searchLocation;
  //$("button").
})

  })