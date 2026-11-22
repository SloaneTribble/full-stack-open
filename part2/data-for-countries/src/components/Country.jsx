import { useState } from "react";

const Country = ({ countryObject, expand, toggleButton }) => {
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
          {toggleButton ? (
            <button onClick={toggleExpanded}>Expand</button>
          ) : null}
        </p>
      </div>
    );
  }

  const countryLanguages = countryObject.languages;
  const countryFlags = countryObject.flags;

  // expanded view
  return (
    <div>
      <h2>{countryName}</h2>
      {toggleButton ? <button onClick={toggleExpanded}>Minimize</button> : null}

      <p>Capital: {countryObject.capital[0]}</p>
      <p>Area: {countryObject.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.entries(countryLanguages).map(([key, value]) => (
          <li key={`${countryName}${key}`}>{value}</li>
        ))}
      </ul>
      <img alt={countryFlags.alt} src={countryFlags.png}></img>
    </div>
  );
};

export default Country;
