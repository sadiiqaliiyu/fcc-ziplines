/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  "use strict";
  
  var $mainButton = $('#mainButton'),
    $span = $('span'),
    $fillDiv = $('#battery div'),
    buttonValue = true,
    timerInterval,
    chargeTimer = 0;
  
  function countUp() {
    chargeTimer += 1;
    $span.css('transform', 'scaleY(' + chargeTimer / 10 + ')');
    $fillDiv.html(chargeTimer);
  }
  
  function countDown() {
    chargeTimer -= 1;
    $span.css('transform', 'scaleY(' + chargeTimer / 10 + ')');
    $fillDiv.html(chargeTimer);
  }
  
  $('#breakButton').click(function () {
    clearInterval(timerInterval);
    $('button').prop('disabled', false);
  });
  
  function buttonTrue() {
    // Disable the button to prevent multiple intervals
    $mainButton.prop('disabled', true);
      
    // Start new interval
    timerInterval = setInterval(function () {
      if (chargeTimer < 10) {
        countUp();
      } else if (chargeTimer >= 10) {
        clearInterval(timerInterval);
        buttonValue = false;
        $mainButton.removeClass('btn-primary').addClass('btn-danger').text('Discharge');
        $mainButton.prop('disabled', false);
      }
    }, 1000);
  }
  
  function buttonFalse() {
    // Disable the button to prevent multiple intervals
    $mainButton.prop('disabled', true);
    
    // Start new interval
    timerInterval = setInterval(function () {
      if (chargeTimer > 0) {
        countDown();
      } else if (chargeTimer <= 0) {
        clearInterval(timerInterval);
        buttonValue = true;
        $mainButton.removeClass('btn-danger').addClass('btn-primary').text('Charge');
        $mainButton.prop('disabled', false);
      }
    }, 1000);
  }
  
  $mainButton.click(function () {
    if (buttonValue === true) {
      buttonTrue();
    } else {
      buttonFalse();
    }
  });
});