
// Radar function - only for button 'RANDER AIRPLANES'
 function radarFunction(){
 window.open("radar_1/radar.html", "_self");
 }

  function addCircle1ToMap(map){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat: 45.327980, lng: 14.476690},
      // The radius of the circle in meters
      130000,
      {
        style: {
          strokeColor: 'rgb(0,255,0)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(0, 0, 0, 0.8)'  // Color of the circle
        }
      }
    ));
  }

  function addCircle2ToMap(map){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat: 45.327980, lng: 14.476690},
      // The radius of the circle in meters
      90000,
      {
        style: {
          strokeColor: 'rgb(0,255,0)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(0, 128, 0, 0)'  // Color of the circle
        }
      }
    ));
  }

  function addCircle3ToMap(map){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat: 45.327980, lng: 14.476690},
      // The radius of the circle in meters
      50000,
      {
        style: {
          strokeColor: 'rgb(0,255,0)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgba(0, 255, 0, 0)'  // Color of the circle
        }
      }
    ));
  }

  function addDotToMap(map){
    map.addObject(new H.map.Circle(
      // The central point of the circle
      {lat: 45.347980, lng: 14.475},
      // The radius of the circle in meters
      3000,
      {
        style: {
          strokeColor: 'rgb(0,255,0)', // Color of the perimeter
          lineWidth: 2,
          fillColor: 'rgb(0,255,0)'  // Color of the circle
        }
      }
    ));
  }

  function addLine1ToMap(map) {
    var lineString = new H.geo.LineString();
  
    //lineString.pushPoint({lat:45.328081, lng:14.436539});
    lineString.pushPoint({lat:46.49, lng:14.469539});
    lineString.pushPoint({lat:44.166162, lng:14.469539});
  
    map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 2, strokeColor: "rgb(0,255,0)" }}
    ));
  }

  function addLine2ToMap(map) {
    var lineString = new H.geo.LineString();
  
    //lineString.pushPoint({lat:45.328081, lng:14.436539});
    lineString.pushPoint({lat:45.348081, lng:12.81});
    lineString.pushPoint({lat:45.348081, lng:16.145});
  
    map.addObject(new H.map.Polyline(
      lineString, { style: { lineWidth: 2, strokeColor: "rgb(0,255,0)" }}
    ));
  }

  function rotateDomMarker() {
    var domIconElement = document.createElement('div'), //(KM) - "div" because = Anchor parameters only works for "H.map.Icon". Use CSS styles to center an "H.map.DomIcon".
        //(KM) interval,
        counter = 0;
  
    // set the anchor using margin css property depending on the content's (svg element below) size
    // to make sure that the icon's center represents the marker's geo positon
    domIconElement.style.margin = '0px 0 0 0px';
  
    // add content to the element
    domIconElement.innerHTML = `<svg height="430" width="430">
    <line x1="0" y1="0" x2="210" y2="210" style="stroke: rgb(0,255,0);stroke-width:5" />
    </svg>`;
  
    // create dom marker and add it to the map
    marker = map.addObject(new H.map.DomMarker({lat:46.165, lng:13.3}, {
      icon: new H.map.DomIcon(domIconElement, {
        onAttach: function(clonedElement, domIcon, domMarker) {
          var clonedContent = clonedElement.getElementsByTagName('svg')[0];
  
          // set last used value for rotation when dom icon is attached (back in map's viewport)
          //(KM) clonedContent.style.transform = 'rotate(' + counter + 'deg)';
  
          // set interval to rotate icon's content by XX degrees every X second.
          interval = setInterval(function() {
            clonedContent.style.transform = 'rotate(' + (counter += 10) + 'deg)';
          }, 50)
        },

        //(KM) onDetach: function(clonedElement, domIcon, domMarker) {
          // stop the rotation if dom icon is not in map's viewport
          //(KM) clearInterval(interval);}
      })
    }));
  }

  
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
  addCircle1ToMap(map);
  addCircle2ToMap(map);
  addCircle3ToMap(map);
  addLine1ToMap(map);
  addLine2ToMap(map);
  addDotToMap(map);
  rotateDomMarker(map);
}
