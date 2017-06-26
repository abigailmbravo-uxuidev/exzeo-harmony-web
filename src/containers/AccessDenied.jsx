import React from 'react';
import * as queryString from 'query-string';
import logo from '../img/TypTap.svg';

const parsed = queryString.parse(window.location.search);

const AccessDenied = props => (<div className="route-content access-denied">
  <div className="modal">
    <div className="card error logo">
      <div className="card-header">
        <img src={logo} alt="TypTap" />
      </div>
      <div className="card-block">
        <h3><i className="fa fa-exclamation-triangle" />&nbsp;Access Denied</h3>
        <p>You are not authorized to access this application.</p>
        <p className="text-danger"><i className="fa fa-exclamation-triangle" /> {parsed.error}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => props.auth.logout()}><i className="fa fa-sign-in" /> Login</button>
      </div>
    </div>
  </div>
</div>);

export default AccessDenied;
