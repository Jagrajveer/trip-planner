import { getOriginPlacesList } from "./origin.js";
import { getDestinationPlacesList } from "./destination.js";
import { renderRoute } from "./planMyTrip.js";

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
export const OriginInputElement = document.querySelector(".origin-form input");
export const OriginListElement = document.querySelector(".origins");

const DestinationFormElement = document.querySelector(".destination-form");
export const DestinationInputElement = document.querySelector(
  ".destination-form input"
);
export const DestinationListElement = document.querySelector(".destinations");

const PlanMyTripButton = document.querySelector(".plan-trip");
export const RouteElement = document.querySelector(".my-trip");

const route = {
  origin: "",
  destination: "",
};

// this function uses mapbox api to get list of places using the given keywords
export const getPlaces = async (latitude, longitude, place) => {
  const url = `${map_box_base_url}/${place}.json?bbox=-97.32972, 49.762789, -96.951241, 49.994007&proximity=${longitude}, ${latitude}&access_token=${MAP_BOX_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// function to get the route from origin to destination provided by user
export const getRouteFromOriginToDestination = async () => {
  const url = `${winnipeg_transit_base_url}?origin=geo/${route.origin.lat}, ${route.origin.long}&destination=geo/${route.destination.lat}, ${route.destination.long}&api-key=${WINNIPEG_TRANSIT_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

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

OriginFormElement.addEventListener("submit", getOriginPlacesList);

DestinationFormElement.addEventListener("submit", getDestinationPlacesList);

PlanMyTripButton.addEventListener("click", () => {
  if (route.origin !== "" || route.destination !== "") {
    getRouteFromOriginToDestination()
      .then((data) => renderRoute(data))
      .catch((error) => console.log(error));
  }
});
