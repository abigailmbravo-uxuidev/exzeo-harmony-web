import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PolicyTabs = ({ activeTab, policyNumber }) =>
  <nav className="nav-tabs">
    <Link to={{ pathname: `/policy/${policyNumber}/policyHolder` }} className={`btn btn-tab ${activeTab === 'policyHolder' ? 'active' : ''}`}><i className="fa fa-user" />Policyholder</Link>
    <Link to={{ pathname: `/policy/${policyNumber}/property` }} className={`btn btn-tab ${activeTab === 'property' ? 'active' : ''}`}><i className="fa fa-map-marker" />Property</Link>
    <Link to={{ pathname: `/policy/${policyNumber}/coverage` }} className={`btn btn-tab ${activeTab === 'coverage' ? 'active' : ''}`}><i className="fa fa-sliders" />Coverage</Link>
    <Link to={{ pathname: `/policy/${policyNumber}/documents` }} className={`btn btn-tab ${activeTab === 'documents' ? 'active' : ''}`}><i className="fa fa-file-text-o" />Documents</Link>

  </nav>;

export default PolicyTabs;

PolicyTabs.propTypes = {
  activeTab: PropTypes.bool,
  policyNumber: PropTypes.string
};

