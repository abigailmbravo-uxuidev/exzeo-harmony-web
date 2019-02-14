import React from 'react';
import { connect } from 'react-redux';
import Footer from '../Common/Footer';

const handleGetQuoteData = state => state.quoteState.quote || {};

const handleGetExceptions = (state) => {
  const quote = handleGetQuoteData(state);
  return quote.underwritingExceptions || [];
};

const Error = ({ exceptions }) => {
  let hasFatalError;
  return (
    <div className="route-content">
      <div className="error-content" role="article">
        {/* HARD STOP WORKFLOW ERROR*/}
        <div className="error-wrapper">
          <section>
            <div id="Error">
              <div className="detail-wrapper">
                <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle" /> Property does not qualify for automated quote</h3>
                <h4>The following errors have occurred for this property:</h4>
                <ul className="error-list">
                  {exceptions.map((exception, key) => {
                    if (exception.action === 'Fatal Error') {
                      hasFatalError = true;
                      return <li key={key}>{exception.agentMessage}</li>;
                    } else if (exception.action === 'Underwriting Review') {
                      return <li className="warning-li" key={key}>{exception.agentMessage}</li>;
                    }
                    return '';
                  })}
                </ul>
                {!hasFatalError &&
                  <p>Please contact one of our representatives so they may further assist you in obtaining a HO3 insurance quote for this property.</p>
                }
              </div>
            </div>
          </section>
          <aside>
            <div className="image" />
            <div className="contact-info">
              <a className="link-email" href="mailto:customerservice@typtap.com"><i className="fa fa-envelope" /> <span>email us</span></a>
              <a className="link-phone" href="tel:8442897968"><i className="fa fa-phone" /> <span>(844) 289-7968</span></a>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  appState: state.appState,
  quote: handleGetQuoteData(state),
  exceptions: handleGetExceptions(state)
});

export default connect(mapStateToProps)(Error);
