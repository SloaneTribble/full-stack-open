import DeleteButton from "./DeleteButton";

const Person = ({ person, deleteButtonCallback }) => {
  return (
    <li>
      {person.name} {person.number}
      <DeleteButton callBack={deleteButtonCallback} />
    </li>
  );
};

export default Person;
