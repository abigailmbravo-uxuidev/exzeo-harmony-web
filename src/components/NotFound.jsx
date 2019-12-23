import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

function NotFound() {
  return (
    <div className="app-wrapper not-found">
      <Header toggleSideNav={x => x} />
      <div role="main">
        <div className="content-wrapper">
          <div className="workflow" role="article">
            <div className="route">
              <div className="route-content">
                <div className="error-content" role="article">
                  <header>
                    <div className="error-header">
                      <i className="fa fa-exclamation-triangle" />
                      <h4 className="section-group-header error">
                        Whoopsies! We're sorry, something seems to have gone
                        wrong!
                      </h4>
                    </div>
                  </header>
                  <div className="error-wrapper">
                    <section>
                      <div id="Error">
                        <h4 className="error-intro">
                          Sorry for the inconvenience, either the page you're
                          looking for does not exist or we're experiencing an
                          issue with our application at the moment.
                        </h4>
                        <div className="static-error-message">
                          <p>
                            Please try refreshing the page. If you continue
                            having trouble, please return to the Dashboard or
                            contact one of our representatives so they may
                            further assist you
                          </p>
                        </div>
                        <div className="error-footer">
                          <Link className="btn btn-primary" to="/">
                            Return to Dashboard
                          </Link>
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
                          <i className="fa fa-phone" />{' '}
                          <span>(844) 289-7968</span>
                        </a>
                      </div>
                    </aside>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
