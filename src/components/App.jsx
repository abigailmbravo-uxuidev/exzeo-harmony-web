import React, { Component, PropTypes } from 'react';
import { Match } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as featureActions from '../actions/featureActions';
import Splash from './auth/Splash';
import Login from './auth/Login';
import Home from './Home';
import Quote from './quote/Quote';
import Header from './common/Header';
import Footer from './common/Footer';
import TestPage from './TestPage';
import Search from './common/search/Search';
import NewWorkflow from './newworkflow/Workflow';
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
  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    direction: '',
    lastScrollPos: 0,
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
  handleScroll = (event) => {
    if (this.state.lastScrollPos > event.target.scrollTop) {
      this.setState({
        direction: 'top',
        lastScrollPos: event.target.scrollTop,
      });
    } else if (this.state.lastScrollPos < event.target.scrollTop) {
      this.setState({
        direction: 'bottom',
        lastScrollPos: event.target.scrollTop,
      });
    }
  }
  render() {
    const homeScreen = this.props.loggedIn ? Home : Splash;
    const cssName = this.state.direction === 'bottom' ? 'scroll-up' : '';
    return (
      <div className="app-wrapper">
        <Header />
        <main role="document" onScroll={this.handleScroll} className={cssName}>
          <Search options={{}} />
          <Match exactly pattern="/" component={homeScreen} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/quote/:location/:address" component={Quote} />
          <Match pattern="/test" component={TestPage} />
          <Match pattern="/workflow" component={NewWorkflow} />
          <Footer />
        </main>
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
