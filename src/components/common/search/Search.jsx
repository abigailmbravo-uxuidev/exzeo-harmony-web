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
    searchText: ''
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchText: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    window.location = '/quote?address' + this.state.searchText;
  }

  handleSelect = (event) => {
    window.location = '/quote?address' + event.target.innerText;
  }

  render() {
    const { placeholder } = this.props.options;
    const { searchText } = this.state;
    return (
      <div className="search">
        <SearchBar
          placeholder={placeholder || null}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <TypeAhead searchText={searchText} handleSelect={this.handleSelect}/>
      </div>
    );
  }
}

export default Search;
