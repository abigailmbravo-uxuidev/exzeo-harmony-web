import React, { Component } from 'react';
import Search from './search/Search';

class Home extends Component {
  state = {
    // Some state will go here
  }
  render() {
    return (
      <div>
        <Search options={{}} />
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home;
