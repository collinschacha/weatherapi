import { useEffect, useState } from "react";
import "./App.css";
import.meta.env.VITE_API_KEY;
// import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  // Location functionality
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos: any) {
    const crd = pos.coords;
    console.log("Your current position is:");
    setLatitude(crd.latitude);
    console.log(latitude);
    setLongitude(crd.longitude);
    console.log(longitude);
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
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  });
  // end of location functionality
  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const freeURL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
    const getWeather = async () => {
      const response = await fetch(freeURL);
      const data = await response.json();
      console.log(data.current.temp_c);
    };
    getWeather();
  }, [latitude, longitude]);
  return (
    <>
      <h1>Weather app</h1>
      {/* <SearchBar /> */}
      <div></div>
    </>
  );
}

export default App;
