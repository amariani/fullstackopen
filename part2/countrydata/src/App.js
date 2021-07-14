import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((e) => {
          setCountries([]);
        });
    }
  }, [searchTerm]);

  const handleTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <p>Find Countries</p>
      <input value={searchTerm} onChange={handleTermChange} />

      <Countries
        countriesList={countries}
        setOneCountryHandler={(countryName) => setSearchTerm(countryName)}
      />
    </div>
  );
};

export default App;
