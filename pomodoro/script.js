/*jslint browser: true plusplus: true*/
/*global $, jQuery, alert, console*/

$(document).ready(function () {
  "use strict";
  
  var $mainButton = $('#mainButton'),
    $filler = $('#filler'),
    $timerText = $('#timerText'),
    $totalWork = $('div #totalWork'),
    $totalBreak = $('div #totalBreak'),
    $batteryWarning = $('#batteryWarning'),
    buttonValue = true,
    timerInterval,
    batteryMax = 3600,
    batteryMid = batteryMax / 2,
    batteryLow = batteryMax / 5,
    chargeTimer = 0,
    minuteCounter = 0,
    minuteStorage = 0,
    breakCounter = 0,
    breakStorage = 0,
    secondsDecreased = 4,
    batteryPercentage = (batteryMax / 100),
    timerPercentage,
    batterySound = false;
  
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
      if (breakCounter === 60) {
        breakStorage += 1;
        $totalBreak.html(breakStorage);
        breakCounter = 0;
      }
      
      if (chargeTimer < batteryLow && batterySound) {
        document.getElementById('lowBattery').play();
        batterySound = false;
      }
    }
    $filler.css('transform', 'scaleY(' + chargeTimer / batteryMax + ')');
    timerPercentage = (chargeTimer / batteryPercentage).toFixed(1);
    
    $timerText.html(timerPercentage + '%');
  }
  
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
        if (chargeTimer >= secondsDecreased) {
          countUpDown();
        } else if (chargeTimer < secondsDecreased) {
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
  
  function batteryUpdater(batteryMax) {
    batteryPercentage = (batteryMax / 100);
    batteryMid = batteryMax / 2;
    batteryLow = batteryMax / 5;
  }
  
  //Makes sure that the battery is calculating the percentage
  // anf fill color correctly after changing batteryMax value.
  function changeBatteryTime(value) {
    if (value && batteryMax > 600) {
      batteryMax -= 300;
      batteryUpdater(batteryMax);
    } else if (!value) {
      batteryMax += 300;
      batteryUpdater(batteryMax);
    }
    
    clearInterval(timerInterval);
    chargeTimer = 0;
    $filler.css('transform', 'scaleY(0)');
    $timerText.html('0.0%');
    $mainButton.removeClass('btn-danger').addClass('btn-primary').text('Start Working');
    buttonValue = true;
    $('#displayMinutes').html(batteryMax / 60);
    $('#displayBreak').html(Math.ceil((batteryMax / 60) / secondsDecreased));
  }
  
  $('#subtractMinutes').click(function () {
    changeBatteryTime(true);
  });
  
  $('#addMinutes').click(function () {
    changeBatteryTime(false);
  });
  
  // This is the main Work/Break button.
  $mainButton.click(function () {
    buttonSwitch();
    batterySound = true;
  });
});