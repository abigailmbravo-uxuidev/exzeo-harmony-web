import React, { PropTypes } from 'react';

const SearchBar = ({ placeholder, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit || null}>
    <input
        name="search-address"
      placeholder={placeholder || 'Search...'}
      onChange={handleChange || null}
    />
    <button className="btn btn-success"><i className="fa fa-search"></i> Search</button>
  </form>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default SearchBar;
