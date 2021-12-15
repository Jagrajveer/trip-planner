// required APIs
const MAP_BOX_API_KEY =
  "pk.eyJ1IjoiamFncmFqdmVlciIsImEiOiJja3g2cjloMHYwNHl0MnVxaDNzaXRkMjBtIn0.VL61ZYVBTwsO1oi1bePEew";

// required URLs
const map_box_base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places";

// elements
const OriginFormElement = document.querySelector(".origin-form");
const OriginInputElement = document.querySelector(".origin-form input");
const DestinationFormElement = document.querySelector(".destination-form");
const DestinationInputElement = document.querySelector(
  ".destination-form input"
);

// using getCurrentPosition get user's coordinates and pass it to the getPlaces
const getOriginPlacesList = (e) => {
  e.preventDefault();
  if (OriginInputElement.value !== "") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          getPlaces(latitude, longitude, OriginInputElement.value).then(
            (data) => console.log(data)
          );
        }
      );
    } else {
      document.getElementsByTagName("body")[0].innerHTML =
        "Geolocation is not supported in this browser.";
    }
  }
};

// using getCurrentPosition get user's coordinates and pass it to the getPlaces
const getDestinationPlacesList = (e) => {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        getPlaces(latitude, longitude, DestinationInputElement.value).then(
          (data) => console.log(data)
        );
      }
    );
  } else {
    document.getElementsByTagName("body")[0].innerHTML =
      "Geolocation is not supported in this browser.";
  }
};

// this function uses mapbox api to get list of places using the given keywords
const getPlaces = async (latitude, longitude, place) => {
  const url = `${map_box_base_url}/${place}.json?bbox=-97.32972, 49.762789, -96.951241, 49.994007&proximity=${longitude}, ${latitude}&access_token=${MAP_BOX_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

OriginFormElement.addEventListener("submit", getOriginPlacesList);
DestinationFormElement.addEventListener("submit", getDestinationPlacesList);
