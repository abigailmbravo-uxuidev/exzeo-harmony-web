import React, { PropTypes } from 'react';

const SearchBar = ({ placeholder, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit || null}>
    <input
      placeholder={placeholder || 'Search...'}
      onChange={handleChange || null}
    />
  </form>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default SearchBar;
