import React from 'react';
import Footer from '../common/Footer';

const ErrorPage = () => (
  <div className="error-content" role="article">
    {/* HARD STOP WORKFLOW ERROR*/}
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-csr">
        <div className="card-header image card-header-image-csr">
          <h4><i className="fa fa-exclamation-triangle"></i> Error - Please contact us</h4>
        </div>
        <div className="card-block">
          <h4 className="error-message">An error occured while trying to complete your quote.</h4>
          <p>We apologize, but we are unable to provide an automated quote for your property at this time.</p>
          <p>Please contact one of our representatives so they may further assist you in obtaining a quote.</p>
          <div className="contact-methods">
            <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope"/> email us</a>
            <a href="tel:8442897968"><i className="fa fa-phone"/> (844) 289-7968</a>
          </div>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
            {/* SOFT STOP WORKFLOW ERROR*/}
            {/*<div className="fade-in">
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
                        (844) 289-7968
                      </a>
                      <a href="mailto:customerservice@typtap.com">
                        <i className="fa fa-envelope" />
                        email us
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>*/}
            {/* APP ERROR*/}
            {/*<div className="fade-in app-error">
              <div className="workflow-content">
                <section>
                  <div className="fade-in">
                    <section className="survey-wrapper">
                      <article className="error-message">
                        <h2>Oh no! You Flooded the Website!</h2>
                        <p>Just kidding, something went wrong or the
                          page you are looking for cannot be found.</p>
                        <a href="./" className="btn btn-success">Return Home</a>
                      </article>
                      <div className="contact-info">
                        <dl>
                          <div>
                            <dt>Customer service</dt>
                            <dd>
                              <a href="tel:8442897968">
                                <i className="fa fa-phone" />
                                (844) 289-7968
                              </a>
                              <a href="mailto:customerservice@typtap.com">
                                <i className="fa fa-envelope" />
                                email us
                              </a>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </section>
                  </div>
                </section>
              </div>
              <div className="waves" />
            </div>*/}

  </div>

);

export default ErrorPage;
