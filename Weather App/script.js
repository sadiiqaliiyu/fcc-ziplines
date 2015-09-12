/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  "use strict";
  var jqXHR,
    geoData,
    cTemp,
    fTemp,
    $weatherIcon = $('#weatherIcon'),
    $temp = $('#temp'),
    $switch = $('#switch'),
    $city = $('#city'),
    $weather = $('#weather'),
    $wind = $('#wind'),
    $humidity = $('#humidity'),
    toggleTemp = false,
    windChart = {
      N: 11.25,
      NNE: 33.75,
      NE: 56.25,
      ENE: 78.75,
      E: 101.25,
      ESE: 123.75,
      SE: 146.25,
      SSE: 168.75,
      S: 191.25,
      SSW: 213.75,
      SW: 236.25,
      WSW: 258.75,
      W: 281.25,
      WNW: 303.75,
      NW: 326.25,
      NNW: 348.75
    },
    deg = 22.5,
    windDirection,
    bgImage;
  
  // Calculate and store metric/imperial temperatures
  function tempCalc(temp) {
    cTemp = temp;
    fTemp = (32 + (cTemp * 1.8)).toFixed(2);
    $temp.text(cTemp + "°C");
  }
  
  function degreeCalc(degree) {
    var current = 0,
      key;
    for (key in windChart) {
      // Gets the nearest value from the windChart object's numbers, then adds on 22.5 degrees.
      // In order to bump the result up to the correct object key.
      if (Math.abs(degree - windChart[key]) < Math.abs(degree - (current - deg))) {
        windDirection = key;
      }
    }
  }
  
  // Adds the weather icon and corresponding background.
  function iconPicker(iconData) {
    $weatherIcon.html('<img src="img/' + iconData + '.png" alt="Weather Icon">');
    
    // Turns the icon name into the background image name by deleting the last letter.
    bgImage = iconData.slice(0, -1);
    $('body').css('background-image', 'url(img/' + bgImage + '.jpg)');
  }
  
  function weatherOutput(weatherData) {
    // Outputs the correct weather icon and website
    // background depending on the icon string.
    iconPicker(weatherData.weather[0].icon);
    
    $city.text(weatherData.name);
    
    // Outputs the temperature and stores it locally
    tempCalc(weatherData.main.temp);
    
    $weather.text(weatherData.weather[0].description);
    
    // Calculates which text to output depending on the direction of the wind.
    degreeCalc(weatherData.wind.deg);
    
    $wind.text(weatherData.wind.speed + " " + windDirection);
    $humidity.text(weatherData.main.humidity + "%");
  }
  
  // Get the IP Data.
  jqXHR = $.getJSON("http://ip-api.com/json/?fields=countryCode,city,status,message", function (ipData) {
    geoData = ipData;
    console.log(geoData);
  })
    // IP Data request complete.
    .done(function (ipData) {
      var info;
      for (info in ipData) {
        console.log("Request success!");
        $('#data').append('<p>' + ipData[info] + '</p>');
      }
      
      // Get weather data using collected IP data.
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + geoData.city + "," + geoData.countryCode + "&units=metric", function (weatherData) {
        console.log(weatherData);
      })
        // Weather data request complete.
        .done(function (weatherData) {
          console.log("Weather Request success!");

          weatherOutput(weatherData);
          
        })
        // Weather data request failed.
        .fail(function (jqXHR, statusText, errorThrown) {
          console.log('getJSON weather request failed! ' + statusText);
        })
        // Weather data request is finished.
        .always(function () {
          console.log('getJSON weather request ended!');
        });
    })
    // IP Data request failed.
    .fail(function (jqXHR, statusText, errorThrown) {
      console.log('getJSON IP request failed! ' + statusText);
      $('#adblockWarning').html("<strong>Failed to get location</strong><br/>Make sure you disable any AdBlock to use this site.");
    })
    // IP data request is finished.
    .always(function () {
      console.log('getJSON IP request ended!');
    });
  
  // Button activated switch for Celcius and Farenheit.
  // Does not work if Celcius was not returned by the API.
  $switch.click(function () {
    if (cTemp !== undefined) {
      if (toggleTemp === false) {
        $switch.text("To Celcius");
        $temp.text(fTemp + "°F");
        toggleTemp = true;
      } else {
        $temp.text(cTemp + "°C");
        $switch.text("To Fahrenheit");
        toggleTemp = false;
      }
    }
  });
});