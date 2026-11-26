import Person from "./Person";

import DeleteButton from "./DeleteButton";

const caseInsensitiveStringMatch = (searchField) => {
  const lowerCaseSearchField = searchField.toLowerCase();
  const stringMatchFunction = (person) => {
    const lowerCaseName = person.name.toLowerCase();
    return lowerCaseName.indexOf(lowerCaseSearchField) >= 0;
  };
  return stringMatchFunction;
};

const Persons = ({ persons, searchField, deleteButtonCallback }) => {
  const personsToShow =
    searchField.length > 0
      ? persons.filter(caseInsensitiveStringMatch(searchField))
      : persons;

  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <Person
            person={person}
            key={person.id}
            deleteButtonCallback={deleteButtonCallback(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
