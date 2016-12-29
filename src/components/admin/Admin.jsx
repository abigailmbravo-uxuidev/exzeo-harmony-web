import React from 'react';
import {Match, Link} from 'react-router';
import RoleManager from './RoleManager';
import PermissionMananger from './PermissionMananger';

const Admin = () => (
  <div className="admin" role="article">
    <div className="fade-in">
      <div className="content">
        <aside>
          <div className="side-panel">
            <Link to="roleManagement" activeOnlyWhenExact className="role-tab tab">Roles</Link>
            <Link to="permissionManagement" activeOnlyWhenExact className="permission-tab tab">Permissions</Link>
          </div>
        </aside>
        <section>
          <Match pattern="roleManagement" component={RoleManager}/>
          <Match pattern="permissionManagement" component={PermissionMananger}/>
        </section>
      </div>
    </div>
  </div>
);

export default Admin;
