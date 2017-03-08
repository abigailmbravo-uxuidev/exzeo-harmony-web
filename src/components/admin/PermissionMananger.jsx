// import React, { Component, PropTypes } from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import AddPermission from './AddPermission';
//
// class PermissionMananger extends Component {
//
//   static propTypes = {
//     data: PropTypes.any,// eslint-disable-line
//     deletePermission: PropTypes.func,
//   }
//   state = {
//     addPermission: false,
//   }
//
//   togglePermission = () => {
//     this.setState({
//       addPermission: !this.state.addPermission,
//     });
//   }
//   permissionAdded = () => {
//     this.props.data.refetch();
//     this.togglePermission();
//   }
//   deletePermission = (name) => {
//     this.props.deletePermission({
//       variables: {
//         input: name,
//       },
//     }).then(() => {
//       this.props.data.refetch();
//     }).catch(error => console.error(error));
//   }
//   render() {
//     console.log(this);
//     const data = this.props.data;
//     return (
//       <div className="content fade-in">
//         <div className="admin-header">
//           <h3>Permissions</h3>
//           <button className="btn-success btn-round" onClick={this.togglePermission}>
//             <i className="fa fa-plus" />
//           </button>
//         </div>
//         <ul className="list list-cards">
//           {this.state.addPermission
//             ? <AddPermission permissionAdded={this.permissionAdded} />
//             : null}
//           {data && data.permission
//             ? data.permission.map((p, index) => (
//               <li key={index}>
//                 <section>
//                   <h4>{p.name}</h4>
//                   <p>{p.description}</p>
//                 </section>
//                 <ul className="list">
//                   {p.rights.map((right, i) => (
//                     <li
//                       key={i} className={right.active
//                         ? 'active'
//                         : null}
//                     >{right.name}</li>
//                     ))
// }
//                 </ul>
//                 <i
//                   className="fa fa-trash" onClick={() => {
//                     this.deletePermission(p.name);
//                   }}
//                 />
//               </li>
//               ))
//             : null
// }
//         </ul>
//       </div>
//     );
//   }
// }
//
// export default graphql(gql `
//   query GetPermissions {
//     permission {
//       name
//       description
//       rights {
//         name
//         active
//       }
//     }
//   }
// `)(graphql(gql `
//   mutation DeletePermission($input:String!) {
//     deletePermission(input:$input)
//   }
//   `, { name: 'deletePermission' })(PermissionMananger));
