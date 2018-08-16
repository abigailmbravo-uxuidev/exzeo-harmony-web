import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PolicyTabs = ({ activeTab, policyNumber }) =>
  <nav className="nav-tabs">
    <Link to={{ pathname: `/policy/${policyNumber}/policyHolder` }} className={`btn btn-tab ${activeTab === 'policyHolder' ? 'active' : ''}`} data-test="policy-holder-tab"><i className="fa fa-user" /><span>Policyholder</span></Link>
    <Link to={{ pathname: `/policy/${policyNumber}/property` }} className={`btn btn-tab ${activeTab === 'property' ? 'active' : ''}`} data-test="property-tab"><i className="fa fa-map-marker" /><span>Property</span></Link>
    <Link to={{ pathname: `/policy/${policyNumber}/coverage` }} className={`btn btn-tab ${activeTab === 'coverage' ? 'active' : ''}`} data-test="coverage-tab"><i className="fa fa-sliders" /><span>Coverage</span></Link>
    <Link to={{ pathname: `/policy/${policyNumber}/documents` }} className={`btn btn-tab ${activeTab === 'documents' ? 'active' : ''}`} data-test="documents-tab"><i className="fa fa-file-text-o" /><span>Documents</span></Link>
  </nav>;

export default PolicyTabs;

PolicyTabs.propTypes = {
  activeTab: PropTypes.string,
  policyNumber: PropTypes.string
};
