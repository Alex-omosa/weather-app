window.addEventListener("load", () => {
  let lat;
  let long;
  let temperatureDescription = document.getElementById(
    "tempareture-description"
  );
  let temperatureDegree = document.getElementById("temperature-degree");
  let locationTimeZone = document.getElementById("location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temparetureSpan = document.querySelector(".temperature span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/0dc7005a5e4d35619b754d6508ece30b/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;
          // formula
          let celsius = (temperature - 32) * (5 / 9);
          //set icons
          setIcon(icon, document.getElementById("icon1"));
          // change to C or F

          temperatureSection.addEventListener("click", () => {
            if (temparetureSpan.textContent === "F") {
              temparetureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temparetureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcon(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
