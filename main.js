function initMap(){

  //map options
  var options = {
    zoom:10,
    center: {lat:40.7128,lng:-74.0060}
  }
  
  //new map
  var map = new
  google.maps.Map(document.getElementById('map'), options);

  //add marker
  var marker = new google.maps.Marker({
    position:{lat:40.6782,lng:-73.9422},
    map:map
  });

  var infoWindow = new google.maps.InfoWindow({
    content:`<h1>Brooklyn</h1>`
  });

  marker.addListener('click', function(){
    infoWindow.open(map, marker);
  });
}
