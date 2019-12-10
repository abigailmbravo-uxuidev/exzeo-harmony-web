import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { http } from '@exzeo/core-ui';

import { setUserProfile } from '../state/actions/authActions';
import { setAppError } from '../state/actions/errorActions';
import Auth from '../Auth';

const auth = new Auth();

// TODO: this is the first pass at abstracting out Authentication into a reusable component. Will return
export class Authentication extends Component {
  componentWillMount() {
    const { config, userProfile, history, setAppErrorAction } = this.props;

    const { isAuthenticated } = auth;

    if (isAuthenticated() && this.checkPublicPath(window.location.pathname)) {
      try {
        this.idToken = localStorage.getItem(config.tokenLocation);
      } catch (error) {
        setAppErrorAction({ message: error });
      }
      http.defaults.headers.common.authorization = `bearer ${this.idToken}`;

      if (!userProfile) {
        this.setUserProfileInState();
      }
    } else if (
      !isAuthenticated() &&
      this.checkPublicPath(window.location.pathname)
    ) {
      http.defaults.headers.common.authorization = undefined; // eslint-disable-line
      history.push(config.unauthRedirect);
    } else if (/access_token|id_token|error/.test(window.location.hash)) {
      auth.handleAuthentication(history);
    }
  }

  // TODO There is a timing issue in cWM so we do this check again. This is a band-aid until the auth0-spa-js lib can be incorporated.
  componentDidUpdate(prevProps) {
    const { config, userProfile, setAppErrorAction } = this.props;

    const { isAuthenticated } = auth;

    if (isAuthenticated() && this.checkPublicPath(window.location.pathname)) {
      try {
        this.idToken = localStorage.getItem(config.tokenLocation);
      } catch (error) {
        setAppErrorAction({ message: error });
      }
      http.defaults.headers.common.authorization = `bearer ${this.idToken}`;

      if (!userProfile) {
        this.setUserProfileInState();
      }
    }
  }

  setUserProfileInState = () => {
    const { config, setUserProfileAction, setAppErrorAction } = this.props;
    try {
      const profile = JSON.parse(localStorage.getItem(config.profileLocation));
      setUserProfileAction(profile);
    } catch (error) {
      setAppErrorAction({ message: error });
    }
  };

  checkPublicPath = path => {
    const { config } = this.props;
    return config.publicPaths.indexOf(path) === -1;
  };

  render() {
    return <React.Fragment>{this.props.render({ auth })}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.authState.userProfile
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      setAppErrorAction: setAppError,
      setUserProfileAction: setUserProfile
    }
  )(Authentication)
);
