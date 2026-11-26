import { useState, useEffect } from "react";
import Form from "./components/Form";
import SearchField from "./components/SearchField";
import Person from "./components/Person";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import axios from "axios";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

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

  const showNotification = (notificationObject) => {
    setNotification(notificationObject);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      if (persons.find((person) => person.number === newNumber)) {
        alert(`"${newName} ${newNumber}" is a duplicate entry`);
        return;
      }

      updatePerson(personObject);
      return;
    }

    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      const notificationObject = {
        message: `An entry for ${returnedPerson.name} has been created.`,
        type: "success",
      };
      showNotification(notificationObject);
      resetInputFields();
    });
  };

  const updatePerson = (personObject) => {
    const confirmed = confirm(
      `${personObject.name} is already listed. Update number?`,
    );
    if (!confirmed) {
      return;
    }

    const person = persons.find((n) => n.name === newName);
    const updatedPerson = { ...person, number: newNumber };

    personsService
      .update(person.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id == updatedPerson.id ? updatedPerson : person,
          ),
        );
        const notificationObject = {
          message: `${updatedPerson.name} has been updated.`,
          type: "success",
        };
        showNotification(notificationObject);
      })
      .catch((error) => {
          console.log(error);
          const notificationObject = {
            message: `The entry for ${updatedPerson.name} was not found in the server.`,
            type: "error",
          };
          showNotification(notificationObject);
        });
  };

  const deletePerson = (id) => {
    return () => {
      const personName = persons.find((person) => person.id === id).name;

      if (!confirm(`Are you sure you want to delete ${personName}?`)) {
        return;
      }
      personsService
        .deletePerson(id)

        .then((response) => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          const notificationObject = {
            message: `The entry for ${personName} has been deleted.`,
            type: "success",
          };
          showNotification(notificationObject);
        })
        .catch((error) => {
          console.log(error);
          const notificationObject = {
            message: `The entry for ${personName} has already been deleted.`,
            type: "error",
          };
          showNotification(notificationObject);
        });
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons
        persons={persons}
        searchField={searchField}
        deleteButtonCallback={deletePerson}
      />
    </div>
  );
};

export default App;
