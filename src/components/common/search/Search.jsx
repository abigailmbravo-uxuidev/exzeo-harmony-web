import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import TypeAhead from './TypeAhead';

class Search extends Component {
  static propTypes = {
    options: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    searchText: '',
  }
  handleChange = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.setState({ searchText: event.target.value });
  }

  handleSubmit = (event) => {
    // window.location = '/quote/address/' + this.state.searchText;
    if (event && event.preventDefault) event.preventDefault();
    if (this.props.searchConfig.type === 'append') {
      const query = {};
      query[this.props.searchConfig.value] = this.state.searchText;
      this.context.router.transitionTo({
        query,
      });
      this.setState({ searchText: '' });
    }
  }

  handleSelect = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    if (this.props.searchConfig.type === 'append') {
      const query = {};
      query[this.props.searchConfig.value] = event.target.innerText;
      this.context.router.transitionTo({
        query,
      });
      this.setState({ searchText: '' });
    }
    //window.location = '/quote/address/' + event.target.innerText;
  }

  componentWillMount(){
      let address = decodeURIComponent(window.location.pathname.split('/')[3]);
      this.setState({ searchText: (address !== 'undefined' ? address : '') })
  }

  render() {
    const options = this.props.options;
    const { searchText } = this.state;
    let placeholder
    if (this.props.searchConfig && this.props.searchConfig.placeholder) {
      placeholder = this.props.searchConfig.placeholder;
    } else {
      placeholder = options ? options.placeholder : null;
    }
    return (
      <div className="search">
        <SearchBar
          placeholder={placeholder}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searchText={this.state.searchText}
          focus={this.props.searchConfig ? this.props.searchConfig.focus : false}
        />
        <TypeAhead searchText={searchText} handleSelect={this.handleSelect} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchConfig: state.search.get('config'),
});

export default connect(mapStateToProps)(Search);
