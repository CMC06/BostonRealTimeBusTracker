//array to hold generated map markers
let markArray = [];

//function to generate markers based on current bus coordinates
async function markers() {
  let locations = await getBusLocations();
  let i = 0;
  locations.forEach(() => {
    let markerEl = document.createElement("div");
    markerEl.id = `marker${i}`;
    markerEl.className = "marker";
    let markersDiv = document.getElementById("markers");
    markersDiv.appendChild(markerEl);
    
     let marker = new mapboxgl.Marker(markerEl)
        .setLngLat(locations[i])
        .addTo(map);
      
      markArray.push(marker);
      i++;
      console.log(markerEl);
  });
  
  console.log(markArray);

}
markers();

//Check to see if new buses have been added or buses have left route since first page load
function checkForNewBuses(locations) {
  if(markArray.length !== locations.length){
    location.reload;
    } else {
    return;
  }
}

//function moves markers to new long/lat coordinates
function moveMarkers(locations) {
  for(let i = 0; i < markArray.length; i++){
    markArray[i].setLngLat(locations[i]);
  }
  console.log(markArray);
}

async function run(){
  // get bus data    
  const locations = await getBusLocations();
  //console.log(new Date());
  //console.log(locations);
  checkForNewBuses(locations);
  
  //calls function that loops through locations and sets markers based on current bus locations
  moveMarkers(locations);
  
  //marker.setLngLat(locations[0]); //used when only tracking 1 bus

  // timer for marker animation, update/move ever 15 seconds
  setTimeout(run, 15000);
}



// Request bus data from MBTA
async function getBusLocations(){
  //url for fetch already filtered to only Route 1 buses in MBTA
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    //saving into new data variable to make it easier to manipulate as an array
    const data = await json.data;
    let currentLocations = [];
    //pulling location information long/lat to be able to set markers for bus animation
    await data.forEach((item) => {
      currentLocations.push([item.attributes.longitude, item.attributes.latitude]);
    });
    //returns array of current locations for buses on Route 1 in Boston
    return currentLocations;
}


window.onload = (event) => {
  run();
};