import Person from "./Person";

const caseInsensitiveStringMatch = (searchField) => {
  const lowerCaseSearchField = searchField.toLowerCase();
  const stringMatchFunction = (person) => {
    const lowerCaseName = person.name.toLowerCase();
    return lowerCaseName.indexOf(lowerCaseSearchField) >= 0;
  };
  return stringMatchFunction;
};

const Persons = ({ persons, searchField }) => {
  const personsToShow =
    searchField.length > 0
      ? persons.filter(caseInsensitiveStringMatch(searchField))
      : persons;

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

export default Persons;
