import Country from "./Country";

const caseInsensitiveStringMatch = (searchField) => {
  const lowerCaseSearchField = searchField.toLowerCase();
  const stringMatchFunction = (country) => {
    const lowerCaseName = country.name.common.toLowerCase();
    return lowerCaseName.indexOf(lowerCaseSearchField) >= 0;
  };
  return stringMatchFunction;
};

const CountryList = ({ countries, searchField }) => {
  if (searchField.length === 0 || countries.length === 0) {
    return null;
  }

  const countriesToShow = countries.filter(
    caseInsensitiveStringMatch(searchField),
  );

  if (countriesToShow.length === 0) {
    return null;
  }

  if (countriesToShow.length >= 10) {
    return <div>Too many matches; please try another query</div>;
  }

  if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    return (
      <div>
        <ul>
          {countriesToShow.map((country) => (
            <Country
              key={`${country.name.common} ${country.capitalInfo.latlng}`}
              countryObject={country}
              expand={false}
              toggled={true}
            />
          ))}
        </ul>
      </div>
    );
  }

  // exactly one country

  return (
    <div>
      <Country
        countryObject={countriesToShow[0]}
        expand={true}
        toggleButton={false}
        singleCountry={true}
      />
    </div>
  );
};

export default CountryList;
