import React from 'react';

const ErrorPage = () => (
  <div className="error-page" role="article">
    {/*HARD STOP WORKFLOW ERROR*/}
    <div className="fade-in">
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
                (844) 289-7968
              </a>
              <a href="mailto:customerservice@typtap.com">
                <i className="fa fa-envelope"></i>
                email us
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    {/*SOFT STOP WORKFLOW ERROR*/}
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
                <i className="fa fa-phone"></i>
                (844) 289-7968
              </a>
              <a href="mailto:customerservice@typtap.com">
                <i className="fa fa-envelope"></i>
                email us
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
    {/*APP ERROR*/}
    <div className="fade-in app-error">
      <div className="workflow-content">
        <section>
          <div className="fade-in">
            <section className="survey-wrapper">
              <article className="error-message">
                <h2>Oh no! You Flooded the Website!</h2>
                <p>Just kidding, something went wrong or the page you are looking for cannot be found.</p>
                <a href="./" className="btn btn-success">Return Home</a>
              </article>
              <div className="contact-info">
                <dl>
                  <div>
                    <dt>Customer service</dt>
                    <dd>
                      <a href="tel:8442897968">
                        <i className="fa fa-phone"></i>
                        (844) 289-7968
                      </a>
                      <a href="mailto:customerservice@typtap.com">
                        <i className="fa fa-envelope"></i>
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

      <div className="waves"></div>
    </div>
  </div>

);

export default ErrorPage;
