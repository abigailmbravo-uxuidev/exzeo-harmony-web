/* eslint no-unused-vars :0 */
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as featureActions from '../actions/featureActions';
import Splash from './Splash';
import Login from './Login';
import Quote from './Quote';
import Header from '../components/common/Header';
import AppError from './AppError';
import NotFound from './NotFound';
// import '../components/forms/Rules';

class App extends Component {

  static propTypes = {
    actions: PropTypes.shape({ initializeLD: PropTypes.func, setupFeature: PropTypes.func }),
    features: PropTypes.shape({ get: PropTypes.func })
  }
  static contextTypes = {
    router: PropTypes.object
  }
  state = {
    direction: '',
    lastScrollPos: 0
  }
  componentWillMount = () => {
    // this.props.actions.initializeLD();
  }
  componentWillReceiveProps = (newProps) => {
    // if (newProps.features.get('ld-started') && !this.props.features.get('ld-started')) {
    //   this.props.actions.setupFeature('splash-screen');
    //   this.props.actions.setupFeature('login-message');
    //   this.props.actions.setupFeature('search');
    // }
  }
  // shouldComponentUpdate = (nextProps, nextState) =>
  //  (!(this.state.direction === nextState.direction))

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
        <main role="document" className={cssName}>
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
                    <i className="fa fa-th-large" /><span>Dashboard</span></a>
                </li>
                <li className="">
                  <a href="https://www.typtap.com/agency?agentToken=eFE3Sv8NG5fgjH4Bj1MfOb6vxx9ikSiFZ4lAxepkxZqbDyO4ORoTKDPg_eVBr2AtsOT8YAGSeQLXLsdRedZbyzm7VTU5DxTkDx1Zq4F8rauLsur6ins3h47AZZMuZfg44Tkbk5PTdl5P7dIhnh7SdNv80PBbFmMMza_S0cMV4zR1frqxhsmr8y8jUspE-_lJgAsvkRQYcNOeMcs0ZXxAsqlGZI0n2-k6qQnaRy-Of85fcO2_Ymg7zlDplgl8vjbIWxQwp2kk8pNPhqUbDdGW9tgCHfZK5uIInXI38PWZ88GnaNXPTnW9guJDZNkfgYxHAfbad0vEDiX3oJ-s4LoP-thQgqmx2ruZxRsOa_dop2NcmLOtbI65apdHcagIhj72BfCLYL3DtnlSb-JaZJKeNxcmWydErMXXpu_b4hwlIHx9a-2tewhJCxAABESWDGJU0D9BMQuNHsXltUw74FgVUtJjEEzvZF0ThCvu0smpgmrgecIBLoI_eUE_yNMu7xwo5fzykp75ZPRdlCKU7x_w84S8imdI-vfJvzyYcpb0dEPerd7OhvpkT-qX9wrqhDaB6N24s8Mz4bP5I0nRM-uFyuXfuV-fYGStCQbWVosb73xSs3aFKuFJ08BIAxU2i06C_mTxA5i0Oy7NW6xep0IKchxP7KbBcdki4J3VU2GQONqJWcle1MPHO1L2Us4Pnk1UlvdPyw">
                    <i className="fa fa-tint" /><span>Quote Flood</span></a>
                </li>
                <li className="">
                  <a href="/quote">
                    <i className="fa fa-home" /><span>Quote HO3</span></a>
                </li>
              </ul>
            </nav>
          </aside>
          <Router>
            <div className="content-wrapper">
              <Switch>
                <Route exact path="/" component={homeScreen} />
                <Route path="/login" component={Login} />
                <Route exact path="/quote" component={Quote} />
                <Route path="/quote/:activeStep" component={Quote} />
                <Route exact path="/error" component={AppError} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  features: state.features,
  loggedIn: typeof state.auth.get('token') !== 'undefined'
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(featureActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
