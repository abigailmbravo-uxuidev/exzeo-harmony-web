import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';
import * as serviceActions from '../actions/serviceActions';

export class Splash extends Component {
  componentDidMount() {
    this.props.actions.serviceActions.clearPolicyResults();
  }
  render() {
    return (
      <BaseConnect {...this.props} >
        <ClearErrorConnect />
        <div className="dashboard" role="article">
          <div className="route">
            <div className="route-content">
              <div className="scroll">
                <div className="dashboard-message">
                  <h1 className="app-header">Agency App</h1>
                  <h4>Homeowners (HO3) insurance for Florida properties.</h4>
                  <p>Getting a quote is always quick and simple with <strong>TypTap Insurance</strong>. Start a quote or find an existing quote using the <strong>START NEW QUOTE</strong> and <strong>RETRIEVE QUOTE</strong> buttons below. Find a policy using the <strong>RETRIEVE POLICY</strong> button below.</p>
                </div>
                <div className="survey-wrapper">
                  <div className="product-wrapper">
                    <div className="product card">
                      <div className="card-header image card-header-image-home">
                        <h4 className="product-name"><i className="fa fa-home" /> Homeowners Insurance</h4>
                      </div>
                      <div className="card-block">
                        <p>TypTap currently offers homeowners policies for single family residential dwellings in Florida.</p>
                      </div>
                      <div className="card-footer">
                        <Link to={{ pathname: '/search/address', state: { searchType: 'address' } }} className="btn btn-secondary btn-block"><i className="fa fa-plus" />New Quote</Link>
                        <Link to={{ pathname: '/search/retrieve', state: { searchType: 'quote' } }} className="btn btn-primary btn-block"><i className="fa fa-history" />Retrieve Quote</Link>
                        <Link to={{ pathname: '/policy', state: { searchType: 'policy' } }} className="btn btn-action btn-block"><i className="fa fa-history" />Retrieve Policy</Link>
                      </div>
                    </div>
                  </div>
                  <div className="exzeo" />
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </BaseConnect>
    );
  }
}

Splash.propTypes = {
  actions: PropTypes.shape()
};


Splash.displayName = 'Splash';

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(null, mapDispatchToProps)(Splash);
