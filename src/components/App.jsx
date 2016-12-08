import React, { Component, PropTypes } from 'react';
import { Match } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as featureActions from '../actions/featureActions';
import Splash from './auth/Splash';
import Login from './auth/Login';
import Home from './common/Home';
import Quote from './Quote';
import Header from './common/Header';
import Footer from './common/Footer';
import './App.css';

export class App extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      initializeLD: PropTypes.func,
      setupFeature: PropTypes.func,
    }),
    features: PropTypes.shape({
      get: PropTypes.func,
    }),
    loggedIn: PropTypes.bool,
  }
  componentWillMount = () => {
    this.props.actions.initializeLD();
  }
  componentWillReceiveProps = (newProps) => {
    if (newProps.features.get('ld-started') && !this.props.features.get('ld-started')) {
      this.props.actions.setupFeature('splash-screen');
      this.props.actions.setupFeature('login-message');
      this.props.actions.setupFeature('search');
    }
  }
  render() {
    const homeScreen = this.props.loggedIn ? Home : Splash;
    return (
      <div>
        <Header/>
        <main>
          <Match exactly pattern="/" component={homeScreen} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/quote" component={Quote}/>
        </main>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  features: state.features,
  loggedIn: typeof state.auth.get('token') !== 'undefined',
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(featureActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
