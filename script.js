const apiKey = "5d5545c40211e88b661a0f3c28509eaa"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

/* Defining Variables */
const input = document.querySelector(".input__place");
const searchButton = document.querySelector(".search__btn");
const weatherImage = document.querySelector(".weather__img")
const weatherContainer = document.querySelector(".weather__container");


/* Fetching the url and showing the weather condition */
async function checkWeather(){
  if(input.value === ""){
    alert("Please type a place name")
  }else{
  const response = await fetch(apiUrl + input.value + `&appid=${apiKey}`);
  let data = await response.json();

  if(!response.ok){
    alert("Place not found")
    input.value = ""
  }

  console.log(data);

  /* Displaying the data in the inner HTML of the elements */
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".place").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      
  /* Displaying the image in the image container */
  if(data.weather[0].main === 'Clear'){
    weatherImage.src = "./img/clear.png"
  }else if(data.weather[0].main === 'Clouds'){
    weatherImage.src = "./img/clouds.png"
  }else if(data.weather[0].main === 'Drizzle'){
    weatherImage.src = "./img/drizzle.png"
  }else if(data.weather[0].main === 'Mist'){
    weatherImage.src = "./img/mist.png"
  }else if(data.weather[0].main === 'Rain'){
    weatherImage.src = "./img/rain.png"
  }else if(data.weather[0].main === 'Snow'){
    weatherImage.src = "./img/snow.png"
  }else{
    weatherImage.src = "./img/clear.png"
  }
  
  const windowWidth = window.innerWidth
  if(windowWidth <= 464){
    weatherContainer.style.height = "580px"
  }else if(windowWidth <= 505){
    weatherContainer.style.height = "550px"
  }
  else{
    weatherContainer.style.height = "500px"
  }

  }

  input.value = ""
}

/* Displaying the data when we click the search button */
searchButton.addEventListener("click", function(){
  checkWeather()
})

/* Displaying the data when we press Enter key */
input.addEventListener("keyup", function(event){
  if(event.key === "Enter"){
    checkWeather()
  }
})