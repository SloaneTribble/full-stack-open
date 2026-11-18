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

export default Form;
