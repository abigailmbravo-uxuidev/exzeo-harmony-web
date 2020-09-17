import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PolicyNavigation = ({ activeTab, policyNumber }) => (
  <nav className="nav-tabs policy-navigation">
    <Link
      to={`/policy/${policyNumber}/policyHolder`}
      className={`btn btn-tab ${activeTab === 'policyHolder' ? 'active' : ''}`}
    >
      <i className="fa fa-vcard" />
      <span>Policyholder</span>
    </Link>
    <Link
      to={`/policy/${policyNumber}/property`}
      className={`btn btn-tab ${activeTab === 'property' ? 'active' : ''}`}
    >
      <i className="fa fa-map-marker" />
      <span>Property</span>
    </Link>
    <Link
      to={`/policy/${policyNumber}/coverage`}
      className={`btn btn-tab ${activeTab === 'coverage' ? 'active' : ''}`}
    >
      <i className="fa fa-sliders" />
      <span>Coverage</span>
    </Link>
    <Link
      to={`/policy/${policyNumber}/billing`}
      className={`btn btn-tab ${activeTab === 'billing' ? 'active' : ''}`}
    >
      <i className="fa fa-money" />
      <span>Billing</span>
    </Link>
    <Link
      to={`/policy/${policyNumber}/claims`}
      className={`btn btn-tab ${activeTab === 'claims' ? 'active' : ''}`}
    >
      {/* TODO this svg will be replaced when font awesome 6 is added */}
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="house-damage"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className="claims-icon"
      >
        <path
          d="M288 114.96L69.47 307.71c-1.62 1.46-3.69 2.14-5.47 3.35V496c0 8.84 7.16 16 16 16h149.23L192 439.19l104.11-64-60.16-119.22L384 392.75l-104.11 64L319.81 512H496c8.84 0 16-7.16 16-16V311.1c-1.7-1.16-3.72-1.82-5.26-3.2L288 114.96zm282.69 121.32L512 184.45V48c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16v51.69L314.75 10.31C307.12 3.45 297.56.01 288 0s-19.1 3.41-26.7 10.27L5.31 236.28c-6.57 5.91-7.12 16.02-1.21 22.6l21.4 23.82c5.9 6.57 16.02 7.12 22.6 1.21L277.42 81.63c6.05-5.33 15.12-5.33 21.17 0L527.91 283.9c6.57 5.9 16.69 5.36 22.6-1.21l21.4-23.82c5.9-6.57 5.36-16.69-1.22-22.59z"
          className=""
        ></path>
      </svg>
      <span>Claims</span>
    </Link>
    <Link
      to={`/policy/${policyNumber}/documents`}
      className={`btn btn-tab ${activeTab === 'documents' ? 'active' : ''}`}
    >
      <i className="fa fa-file-text-o" />
      <span>Documents</span>
    </Link>
  </nav>
);

export default PolicyNavigation;

PolicyNavigation.propTypes = {
  activeTab: PropTypes.string,
  policyNumber: PropTypes.string
};
