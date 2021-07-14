import React from "react";
import LanguagesList from "./LanguagesList";
import WeatherDetails from "./WeatherDetails";

const CountryDetails = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <LanguagesList languages={country.languages} />
      <img src={country.flag} alt={`${country.name} flag`} width="300px" />
      <WeatherDetails countryName={country.name} />
    </div>
  );
};

export default CountryDetails;
