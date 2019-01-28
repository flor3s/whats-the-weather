function initMap(){
  var options = {
    zoom:8,
    center: {lat:40.7128,lng:74.0060}
  }

  var map = new
  google.maps.Map(document.getElementById('map'), options);
}
