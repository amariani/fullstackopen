import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY;

const WeatherDetails = ({ countryName }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!countryName) {
      return null;
    }
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryName}`
      )
      .then((res) => {
        setWeather(res.data.current);
      });
  }, [countryName]);

  if (!weather) {
    return null;
  }

  return (
    <div>
      <p>
        <strong>Temperature:</strong> {weather.temperature} Celcius
      </p>
      <img
        src={weather.weather_icons[0]}
        alt={weather.weather_descriptions[0]}
      />
      <p>
        <strong>Wind:</strong> {weather.wind_degree} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

export default WeatherDetails;
