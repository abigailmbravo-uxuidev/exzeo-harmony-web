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
            <nav>
              <Link to="/admin/roleManagement" className="role-tab tab" activeClassName="selected">Roles</Link>
              <Link to="/admin/permissionManagement" className="permission-tab tab" activeClassName="selected">Permissions</Link>
            </nav>
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
