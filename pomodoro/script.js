/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  "use strict";
  
  var $mainButton = $('#mainButton'),
    $span = $('span'),
    $fillDiv = $('#battery div'),
    buttonValue = true,
    timerInterval,
    batteryMax = 3600,
    chargeTimer = 0;
  
  function countUp() {
    chargeTimer += 1;
    $span.css('transform', 'scaleY(' + chargeTimer / batteryMax + ')');
    $fillDiv.html(chargeTimer);
  }
  
  function countDown() {
    chargeTimer -= 3;
    $span.css('transform', 'scaleY(' + chargeTimer / batteryMax + ')');
    $fillDiv.html(chargeTimer);
  }
  
  /*
  // Emergency stop
  $('#breakButton').click(function () {
    clearInterval(timerInterval);
    $('button').prop('disabled', false);
  });
  */
  
  
  // This function reverses the battery fill and
  // Changes the button color/text.
  function buttonSwitch() {
    
    clearInterval(timerInterval);
    switch (buttonValue) {
    
    // If buttonValue is True.
    case true:
      buttonValue = false;
      $mainButton.removeClass('btn-primary').addClass('btn-danger').text('Discharge');
      
      // Start new interval
      timerInterval = setInterval(function () {
        if (chargeTimer < batteryMax) {
          countUp();
        } else if (chargeTimer >= batteryMax) {
          clearInterval(timerInterval);
        }
      }, 1000);
        
      break;
      
    // If buttonValue is False.
    case false:
      buttonValue = true;
      $mainButton.removeClass('btn-danger').addClass('btn-primary').text('Charge');
        
      timerInterval = setInterval(function () {
        if (chargeTimer >= 3) {
          countDown();
        } else if (chargeTimer < 3) {
          clearInterval(timerInterval);
        }
      }, 1000);
        
      break;
    }
  }
  
  // This is the main Charge/Discharge button.
  $mainButton.click(function () {
    buttonSwitch();
  });
});