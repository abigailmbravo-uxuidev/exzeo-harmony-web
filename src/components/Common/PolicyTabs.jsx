import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PolicyTabs = ({ activeTab, policyNumber }) =>
  <nav className="nav-tabs">
    <Link to={`/policy/${policyNumber}/policyHolder`} className={`btn btn-tab ${activeTab === 'policyHolder' ? 'active' : ''}`}><i className="fa fa-vcard" /><span>Policyholder</span></Link>
    <Link to={`/policy/${policyNumber}/property`} className={`btn btn-tab ${activeTab === 'property' ? 'active' : ''}`}><i className="fa fa-map-marker" /><span>Property</span></Link>
    <Link to={`/policy/${policyNumber}/coverage`} className={`btn btn-tab ${activeTab === 'coverage' ? 'active' : ''}`}><i className="fa fa-sliders" /><span>Coverage</span></Link>
    <Link to={`/policy/${policyNumber}/billing`} className={`btn btn-tab ${activeTab === 'billing' ? 'active' : ''}`}><i className="fa fa-money" /><span>Billing</span></Link>
    <Link to={`/policy/${policyNumber}/documents`} className={`btn btn-tab ${activeTab === 'documents' ? 'active' : ''}`}><i className="fa fa-file-text-o" /><span>Documents</span></Link>
  </nav>;

export default PolicyTabs;

PolicyTabs.propTypes = {
  activeTab: PropTypes.string,
  policyNumber: PropTypes.string
};
