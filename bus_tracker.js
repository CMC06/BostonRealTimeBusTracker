async function run(){
  // get bus data    
const locations = await getBusLocations();
console.log(new Date());
console.log(locations);

// let markers = [];

// for(let i = 0; i < locations.length; i++){
//   let currentMark = `marker${i}`;
//   markers.push({[currentMark]: locations[i]});
// }

// console.log(markers);
marker.setLngLat(locations[0]);


// timer
setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  const data = await json.data;
  let currentLocations = [];

  await data.forEach((item) => {
    currentLocations.push([item.attributes.longitude, item.attributes.latitude]);
  });
  return currentLocations;
}


// async function placeMarkers(currentLocations) {
//   currentLocations.forEach(() => {

//   });
// }

window.onload = (event) => {
  run();
};