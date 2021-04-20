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

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    let promise = WeatherService.getWeather(city);
    promise.then(function(response) {
    const body = JSON.parse(response);
      $('.showHumidity').html(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').html(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.showWind').html(`The wind speed is currently ${body.wind.speed}`);
      $('.showConditions').html(`The current conditions of your city are ${body.weather[0].main}`);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});