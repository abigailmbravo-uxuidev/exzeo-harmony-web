import React, { Component } from 'react';
import Search from './search/Search';
/*
eslint react/prefer-stateless-function:0
*/
class Home extends Component {
  render() {
    // const { me } = this.state;
    return (
      <div>
        <Search />
      </div>
    );
  }
}

export default Home;
