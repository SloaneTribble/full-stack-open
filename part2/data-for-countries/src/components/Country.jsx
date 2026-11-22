import { useState, useEffect } from "react";

import WeatherData from "./WeatherData"

const Country = ({ countryObject, expand, toggled, singleCountry }) => {
  const [expanded, setExpanded] = useState(expand);

  const countryName = countryObject.name.common;

  const toggleExpanded = () => {
    setExpanded(expanded ? false : true);
  };

  // simple (unexpanded) country view
  if (expanded === false) {
    return (
      <div>
        <p>
          {countryName}{" "}
          {toggled ? (
            <button onClick={toggleExpanded}>Expand</button>
          ) : null}
        </p>
      </div>
    );
  }

  const countryLanguages = countryObject.languages;
  const countryFlags = countryObject.flags;
  const countryCapital = countryObject.capital[0];
  const countryCapitalCoords = countryObject.capitalInfo.latlng;

  // expanded view
  return (
    <div>
      <h2>{countryName}</h2>
      {toggled ? <button onClick={toggleExpanded}>Minimize</button> : null}

      <p>Capital: {countryCapital}</p>
      <p>Area: {countryObject.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.entries(countryLanguages).map(([key, value]) => (
          <li key={`${countryName}${key}`}>{value}</li>
        ))}
      </ul>
      <img alt={countryFlags.alt} src={countryFlags.png}></img>
      {singleCountry ? <WeatherData coordinates={countryCapitalCoords}/> : null}
      
    </div>
  );
};

export default Country;
