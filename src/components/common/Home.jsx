import React, { Component } from 'react';
import Search from './Search';

class Home extends Component {
  state = {
    // Some state will go here
  }
  render() {
    return (
      <div>
        <Search />
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home;
