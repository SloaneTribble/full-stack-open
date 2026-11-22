const Country = ({ countryObject, expand }) => {
  const countryName = countryObject.name.common;

  // simple (unexpanded) country view
  if (expand === false) {
    return <div>{countryName}</div>;
  }

  console.log(countryObject);
  const countryLanguages = countryObject.languages;

  // expanded view
  return (
    <div>
      <h2>{countryName}</h2>
      <p>Capital: {countryObject.capital[0]}</p>
      <p>Area: {countryObject.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.entries(countryLanguages).map(([key, value]) => (
          <li key={`${countryName}${key}`}>{value}</li>
        ))}
      </ul>
      <img alt={countryObject.flags.alt} src={countryObject.flags.png}></img>
    </div>
  );
};

export default Country;
