import { useState, useEffect } from "react";
import Form from "./components/Form";
import SearchField from "./components/SearchField";
import Person from "./components/Person";
import Persons from "./components/Persons";

import axios from "axios";

import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    personsService.getAll()
    .then((response) => {
      setPersons(response)
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
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already listed.`);
      return;
    }

    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      resetInputFields();
    })
    
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
