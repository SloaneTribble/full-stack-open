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

export default SearchField;
