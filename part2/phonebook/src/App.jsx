import { useState } from 'react'

const Person = ({person}) => {
  return (<li>{person.name} {person.number}</li>)
}

const Persons = ({persons}) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person}/>
        )
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const resetInputFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already listed.`)
      return
    }

    setPersons(persons.concat(personObject))
    resetInputFields()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input name="name" value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input name="number" value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default App