import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export const AppError = props => {
  if (!props.error.message) {
    return <Redirect to={{ pathname: props.location.state.redirectUrl }} />;
  }
  return (
    <div className="app-wrapper error">
      <Header toggleSideNav={x => x} />
      <main role="document">
        <div className="route">
          <div className="route-content">
            <div className="error-content" role="article">
              <div className="error-wrapper">
                <section>
                  <div id="Error">
                    <div className="detail-wrapper">
                      <h3 className="section-group-header error">
                        <i className="fa fa-exclamation-triangle" /> Application
                        Error
                      </h3>
                      <h4>We're sorry, something has gone wrong.</h4>
                      <p>
                        Please go back to the <a href="/">Dashboard</a> to start
                        over or contact one of our representatives so they may
                        further assist you in obtaining a HO3 insurance quote
                        for this property.
                      </p>
                      <a href="/" className="btn btn-secondary">
                        <i className="fa fa-th-large" /> Return to Dashboard
                      </a>
                    </div>
                  </div>
                </section>
                <aside>
                  <div className="image" />
                  <div className="contact-info">
                    <a
                      className="link-email"
                      href="mailto:customerservice@typtap.com"
                    >
                      <i className="fa fa-envelope" /> <span>email us</span>
                    </a>
                    <a className="link-phone" href="tel:8442897968">
                      <i className="fa fa-phone" /> <span>(844) 289-7968</span>
                    </a>
                  </div>
                </aside>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

AppError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

export default AppError;
