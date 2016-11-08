import React, { Component } from 'react';
import { Match, Link } from 'react-router';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const Secondary = () => <h3>Secodary Route</h3>;

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Harmony</h2>
        </div>
        <p className="App-intro">
          Harmony Web Scaffold
        </p>
        <Link to="/secondary">Secondary</Link>
        <Match pattern="/secondary" component={Secondary} />
      </div>
    );
  }
}

export default connect(state => ({
  features: state.features,
}))(App);
