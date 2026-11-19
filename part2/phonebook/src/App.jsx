import { useState, useEffect } from "react";
import Form from "./Components/Form";
import SearchField from "./Components/SearchField";
import Person from "./Components/Person";
import Persons from "./Components/Persons";

import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
  }, [])
  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const resetInputFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already listed.`);
      return;
    }

    setPersons(persons.concat(personObject));
    resetInputFields();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField
        searchField={searchField}
        handleSearchFieldChange={handleSearchFieldChange}
      />
      <h3>Add New Entry</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchField={searchField} />
    </div>
  );
};

export default App;
