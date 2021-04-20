import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

  let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(request.response);
      }
    }
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function(response) {
    const body = JSON.parse(response);
      $('.showHumidity').html(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').html(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.showWind').html(`The wind speed is currently ${body.wind.speed}`);
      $('.showConditions').html(`The current conditions of your city are ${body.weather[0].main}`);
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showHumidity').text("");
      $('.showTemp').text("");
    });
  });
});