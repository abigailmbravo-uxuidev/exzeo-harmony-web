import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';

class Login extends Component {
    componentWillMount = () => {
        //this.props.actions.initializeLD();
    }
    componentWillReceiveProps = newProps => {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let credentials = {
            username: ReactDOM.findDOMNode(this.refs.username).value,
            password: ReactDOM.findDOMNode(this.refs.password).value
        }
        this.props.actions.login(credentials);
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="username" />
                    <br />
                    <input type="password" ref="password"/>
                    <br /><br />
                    <button>Login</button>
                </form>
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

