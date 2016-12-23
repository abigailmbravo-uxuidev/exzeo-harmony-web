import React from 'react';
import { Match, Link } from 'react-router';
import RoleManager from './RoleManager';
import PermissionMananger from './PermissionMananger';

const Admin = () => (
  <div>
    <Link to="roleManagement" activeOnlyWhenExact>Roles</Link>
    <Link to="permissionManagement" activeOnlyWhenExact>Permissions</Link>
    <Match pattern="roleManagement" component={RoleManager} />
    <Match pattern="permissionManagement" component={PermissionMananger} />
  </div>
);

export default Admin;
