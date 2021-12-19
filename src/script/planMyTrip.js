import { RouteElement } from "./app.js";

// function will display the route from origin to destination
export const renderRoute = (data) => {
  const { plans } = data;
  RouteElement.innerHTML = "";

  RouteElement.insertAdjacentHTML(
    "beforeend",
    "<li><h3>Recommended trip</h3></li>"
  );

  plans[0].segments.map((segment) => {
    let step = "";

    if (segment.type === "walk") {
      if (segment.to.stop) {
        step = `<li><i class="fas fa-walking"></i>Walk for ${segment.times.durations.walking} minutes to ${segment.to.stop.key} - ${segment.to.stop.name}.</li>`;
      } else if (segment.to.destination) {
        step = `<li><i class="fas fa-walking"></i>Walk for ${segment.times.durations.walking} minutes to your destination.</li>`;
      }
    }
    if (segment.type === "ride") {
      if (segment.route.key === "BLUE") {
        step = `<li><i class="fas fa-bus" ></i>Ride the ${segment.route.key} for ${segment.times.durations.riding} minutes.</li>`;
      } else {
        step = `<li><i class="fas fa-bus" ></i>Ride the ${segment.route.name} for ${segment.times.durations.riding} minutes.</li>`;
      }
    }
    if (segment.type === "transfer") {
      step = `<li><i class="fas fa-ticket-alt"></i>transfer from stop ${segment.from.stop.name} to stop ${segment.to.stop.name}.</li>`;
    }

    RouteElement.insertAdjacentHTML("beforeend", step);
  });
  RouteElement.insertAdjacentHTML(
    "beforeend",
    "<li><h3>Alternative trips</h3></li>"
  );
  plans[1].segments.map((segment) => {
    let step = "";

    if (segment.type === "walk") {
      if (segment.to.stop) {
        step = `<li><i class="fas fa-walking"></i>Walk for ${segment.times.durations.walking} minutes to ${segment.to.stop.key} - ${segment.to.stop.name}.</li>`;
      } else if (segment.to.destination) {
        step = `<li><i class="fas fa-walking"></i>Walk for ${segment.times.durations.walking} minutes to your destination.</li>`;
      }
    }
    if (segment.type === "ride") {
      if (segment.route.key === "BLUE") {
        step = `<li><i class="fas fa-bus" ></i>Ride the ${segment.route.key} for ${segment.times.durations.riding} minutes.</li>`;
      } else {
        step = `<li><i class="fas fa-bus" ></i>Ride the ${segment.route.name} for ${segment.times.durations.riding} minutes.</li>`;
      }
    }
    if (segment.type === "transfer") {
      step = `<li><i class="fas fa-ticket-alt"></i>transfer from stop ${segment.from.stop.name} to stop ${segment.to.stop.name}.</li>`;
    }

    RouteElement.insertAdjacentHTML("beforeend", step);
  });
};
