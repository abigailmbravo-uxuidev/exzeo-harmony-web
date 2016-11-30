import React, { Component, PropTypes } from 'react';
import SearchBar from './SearchBar';

class Search extends Component {
  static propTypes = {
    options: PropTypes.shape({
      placeholder: PropTypes.string,
    }).isRequired,
  }
  state = {
    results: [],
  }
  render() {
    const { placeholder } = this.props.options;
    return (
      <div>
        <SearchBar placeholder={placeholder || null} />
      </div>
    );
  }
}

export default Search;
