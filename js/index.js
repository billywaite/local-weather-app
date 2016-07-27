$('#hidden').hide();
$(document).ready(function() {
  /***************
  geolocation
  ****************/
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      /************
       API Call
       ************/
      $.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=bfe93416f842707c2c2d2b577b66ab8b&units=metric', function(json) {
        /****************
         Assign data to HTML
         *****************/
        //Temperature
        var celsius = Math.round(json.main.temp) + '\u00B0' + 'C';
        var fahrenheit = Math.round((json.main.temp) * 9 / 5 + 32) + '\u00B0' + 'F';
        $('.weatherCel').html(celsius);
        $('.weatherCel').click(function() {
          $('.weatherCel').hide();
          $('.weatherFah').html(fahrenheit).show();
        });
        $('.weatherFah').click(function() {
          $('.weatherFah').hide();
          $('.weatherCel').html(celsius).show();
        });
        //End Temperature
        $(".weatherLocation").html(json.name)
        $(".weatherType").html(json.weather[0].main)
        var icon = json.weather[0].icon;
        $('.weatherIcon').append("<img src='http://openweathermap.org/img/w/" + icon + ".png'>")
      });
    });
  }
});