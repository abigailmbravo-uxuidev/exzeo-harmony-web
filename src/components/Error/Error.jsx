import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../Common/Footer';
import _ from 'lodash';

const handleGetExceptions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const exceptions = _.find(taskData.model.variables, { name: taskData.previousTask.name }).value;
  return exceptions;
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'quote' }).value.result;
  return quoteData;
};

const Error = ({ quote, exceptions }) => {
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
                  {exceptions && exceptions.map((exception, key) => {
                    if (exception.action === 'Fatal Error') {
                      hasFatalError = true;
                      return <li key={key}>{exception.agentMessage}</li>;
                    } else if (exception.action === 'Underwriting Review') {
                      return <li className="warning-li" key={key}>{exception.agentMessage}</li>;
                    }
                    return '';
                  })}
                </ul>
                {!hasFatalError && <p>Please contact one of our representatives so they may further assist you in obtaining a HO3 insurance quote for this property.</p>}
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
  )
};

Error.propTypes = {
  tasks: PropTypes.shape({
    activeTask: PropTypes.object
  }),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quote: handleGetQuoteData(state),
  exceptions: handleGetExceptions(state)
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, null)(Error);
