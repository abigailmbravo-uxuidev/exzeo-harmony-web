import React, { PropTypes } from 'react';

const SearchBar = ({
  placeholder,
  handleChange,
  handleSubmit,
  handleOnFocus,
  handleOnBlur,
  searchText,
  focus,
}) => (
  <form onSubmit={handleSubmit || null}>
    <input
        name="search-address"
        className={focus ? 'focus-user' : ''}
        placeholder={placeholder || 'Search...'}
        onChange={handleChange || null}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoComplete="off"
        value={searchText}
    />
    <button className="btn btn-success"><i className="fa fa-search" /> Search</button>
  </form>
);

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default SearchBar;
