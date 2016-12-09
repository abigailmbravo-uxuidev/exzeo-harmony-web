import React, { Component } from 'react';
import Search from './common/search/Search';
import QuoteSearchResults from './QuoteSearchResults';
import Stepper from './workflows/Stepper';

class Home extends Component {
  state = {
    // Some state will go here
  }
  render() {
    return (
      <div>
        <Search options={{}} />
        <QuoteSearchResults />
        <Stepper/>
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home;
