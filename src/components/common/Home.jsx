import React, { Component } from 'react';
import Search from './Search';

class Home extends Component {
  render() {
    const {me} = this.state;
    return (
      <div>
        <Search />
      </div>
    )
  }
}

export default Home;
