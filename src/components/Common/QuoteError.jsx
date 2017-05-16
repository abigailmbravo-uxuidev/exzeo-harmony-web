import React, { PropTypes } from 'react';

const ErrorPopup = ({ quote, closeButtonHandler }) => (
  <div className="error-content modal pop-up fade-in" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-csr">
          <div className="card-header image card-header-image-csr">
            <h4><i className="fa fa-exclamation-triangle" /> Quote cannot be retrieved</h4>
          </div>
          <div className="card-block">
            <h4 className="error">{`We apologize but this Quote has a status of ${quote.quoteState} which is no longer retrievable.`}</h4>
            <section className="error-property-details">
              {quote && <div className="display-element">
                <dl className="quote-number">
                  <div>
                    <dt>Quote Number</dt>
                    <dd>{quote.quoteNumber}</dd>
                  </div>
                </dl>
                </div>}
              {quote.property && <div className="display-element">
                <dl className="property-information">
                  <div>
                    <dt>Property Address</dt>
                    <dd>{quote.property.physicalAddress.address1}</dd>
                    <dd>{quote.property.physicalAddress.address2}</dd>
                    <dd>{`${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state} ${quote.property.physicalAddress.zip}`}</dd>
                  </div>
                </dl>
                </div>}
            </section>
            <p>For questions or edits, please contact us.</p>
            <div className="contact-methods">
              <a href="tel:8442897968"><i className="fa fa-phone" /> (844) 289-7968</a>
              <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope" /> email us</a>
            </div>
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <a href="tel:8442897968" className="btn btn-secondary btn-round"><i className="fa fa-phone" /></a>
              <button className="btn btn-secondary" onClick={closeButtonHandler} type="button">CLOSE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ErrorPopup.propTypes = {
  quote: PropTypes.shape(),
  closeButtonHandler: PropTypes.func
};

export default ErrorPopup;
