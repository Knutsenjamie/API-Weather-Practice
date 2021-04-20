import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
  $('.showWind').text("");
  $('.showConditions').text("");
}

function getElements(response) {
  if (response.main) {
    $('.showHumidity').html(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').html(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    $('.showWind').html(`The wind speed is currently ${response.wind.speed}`);
    $('.showConditions').html(`The current conditions of your city are ${response.weather[0].main}`);
  } else {
    $('.showErrors').html(`There was an error processing your request: ${response.message}`);
  }
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
    .then(function(response) {
      getElements(response);
    });
  });
});