$(document).ready(function(){

const userHistoryArr = localStorage.getItem("locations") ? JSON.parse(localStorage.getItem("locations")) : []

console.log(userHistoryArr);

var locationBtn = $(".location");
var buttonStyle = "btn btn-primary m-1 rounded-pill location";
var searchBtn = $(".search");
var currentDate = $("#currentDate");
var currentTime = $("#currentTime");
var suggestions = $("#suggestions");


window.setInterval(function () {
    currentDate.html(moment().format("dddd, D MMMM YYYY"))
     currentTime.html(moment().format("h:mm a"))
}, 1000);



locationBtn.on("click", function() {
    let location = $(this).val();
  alert("button clicked" + location)})


  searchBtn.on("click", function(event) {
  event.preventDefault()
  var searchedLocation = $("#search").val().trim().toUpperCase();
  createLocation(searchedLocation)
  //localStorage.setItem(searchedLocation,searchedLocation);
  //alert("search location is " + searchedLocation);
  $("#search").val('');
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
    userHistoryArr.push(searchedLocation)
    localStorage.setItem("locations", JSON.stringify(userHistoryArr))
    location.reload()


}

//var newBtn = $("<button>").addClass(buttonStyle)
//  newBtn.attr("value",searchedLocation);
 // newBtn.text((localStorage.getItem("searchedLocation")))
 // suggestions.prepend(newBtn);


displayHistory()
  })