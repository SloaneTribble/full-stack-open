import Country from "./Country"

const caseInsensitiveStringMatch = (searchField) => {
  const lowerCaseSearchField = searchField.toLowerCase();
  const stringMatchFunction = (country) => {
    console.log(country)
    const lowerCaseName = country.name.common.toLowerCase();
    return lowerCaseName.indexOf(lowerCaseSearchField) >= 0;
  };
  return stringMatchFunction;
};

const CountryList = ({ countries, searchField }) => {

    if (searchField.length === 0){}

    const countriesToShow = countries.filter(caseInsensitiveStringMatch(searchField))

    if (countriesToShow.length > 10) {
        return (
            <div>Too many matches; please try another query</div>
        )
    }

    return (
      <div>
        <ul>
          {countriesToShow.map((country) => (
            <Country key={country.ccn3} countryObject={country} />
          ))}
        </ul>
      </div>
    )
}

export default CountryList;