/**
 * Variables
 */
const inputval = $("#cityinput");
const cityNameHTML = $("#cityName");
const weatherConditionHTML = $("#weatherCondition");
const temperationHTML = $("#temperation");
const windSpeedHTML = $("#windSpeed");
const successMessage = $(".bg-light-transparent");
const failureMessage = $(".alert-danger");
const apik = "3045dd712ffe6e702e3245525ac7fa38";

/**
 * Submit click event
 */
$("#add").on("click", function () {
  //http ajax call
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather",
    data: {
      q: inputval.val(),
      appid: apik,
    },
    method: "GET",
    dataType: "json",
    success: function (data) {
      const cityValue = data.name;
      const weatherConditionDescription = data.weather[0].description;
      const weatherCondition = data.weather[0].main;
      const tempatureValue = convertKelvinToCelsius(data.main.temp);
      const windSpeedValue = data.wind.speed;

      // appending json response to the html
      cityNameHTML.html(cityValue);
      weatherConditionHTML.html(
        `Sky Conditions: ${weatherConditionDescription}`
      );
      temperationHTML.html(`Temperature: ${tempatureValue} C`);
      windSpeedHTML.html(`Wind Speed: ${windSpeedValue} km/h`);

      // set background image
      setBackgroundImage(weatherCondition);

      // show the information and hide the error message
      successMessage.show();
      failureMessage.hide();
    },
    error: function (err) {
      // show the error message and hide the information
      successMessage.hide();
      failureMessage.show();
    },
  });
});

/**
 * function to convert kelvin to celsius
 */
function convertKelvinToCelsius(val) {
  return (val - 273.15).toFixed(2);
}

/**
 * function to change background image
 */
function setBackgroundImage(weatherCondition) {
  if (weatherCondition === "Rain") {
    $("body").css("background-image", "url(./images/rain.avif)");
  } else if (weatherCondition === "Snow") {
    $("body").css("background-image", "url('./images/snow.webp')");
  } else if (weatherCondition === "Clouds") {
    $("body").css("background-image", "url('./images/cloudy.jpeg')");
  } else if (
    weatherCondition === "Mist" ||
    weatherCondition === "Smoke" ||
    weatherCondition === "Haze"
  ) {
    $("body").css("background-image", "url('./images/mist.jpeg')");
  } else if (weatherCondition === "Clear") {
    $("body").css("background-image", "url('./images/clear.jpeg')");
  } else {
    $("body").css("background-image", "url('./images/default.avif')");
  }
}
