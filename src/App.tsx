import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    setLatitude(crd.latitude);
    console.log(crd.latitude);
    setLongitude(crd.longitude);
    console.log(crd.longitude);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            console.log("Geolocation permission denied");
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const freeURL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
      const getWeather = async () => {
        try {
          const response = await fetch(freeURL);
          const data = await response.json();
          setWeatherData(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      getWeather();
    }
  }, [latitude, longitude]);

  return (
    <>
      <h1>Weather app</h1>
      {weatherData ? (
        <div>
          <p>Location: {weatherData.location.name}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
