import {
  getPlaces,
  DestinationInputElement,
  DestinationListElement,
} from "./app.js";

// using getCurrentPosition get user's coordinates and pass it to the getPlaces to get list of destination places
export const getDestinationPlacesList = (e) => {
  e.preventDefault();
  if (DestinationInputElement.value !== "") {
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
  }
};

// function to display destination places list
export const renderDestinationPlacesList = ({ features }) => {
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
