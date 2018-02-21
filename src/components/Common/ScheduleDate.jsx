import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';


const ScheduleDate = ({ appState, handleSubmit, verify, showScheduleDateModal, quoteData, selectedAgent, redirectToHome }) => (
  <div className="modal schedule-date-modal">
    <div className="survey-wrapper">
      <div className="card card-schedule-date">
        <Form noValidate onSubmit={handleSubmit(verify)}>
          <div className="card-header"><h4><i className="fa fa-envelope" /> Send Application</h4>
          </div>
          <div className="card-block">
            <h3>Congratulations</h3>
            <p>Click “SEND” below to generate the Homeowners Application</p>
            <p>An email will be sent to {`${_.get(quoteData, 'policyHolders[0].firstName')} ${_.get(quoteData, 'policyHolders[0].lastName')} (${_.get(quoteData, 'policyHolders[0].emailAddress')})`}
              {_.has(quoteData, 'policyHolders[1].firstName') ? ` and ${_.get(quoteData, 'policyHolders[1].firstName')} ${_.get(quoteData, 'policyHolders[1].lastName')} (${_.get(quoteData, 'policyHolders[1].emailAddress')})` : null}</p>
            <p>A copy will also be sent to you at: {selectedAgent.emailAddress}</p>
            <p>Once all required signatures are obtained, the policy will be automatically bind and the the policy documents will be emailed to you and the policyholder(s).</p>
            <p>NOTE: All signatures must be completed within 10 days, or the application will expire.</p>
            <p>{'Once you select "SEND", no changes can be made to this quote.'}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary btn-block" type="button" onClick={() => showScheduleDateModal(false)}>Edit Quote</button>
            <button className="btn btn-secondary btn-block" type="button" onClick={redirectToHome}>Save Quote, Continue Later</button>
            <button className="btn btn-primary btn-block" type="submit" disabled={appState.data.submitting}>Send Application for signature</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
);

ScheduleDate.propTypes = {
  ...propTypes,
  showScheduleDateModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'ScheduleDate'
})(ScheduleDate));
