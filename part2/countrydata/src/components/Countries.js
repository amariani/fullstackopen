import React from "react";
import CountryDetails from "./CountryDetails";

const Countries = ({ countriesList, setOneCountryHandler }) => {
  if (countriesList.length > 10) {
    return (
      <p>Too many matches ({countriesList.length}), specify another filter.</p>
    );
  }

  if (countriesList.length > 1) {
    return countriesList.map((c) => (
      <p key={c.numericCode}>
        {c.name}{" "}
        <button onClick={() => setOneCountryHandler(c.name)}>show</button>
      </p>
    ));
  }

  if (countriesList.length === 1) {
    return <CountryDetails country={countriesList[0]} />;
  }

  return <p>No results for your search</p>;
};

export default Countries;
