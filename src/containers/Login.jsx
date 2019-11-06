import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';

class Login extends Component {
  constructor(props) {
    super(props);
    const { isAuthenticated } = props.auth;

    if (!isAuthenticated()) {
      props.auth.login();
    } else {
      props.history.replace('/');
    }
  }
  render() {
    return <Loader />;
  }
}

export default Login;
