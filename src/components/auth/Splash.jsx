import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import logo from '../../img/logo.svg';
import './Splash.css';

const Splash = ({ splashScreen, loginMessage }) => {
  if (splashScreen) {
    return (
      <div role="document" className="splash">
        <header>
          <div id="logo" className="logo">
            <img src={logo} width="40px" height="40px" alt="harmony-logo" />
            <h1><span>Project</span>{window.appConfig.appTitle}</h1>
          </div>
        </header>
        <main role="main">
          <blockquote>
            <img src={logo} width="120px" height="120px" alt="harmony-logo" />
            <h2>Welcome to</h2>
            <h1 className="logo-font">Project {window.appConfig.appTitle}</h1>
            {loginMessage ? <h3>Please <Link to="/login">login</Link> to continue</h3> : null}
          </blockquote>
        </main>
      </div>
    )
  } else {
    return <h3>Project | Harmony</h3>;
  }
}

Splash.displayName = 'Splash';

const mapStateToProps = state => ({
  splashScreen: state.features.get('splash-screen'),
  loginMessage: state.features.get('login-message'),
});

export default connect(mapStateToProps)(Splash);
