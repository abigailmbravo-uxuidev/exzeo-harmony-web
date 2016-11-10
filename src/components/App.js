import React, { Component } from 'react';
import { Match } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as featureActions from '../actions/featureActions';
import Splash from './Splash';
import './App.css';

const Secondary = () => <h3>Secodary Route</h3>;

class App extends Component {
  componentWillMount = () => {
    this.props.actions.initializeLD();
  }
  componentWillReceiveProps = newProps => {
    if (newProps.features.get('ld-started') && !this.props.features.get('ld-started')) {
      console.log('do things');
      this.props.actions.setupFeature('splash-screen');
      this.props.actions.setupFeature('login-message');
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Match exactly pattern="/" component={Splash} />
        <Match pattern="/secondary" component={Secondary} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  features: state.features,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(featureActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
