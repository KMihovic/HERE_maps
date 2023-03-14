
// Function to generate random number
function randomLat() {
  return Math.random() * (2.5) + 44;
}

function randomLng() {
  return Math.random() * (9.5) + 9.5;
}

function moveMapToRijeka(map){
  map.setCenter({lat:45.328081, lng:14.436539});
  map.setZoom(8);
}

function addMarkersToMap(map) {
    for (i = 0; i < 20; i++) {
      var planeMarker = new H.map.Marker({lat:randomLat(), lng:randomLng()}, { icon: pngIcon });
      map.addObject(planeMarker);
}}

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: 'whatewerIPutHereItWorks???'
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:50, lng:5},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Marker code goes here
var LocationOfMarker = { lat: 45.327980, lng: 14.476690 };

// Create a marker icon from an image URL:
var pngIcon = new H.map.Icon("https://cdn2.iconfinder.com/data/icons/business-development-6/24/Aircraft_transport_plane_transportation_airplane_travel-512.png", { size: { w: 40, h: 40 } });

// Create a marker using the previously instantiated icon:
var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });

// Add the marker to the map:
map.addObject(marker);


// Now use the map as required...
window.onload = function () {
  moveMapToRijeka(map);
  addMarkersToMap(map);
}
