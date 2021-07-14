import React from "react";

const LanguagesList = ({ languages }) => {
  return (
    <>
      <h4>Languages</h4>
      <ul>
        {languages.map((lng) => {
          return <li key={lng.iso639_1}>{lng.name}</li>;
        })}
      </ul>
    </>
  );
};

export default LanguagesList;
