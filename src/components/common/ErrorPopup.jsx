import React from 'react';

const ErrorPopup = () => (
  <div className="error-content" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-csr">
          <div className="card-header image card-header-image-csr">
            <h4><i className="fa fa-exclamation-triangle" /> Underwriting error(s)</h4>
          </div>
          <div className="card-block">
            <h4 className="error-message">Please contact us</h4>
            <div className="contact-methods">
              <a href="tel:8442897968"><i className="fa fa-phone" /> (844) 289-7968</a>
              <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope" /> email us</a>
            </div>
            <p>We apologize. Underwriting error(s) have occured with this quote.</p>
            <p>Contact a TypTap customer service representatives so we may further assist you in obtaining a quote.</p>
          </div>
          <div className="card-footer">
            {/* <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope"/> email us</a>
            <a href="tel:8442897968"><i className="fa fa-phone"/> (844) 289-7968</a>*/}
            <small>A TypTap CSR may be able to correct your underwring error(s) allowing you to refresh and continue.</small>
            <div className="btn-group">
              <a href="tel:8442897968" className="btn btn-secondary btn-round"><i className="fa fa-phone" /></a>
              <button className="btn btn-secondary">Refresh</button>
              <button className="btn btn-primary">New Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorPopup;
