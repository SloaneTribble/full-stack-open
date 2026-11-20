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
      if (persons.find((person) => person.number === newNumber)) {
        alert(`"${newName} ${newNumber}" is a duplicate entry`)
        return
      }

      updatePerson(personObject)
      return;
    }

    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      resetInputFields();
    })
  };

  const updatePerson = (personObject) => {
      const confirmed = confirm(`${personObject.name} is already listed. Update number?`)
      if (!confirmed) {return}

      const person = persons.find((n) => n.name === newName)
      const updatedPerson = { ...person, number: newNumber }

      personsService
        .update(person.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map((person) => 
            (person.id == updatedPerson.id ? updatedPerson : person)))
        })
        .catch((error) => {
          console.log(error)
        })

  }

  const deletePerson = (id) => {
    return (() => {
      const personName = persons.find((person) => person.id === id).name
      console.log(personName)
      if (!confirm(`Are you sure you want to delete ${personName}?`)){
        return
      }
      personsService.deletePerson(id)
    .then((response)=> {
      const updatedPersons = persons.filter((person) => (person.id !== id))
      setPersons(updatedPersons)
    })}
    )
}

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
      <Persons persons={persons} searchField={searchField} deleteButtonCallback={deletePerson}/>
    </div>
  );
};

export default App;
