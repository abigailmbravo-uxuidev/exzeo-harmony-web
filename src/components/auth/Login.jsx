import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as authActions from '../../actions/authActions';

class Login extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      login: PropTypes.func,
    }),
    auth: PropTypes.shape({
      get: PropTypes.func,
    }),
  }
  state = {
    username: '',
    password: '',
  }
  handleChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.login(this.state);
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
          <br />
          <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
          <br /><br />
          <button>Login</button>
        </form>
        {
          this.props.auth.get('token') ? (
            <Redirect to="/" />
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
