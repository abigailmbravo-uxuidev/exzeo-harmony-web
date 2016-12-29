import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import AddPermission from './AddPermission';

class PermissionMananger extends Component {
  state = {
    addPermission: false
  }
  togglePermission = () => {
    this.setState({
      addPermission: !this.state.addPermission
    });
  }
  permissionAdded = () => {
    this.props.data.refetch();
    this.togglePermission();
  }
  deletePermission = (name) => {
    this.props.deletePermission({
      variables: {
        input: name
      }
    }).then(() => {
      this.props.data.refetch();
    }).catch(error => console.error(error));
  }
  render() {
    console.log(this);
    const data = this.props.data;
    return (
      <div className="content">
        <button className="btn btn-secondary" onClick={this.togglePermission}>Add Permission</button>
        {this.state.addPermission
          ? <AddPermission permissionAdded={this.permissionAdded}/>
          : null}
        {data && data.permission
          ? data.permission.map((p, index) => {
            return (
              <ul className="list">
                <li className="items items-cards" key={index}>
                  <div>{p.name}</div>
                  <div>{p.description}</div>
                  <ul>
                    {p.rights.map((right, index) => (
                      <li key={index} className={right.active
                        ? 'active'
                        : null}>{right.name}</li>
                    ))
}
                  </ul>
                  <i className="fa fa-trash" onClick={() => {
                    this.deletePermission(p.name);
                  }}/>
                </li>
              </ul>
            )
          })
          : null
}

      </div>
    );
  }
};

export default graphql(gql `
  query GetPermissions {
    permission {
      name
      description
      rights {
        name
        active
      }
    }
  }
`)(graphql(gql `
  mutation DeletePermission($input:String!) {
    deletePermission(input:$input)
  }
  `, {name: 'deletePermission'})(PermissionMananger));
