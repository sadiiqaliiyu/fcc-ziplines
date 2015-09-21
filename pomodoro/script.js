/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  "use strict";
  
  var $mainButton = $('#mainButton'),
    $filler = $('#filler'),
    $timerText = $('#battery div'),
    $totalWork = $('div #totalWork'),
    $totalBreak = $('div #totalBreak'),
    buttonValue = true,
    timerInterval,
    batteryMax = 3600,
    batteryMid = batteryMax / 2,
    batteryLow = batteryMax / 8,
    chargeTimer = 0,
    minuteCounter = 0,
    minuteStorage = 0,
    breakCounter = 0,
    breakStorage = 0,
    batteryPercentage = (batteryMax / 100),
    timerPercentage;
  
  // Handles the timer counting up and down, plus converting to percentage.
  function countUpDown() {
    if (buttonValue === false) {
      chargeTimer += 1;
      
      // Resets every 60 seconds and stores +1 into a variable.
      // Also prints to the screen.
      minuteCounter += 1;
      if (minuteCounter === 60) {
        minuteStorage += 1;
        $totalWork.html(minuteStorage);
        minuteCounter = 0;
      }
    } else {
      chargeTimer -= 3;
      
      // Resets every 60 seconds and stores +1 into a variable.
      // Also prints to the screen.
      breakCounter += 1;
      if (breakCounter === 2) {
        breakStorage += 1;
        $totalBreak.html(breakStorage);
        breakCounter = 0;
      }
    }
    $filler.css('transform', 'scaleY(' + chargeTimer / batteryMax + ')');
    timerPercentage = (chargeTimer / batteryPercentage).toFixed(1);
    $timerText.html(timerPercentage + '%');
  }
  
  /*
  // Resets the battery charge and changes button to Charge mode.
  $('#resetButton').click(function () {
    clearInterval(timerInterval);
    chargeTimer = 0;
    $filler.css('transform', 'scaleY(0)');
    $timerText.html('0.0%');
    buttonValue = true;
    $mainButton.removeClass('btn-danger').addClass('btn-primary').text('Start Working');
  });
  */
  
  // Changes the charge color (red, orange, green)
  function colorAdjuster() {
    if (chargeTimer < batteryLow) {
      $filler.css('background-color', '#cc1800');
    } else if (chargeTimer < batteryMid) {
      $filler.css('background-color', '#d18b00');
    } else {
      $filler.css('background-color', '#58b036');
    }
  }
  
  
  // This function reverses the battery fill and
  // Changes the button color/text.
  function buttonSwitch() {
    
    clearInterval(timerInterval);
    switch (buttonValue) {
    
    // If buttonValue is True.
    case true:
      buttonValue = false;
      $mainButton.removeClass('btn-primary').addClass('btn-danger').text('Take a Break');
      
      // Start new interval
      timerInterval = setInterval(function () {
        if (chargeTimer < batteryMax) {
          countUpDown();
        } else if (chargeTimer >= batteryMax) {
          clearInterval(timerInterval);
        }
        colorAdjuster();
      }, 1000);
        
      break;
      
    // If buttonValue is False.
    case false:
      buttonValue = true;
      $mainButton.removeClass('btn-danger').addClass('btn-primary').text('Start Working');
      
      // Start new interval
      timerInterval = setInterval(function () {
        if (chargeTimer >= 3) {
          countUpDown();
        } else if (chargeTimer < 3) {
          // Resets chargeTimer value battery fill.
          // It also stops the timer and changes display text.
          chargeTimer = 0;
          $timerText.html('0.0%');
          $filler.css('transform', 'scaleY(0)');
          clearInterval(timerInterval);
        }
        colorAdjuster();
      }, 1000);
        
      break;
    }
  }
  
  // This is the main Work/Break button.
  $mainButton.click(function () {
    buttonSwitch();
  });
});