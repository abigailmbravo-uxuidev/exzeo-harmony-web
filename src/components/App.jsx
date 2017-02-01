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
import ErrorPage from './common/ErrorPage';
import TestPage from './TestPage';
import Search from './common/search/Search';
import NewWorkflow from './workflows/Workflow';
import Admin from './admin/Admin';
import Cms from './cms/CMS';
import './App.css';
import './Rules';
import Demographics from './common/Demographics/Demographics';
import Verify from './common/verify/Verify';

export class App extends Component {

  static propTypes = {
    actions: PropTypes.shape({ initializeLD: PropTypes.func, setupFeature: PropTypes.func }),
    features: PropTypes.shape({ get: PropTypes.func }),
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
    const homeScreen = this.props.loggedIn ? Home : Splash;
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
                  <a href="/workflow">
                    <i className="fa fa-home" /><span>Home</span></a>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="content-wrapper">
            <Match pattern="/" component={Search} />
            <Match exactly pattern="/" component={homeScreen} />
            <Match pattern="/login" component={Login} />
            <Match pattern="/quote/:location/:address" component={Quote} />
            <Match pattern="/test" component={TestPage} />
            <Match pattern="/workflow" component={NewWorkflow} />
            <Match pattern="/admin/" component={Admin} />
            <Match pattern="/cms" component={Cms} />
            <Match pattern="/error" component={ErrorPage} />
            <Match pattern="/Verify" component={Verify} />
            <Match pattern="/Demographics" component={Demographics} />
          </div>
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
