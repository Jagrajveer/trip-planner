// required APIs
const MAP_BOX_API_KEY =
  "pk.eyJ1IjoiamFncmFqdmVlciIsImEiOiJja3g2cjloMHYwNHl0MnVxaDNzaXRkMjBtIn0.VL61ZYVBTwsO1oi1bePEew";
const WINNIPEG_TRANSIT_API_KEY = "lvRB12_s_evFu-qErjR2";

// required URLs
const map_box_base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const winnipeg_transit_base_url =
  "https://api.winnipegtransit.com/v3/trip-planner.json";

// elements
const OriginFormElement = document.querySelector(".origin-form");
const OriginInputElement = document.querySelector(".origin-form input");
const OriginListElement = document.querySelector(".origins");

const DestinationFormElement = document.querySelector(".destination-form");
const DestinationInputElement = document.querySelector(
  ".destination-form input"
);
const DestinationListElement = document.querySelector(".destinations");

const PlanMyTripButton = document.querySelector(".plan-trip");

const route = {
  origin: "",
  destination: "",
};

// using getCurrentPosition get user's coordinates and pass it to the getPlaces to get list of origin places
const getOriginPlacesList = (e) => {
  e.preventDefault();
  if (OriginInputElement.value !== "") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          getPlaces(latitude, longitude, OriginInputElement.value).then(
            (data) => renderOriginPlacesList(data)
          );
        }
      );
    } else {
      document.getElementsByTagName("body")[0].innerHTML =
        "Geolocation is not supported in this browser.";
    }
  }
};

// using getCurrentPosition get user's coordinates and pass it to the getPlaces to get list of destination places
const getDestinationPlacesList = (e) => {
  e.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        getPlaces(latitude, longitude, DestinationInputElement.value).then(
          (data) => renderDestinationPlacesList(data)
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

// function to display origin places list
const renderOriginPlacesList = ({ features }) => {
  OriginListElement.innerHTML = "";

  features.map((feature) => {
    const { center, place_name } = feature;
    OriginListElement.insertAdjacentHTML(
      "beforeend",
      `
      <li data-long="${center[0]}" data-lat="${center[1]}">
      <div class="name">${place_name.split(",")[0]}</div>
      <div>${place_name.split(",")[1]}</div>
    </li>
      `
    );
  });
};

// function to display destination places list
const renderDestinationPlacesList = ({ features }) => {
  DestinationListElement.innerHTML = "";

  features.map((feature) => {
    const { center, place_name } = feature;
    DestinationListElement.insertAdjacentHTML(
      "beforeend",
      `
      <li data-long="${center[0]}" data-lat="${center[1]}">
      <div class="name">${place_name.split(",")[0]}</div>
      <div>${place_name.split(",")[1]}</div>
    </li>
      `
    );
  });
};

OriginListElement.addEventListener("click", (e) => {
  for (let child of OriginListElement.children) {
    child.classList.remove("selected");
  }

  if (e.target.localName === "li") {
    e.target.classList.add("selected");
    route.origin = e.target.dataset;
  } else if (e.target.localName === "div") {
    e.target.parentElement.classList.add("selected");
    route.origin = e.target.parentElement.dataset;
  }
});

DestinationListElement.addEventListener("click", (e) => {
  for (let child of DestinationListElement.children) {
    child.classList.remove("selected");
  }

  if (e.target.localName === "li") {
    e.target.classList.add("selected");
    route.destination = e.target.dataset;
  } else if (e.target.localName === "div") {
    e.target.parentElement.classList.add("selected");
    route.destination = e.target.parentElement.dataset;
  }
});

// function to get the route from origin to destination provided by user
const getRouteFromOriginToDestination = async () => {
  const url = `${winnipeg_transit_base_url}?origin=geo/${route.origin.lat}, ${route.origin.long}&destination=geo/${route.destination.lat}, ${route.destination.long}&api-key=${WINNIPEG_TRANSIT_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

const renderRoute = (data) => {
  console.log(data);
};

PlanMyTripButton.addEventListener("click", () => {
  getRouteFromOriginToDestination()
    .then((data) => renderRoute(data))
    .catch((error) => console.log(error));
});

OriginFormElement.addEventListener("submit", getOriginPlacesList);
DestinationFormElement.addEventListener("submit", getDestinationPlacesList);
