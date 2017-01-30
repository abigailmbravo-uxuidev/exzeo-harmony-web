import React from 'react';

// 2 hard stop
// 0 or none, complete error
// 1 soft stop

const ErrorPage = ({ errorType }) => {
  if (errorType === 1 || errorType === 2) {
    return (
      <div className="error-page" role="article">
        <div className="fade-in">
          <div className="workflow-content">
            <section>
              <div className="fade-in">
                <div className="survey-wrapper">
                  <h4>You have finished the requirements to obtain your HO3 quote.</h4>
                  <p>To complete the process, please contact a customer support representative.</p>
                </div>
              </div>
            </section>
          </div>
          <div className="contact-info">
            <dl>
              <div>
                <dt>Customer service</dt>
                <dd>
                  <a href="tel:8442897968">
                    <i className="fa fa-phone" />
                    (844) 289-7968</a>
                  <a href="tel:8442897968">
                    <i className="fa fa-envelope" />
                    customerservice@typtap.com</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="error-page" role="article">
      <div className="fade-in">
        <div className="quote-details" role="contentinfo">
          <dl>
            <div>
              <dt>Quote Number</dt>
              <dd>TT-12345678-01</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt>Address</dt>
              <dd>123 East Beachfront Avenue</dd>
              <dd>Osprey, FL 33333</dd>
            </div>
          </dl>
          <dl className="annualPremium">
            <div>
              <dt>Annual Premium</dt>
              <dd>$ --</dd>
            </div>
          </dl>
        </div>
        <ul className="workflow-header">
          <div className="rule"></div>
          <li>
            <a>
              <i className="fa fa-circle-thin"></i>
              <span></span>
            </a>
          </li>
          <h3 className="error-message-header">
            <i className="fa fa-frown-o"></i>
            Sorry</h3>
        </ul>
        <div className="workflow-content">
          <section>
            <div className="fade-in">
              <div className="survey-wrapper">
                <h4>An error occured while trying to complete your quote.</h4>
                <p>We apologize, we are unable to provide an automated quote for your property at this time. Please contact one of our representatives so they may further assist you in obtaining a quote.</p>
              </div>
            </div>
          </section>
        </div>
        <div className="contact-info">
          <dl>
            <div>
              <dt>Customer service</dt>
              <dd>
                <a href="tel:8442897968">
                  <i className="fa fa-phone"></i>
                  (844) 289-7968</a>
                <a href="tel:8442897968">
                  <i className="fa fa-envelope"></i>
                  customerservice@typtap.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

    </div>
  );
};

export default ErrorPage;
