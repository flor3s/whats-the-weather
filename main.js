function getMapWeather(e){
  e.preventDefault();

  function geocode(){
    var location = document.getElementById('location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params:{
        address:location,
        key: mapAPI
      }
    })
    .then(function(response){
      // log full response
      console.log(response);

      // send info to DarkSky and Maps
      var lat = response.data.results[0].geometry.location.lat;
      var long = response.data.results[0].geometry.location.lng;
      getWeather(lat, long);

      // // format address
      // var formattedAddress = response.data.results[0].formatted_address;
      // var formattedAddressOutput = `
      //   <ul class="list-group">
      //     <li class="list-group-item">${formattedAddress}</li>
      //   </ul>
      // `;

      // //output to app
      // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
    })
    .catch(function(error){
      console.log(error);
    });
  }

  function getWeather(lat, long) {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${weatherAPI}/${lat},${long}?exclude=minutely,daily,alerts,flags`)
    .then(function(response){
      console.log(response);

      // grab weather data
      var currentSummary = response.data.currently.summary;
      var dailySummary = response.data.hourly.summary;
      var realTemp = response.data.currently.temperature.toString();
      var feelsTemp = response.data.currently.apparentTemperature.toString();

      // format forecast
      var formattedForecastOutput = `
        <h2><strong>${realTemp}&#8457</strong></h2>
        <p>${currentSummary}. Feels like: ${feelsTemp}&#176. Next 24 Hours: ${dailySummary}</p>
      `

      // output to map
      initMap(lat, long, formattedForecastOutput);

    }).catch(function(error){
      console.log(error);
    });
  }

  function initMap(latitude, longitude, markerInfo){
    //map options
    var options = {
      zoom:9,
      center: {lat:latitude,lng:longitude}
    }
    
    //new map
    var map = new
    google.maps.Map(document.getElementById('map'), options);

    //add marker
    var marker = new google.maps.Marker({
      position:{lat:latitude,lng:longitude},
      map:map
    });

    //add info to marker
    var infoWindow = new google.maps.InfoWindow({
      content:`${markerInfo}`
    });

    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }

  geocode();
}

// get location form

var locationForm = document.getElementById('location-form');

//listen for submit

locationForm.addEventListener('submit', getMapWeather);