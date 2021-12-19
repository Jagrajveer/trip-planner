import { getPlaces, OriginInputElement, OriginListElement } from "./app.js";

// using getCurrentPosition get user's coordinates and pass it to the getPlaces to get list of origin places
export const getOriginPlacesList = (e) => {
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

// function to display origin places list
export const renderOriginPlacesList = ({ features }) => {
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
