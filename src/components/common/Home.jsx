import React, { Component } from 'react';
import Search from './search/Search';
import QuoteSearchResults from '../../components/QuoteSearchResults';

class Home extends Component {
  state = {
    // Some state will go here
  }
  render() {
    return (
      <div>
        <Search options={{}} />
        <QuoteSearchResults />
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home;
