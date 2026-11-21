import { useState, useEffect } from "react";
import axios from "axios";

import countriesService from "./services/countries";

import SearchField from "./components/SearchField";
import CountryList from "./components/CountryList";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => {
        setCountryList(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <h3>Find Countries</h3>
      <SearchField
        searchField={searchField}
        handleSearchFieldChange={handleSearchFieldChange}
      />
      <CountryList countries={countryList} searchField={searchField} />
    </>
  );
};

export default App;
