import React, {Component, PropTypes} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class AddPermission extends Component {
  static propTypes = {
    addPermission: PropTypes.func,
    permissionAdded: PropTypes.func
  }
  state = {
    permission: {
      name: '',
      description: '',
      rights: []
    },
    right: {
      name: '',
      active: true
    }
  }
  updatePermission = (event) => {
    const permission = this.state.permission;
    permission[event.target.name] = event.target.value;
    this.setState({permission});
  }
  addPermission = (event) => {
    event.preventDefault();
    this.props.addPermission({
      variables: {
        input: this.state.permission
      }
    }).then(({data}) => {
      this.props.permissionAdded(data.createPermission);
    }).catch(error => console.error(error));
    this.setState({
      permission: {
        name: '',
        description: '',
        rights: []
      }
    });
  }
  updateRight = (event) => {
    const right = this.state.right;
    right.name = event.target.value;
    this.setState({right});
  }
  addRight = (event) => {
    event.preventDefault();
    console.log('waffles');
    const permission = this.state.permission;
    permission.rights.push(this.state.right);
    this.setState({
      permission,
      right: {
        name: '',
        active: true
      }
    });
  }
  render() {
    const permission = this.state.permission;
    return (
      <div className="modal">
        <div className="card fade-in">
          <div className="card-block">
            <form onSubmit={this.addPermission}>
              <label htmlFor="name">Name:</label>
              <input onChange={this.updatePermission} name="name" id="name" value={permission.name}/>
              <label htmlFor="description">Description:</label>
              <input onChange={this.updatePermission} name="description" id="description" value={permission.description}/>
              <ul>
                {permission.rights.map((right, index) => (
                  <li key={index}>{right.name}</li>
                ))
                }
              </ul>
              <button className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <form onSubmit={this.addRight}>
              <input onChange={this.updateRight} value={this.state.right.name}/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(gql `
  mutation AddPermission($input:CreatePermissionInput) {
    createPermission(input:$input) {
      name
      description
      rights {
        name
        active
      }
    }
  }
`, {name: 'addPermission'})(AddPermission);
