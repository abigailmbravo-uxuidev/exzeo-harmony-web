import React, {PropTypes} from 'react';

const ErrorPopup = ({quote, underwritingExceptions, refereshUWReviewError, redirectToNewQuote}) => (
    <div className="error-content pop-up" role="article">
        <div className="survey-wrapper">
            <div className="contact-message">
                <div className="card card-csr">
                    <div className="card-header image card-header-image-csr">
                        <h4><i className="fa fa-exclamation-triangle"/> Underwriting Error(s) - Please contact us</h4>
                    </div>
                    <div className="card-block">
                        <h4>The following underwriting error(s) have occured with this quote:</h4>
                        <ul className="error">
                            {underwritingExceptions.map((exception, i) => {
                                if (exception.action !== 'Fatal Error') {
                                    return (
                                        <li key={i}>{exception.agentMessage}</li>
                                    );
                                }
                                return '\u00A0';
                            })}
                        </ul>
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
                                        <dd>{`${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state} ${
                                            quote.property.physicalAddress.zip}`}</dd>
                                    </div>
                                </dl>
                            </div>}
                        </section>
                        <p>Contact a TypTap customer service representatives so we may further assist you in obtaining a quote.</p>
                        <div className="contact-methods">
                            <a href="tel:8442897968"><i className="fa fa-phone"/> (844) 289-7968</a>
                            <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope"/> email us</a>
                        </div>
                    </div>
                    <div className="card-footer">
                        {/* <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope"/> email us</a>
                             <a href="tel:8442897968"><i className="fa fa-phone"/> (844) 289-7968</a>*/}
                        <small>A TypTap CSR may be able to correct your underwring error(s) allowing you to refresh and continue.</small>
                        <div className="btn-group">
                            <a href="tel:8442897968" className="btn btn-secondary btn-round"><i className="fa fa-phone"/></a>
                            <button className="btn btn-secondary" onClick={refereshUWReviewError}>Refresh</button>
                            <button className="btn btn-primary" onClick={redirectToNewQuote}>New Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

ErrorPopup.propTypes = {
    quote: PropTypes.shape(),
    underwritingExceptions: PropTypes.arrayOf(PropTypes.shape()),
    refereshUWReviewError: PropTypes.func,
    redirectToNewQuote: PropTypes.func
};

export default ErrorPopup;
