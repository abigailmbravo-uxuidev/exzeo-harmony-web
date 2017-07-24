import React from 'react';
import { Link } from 'react-router-dom';

import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';

const Splash = props => (
  <BaseConnect {...props} >
    <ClearErrorConnect />
    <div className="dashboard" role="article">
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="dashboard-message">
              <h1 className="app-header">Agency Quoting App</h1>
              <h4>Easily quote Flood and Homeowners (HO3) insurance for Florida properties.</h4>
              <p>Getting a quote is always quick and simple with <strong>TypTap Insurance</strong>. You can start a quote or find an existing quote using the <strong>NEW QUOTE</strong> and <strong>RETRIEVE QUOTE</strong> buttons below.</p>
            </div>
            <div className="survey-wrapper">
              <div className="product-wrapper">
                {/*flood will be added back in for phase 2*/}
                {/* <div className="product card">
                  <div className="card-header image card-header-image-flood">
                    <h4 className="product-name"><i className="fa fa-tint" /> Flood Insurance</h4>
                  </div>
                  <div className="card-block">
                    <p>TypTap currently offers stand-alone flood policies for single family residential dwellings in Florida.</p>
                  </div>
                  <div className="card-footer">
                    <button type="submit" form="floodQuoteForm" className="btn btn-secondary"><i className="fa fa-plus" />New Quote</button>
                    <button type="submit" form="floodQuoteForm" className="btn btn-primary"><i className="fa fa-history" />Retrieve Quote</button>
                  </div>
                </div> */}
                <div className="product card">
                  <div className="card-header image card-header-image-home">
                    <h4 className="product-name"><i className="fa fa-home" /> Homeowners Insurance</h4>
                  </div>
                  <div className="card-block">
                    <p>TypTap currently offers homeowners polices for single family residential dwellings in Florida.</p>
                  </div>
                  <div className="card-footer">
                    <Link to={{ pathname: '/quote', state: { searchType: 'address' } }} className="btn btn-secondary btn-block"><i className="fa fa-plus" />New Quote</Link>
                    <Link to={{ pathname: '/quote/retrieve', state: { searchType: 'quote' } }} className="btn btn-primary btn-block"><i className="fa fa-history" />Retrieve Quote</Link>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </BaseConnect>
);

Splash.displayName = 'Splash';

export default Splash;
