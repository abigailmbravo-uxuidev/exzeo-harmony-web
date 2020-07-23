import React from 'react';
import { useAuth0 } from '../context/auth-context';

import logo from '../img/TypTap-alt.svg';

function AccessDenied() {
  const { error, logout } = useAuth0();

  return (
    <div className="route-content access-denied">
      <div className="modal">
        <div className="card error logo">
          <div className="card-header">
            <img src={logo} alt="TypTap" />
          </div>
          <div className="card-block">
            <h3>
              <i className="fa fa-exclamation-triangle" />
              &nbsp;Oooops!
            </h3>
            <p className="text-danger">{error}</p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <i className="fa fa-sign-in" /> Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
