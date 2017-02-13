/* eslint no-unused-vars :0 */
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as featureActions from '../actions/featureActions';
import Splash from './Splash';
import Login from './Login';
import Quote from './Quote';
import Header from '../components/common/Header';
import './App.css';
import '../components/forms/Rules';

export class App extends Component {

  static propTypes = {
    actions: PropTypes.shape({ initializeLD: PropTypes.func, setupFeature: PropTypes.func }),
    features: PropTypes.shape({ get: PropTypes.func }),
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    direction: '',
    lastScrollPos: 0,
  }
  componentWillMount = () => {
    //this.props.actions.initializeLD();
  }
  componentWillReceiveProps = (newProps) => {
    // if (newProps.features.get('ld-started') && !this.props.features.get('ld-started')) {
    //   this.props.actions.setupFeature('splash-screen');
    //   this.props.actions.setupFeature('login-message');
    //   this.props.actions.setupFeature('search');
    // }
  }
  shouldComponentUpdate = (nextProps, nextState) => (!(this.state.direction === nextState.direction))

  handleScroll = (event) => {
    if (this.state.lastScrollPos > event.target.scrollTop) {
      // console.log('top');
      this.setState({ direction: 'top', lastScrollPos: event.target.scrollTop });
    } else if (this.state.lastScrollPos < event.target.scrollTop) {
      // console.log('woah');
      this.setState({ direction: 'bottom', lastScrollPos: event.target.scrollTop });
    }
  }
  render() {
    const homeScreen = Splash;
    const cssName = this.state.direction === 'bottom' ? 'scroll-up' : '';
    return (
      <div className="app-wrapper">
        <Header />
        <main role="document" onScroll={this.handleScroll} className={cssName}>
          <aside className="content-panel-left">
            <div className="user">
              <span className="user-icon">
                <i className="fa fa-user-circle-o" />
              </span>
              <h5 className="user-name">
                <span>ABC Insurance Agency</span>
                <i className="fa fa-gear" />
              </h5>
            </div>
            <nav className="site-nav">
              <ul>
                <li className="active">
                  <a href="/">
                    <i className="fa fa-home" /><span>Home</span></a>
                </li>
              </ul>
            </nav>
          </aside>
          <Router>
            <div className="content-wrapper">
              <Route exact path="/" component={homeScreen} />
              <Route path="/login" component={Login} />
              <Route exact path="/quote" component={Quote} />
              <Route path="/quote/:activeStep" component={Quote} />
            </div>
          </Router>
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
