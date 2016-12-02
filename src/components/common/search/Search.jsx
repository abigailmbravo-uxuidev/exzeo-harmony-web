import React, { Component, PropTypes } from 'react';
import SearchBar from './SearchBar';
import TypeAhead from './TypeAhead';

class Search extends Component {
  static propTypes = {
    options: PropTypes.shape({
      placeholder: PropTypes.string,
    }).isRequired,
  }
  state = {
    searchText: '',
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchText: event.target.value });
  }
  render() {
    const { placeholder } = this.props.options;
    const { searchText } = this.state;
    return (
      <div>
        <SearchBar
          placeholder={placeholder || null}
          handleChange={this.handleChange}
        />
        <TypeAhead searchText={searchText} />
      </div>
    );
  }
}

export default Search;
