import { useState } from "react";

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const caseInsensitiveStringMatch = (searchField) => {
  const lowerCaseSearchField = searchField.toLowerCase()
  const stringMatchFunction = (person) => {
    const lowerCaseName = person.name.toLowerCase();
    return lowerCaseName.indexOf(lowerCaseSearchField) >= 0
  }
  return stringMatchFunction;
}

const Persons = ({ persons, searchField }) => {
  const personsToShow = searchField.length > 0 ? 
    persons.filter(caseInsensitiveStringMatch(searchField))
    : persons
  
  return (
    <div>
      <ul>  
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

const Form = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name:
          <input
            name="name"
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            name="number"
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const SearchField = (props) => {
  return (
    <div>
      Search for:
      <input
        name="search"
        value={props.searchField}
        onChange={props.handleSearchFieldChange}
      />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchField, setSearchField] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  }

  const resetInputFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
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
      <SearchField searchField={searchField} handleSearchFieldChange={handleSearchFieldChange}/>
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
