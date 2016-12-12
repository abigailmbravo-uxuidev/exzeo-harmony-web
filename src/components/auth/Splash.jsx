import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import logoHarmony from '../../img/logo.svg';

const Splash = ({ splashScreen, loginMessage }) => {
  if (splashScreen) {
    return (
      <div className="splash" role="article">
        <div className="fade-in">
          <img src={logoHarmony} width="120px" height="120px" alt="harmony-logo" />
          <small>Powered by</small>
          <small>PROJECT HARMONY</small>
          <h2>Welcome to</h2>
          <h1>Project {window.appConfig.appTitle}</h1>
          {loginMessage ? <h3>Please <Link to="/login">login</Link> to continue!</h3> : null}
        </div>
      </div>
    );
  }
  return <h3>Project | Harmony</h3>;
};

Splash.propTypes = {
  splashScreen: PropTypes.bool,
  loginMessage: PropTypes.bool,
};

Splash.displayName = 'Splash';

const mapStateToProps = state => ({
  splashScreen: state.features.get('splash-screen'),
  loginMessage: state.features.get('login-message'),
});

export default connect(mapStateToProps)(Splash);
