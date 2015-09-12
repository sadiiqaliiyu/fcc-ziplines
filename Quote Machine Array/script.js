/*jslint browser: true*/
/*global $, jQuery, alert, console*/



$(document).ready(function () {
  "use strict";
  
  var tweetQuote;
  
  var quotes = [
    'People who think they know everything are a great annoyance to those of us who do. - Isaac Asimov',
    'I believe that if life gives you lemons, you should make lemonade... And try to find somebody whose life has given them vodka, and have a party. - Ron White',
    'Get your facts first, then you can distort them as you please. - Mark Twain',
    'Procrastination is the art of keeping up with yesterday. - Don Marquis',
    'An idea isn\'t responsible for the people who believe in it. - Don Marquis',
    'Roses are red, violets are blue, I\'m schizophrenic, and so am I. - Oscar Levant',
    'A day without sunshine is like, you know, night. - Steve Martin',
    'The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it. - Terry Pratchett',
    'Behind every great man is a woman rolling her eyes. - Jim Carrey',
    'It takes considerable knowledge just to realize the extent of your own ignorance. - Thomas Sowell',
    'If two wrongs don\'t make a right, try three. - Laurence J. Peter',
    'I\'m sorry, if you were right, I\'d agree with you. - Robin Williams',
    'Smoking kills. If you\'re killed, you\'ve lost a very important part of your life. - Brooke Shields',
    'Well, if I called the wrong number, why did you answer the phone? - James Thurber',
    'Weather forecast for tonight: dark. - George Carlin',
    'Alex is the best. - Pascal, George, Elizabeth, Ronald'
  ];
  
  function randomize() {
    var rand = Math.floor(Math.random() * quotes.length);
    tweetQuote = encodeURIComponent(quotes[rand]);
    $("#tweet").attr("href", 'https://twitter.com/intent/tweet?text="' + tweetQuote + '"');
    
    $("#quote").fadeOut(150, function () {
      $(this).text(quotes[rand]);
    }).fadeIn(150);

    return rand;
  }
  
  $('#generator').click(function () {
    var rand = randomize();
    //console.log($(".twitter-share-button").attr("data-text"));
  });

});

// $('#quote').empty().append(quotes[rand]);