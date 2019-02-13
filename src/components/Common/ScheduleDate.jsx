import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import { updateQuote } from '../../actions/quoteState.actions';


const ScheduleDate = ({ isLoading, handleSubmit, verify, secondaryButtonHandler, quoteData, selectedAgent, redirectToHome }) => (
  <div className="modal schedule-date-modal">
    <div className="survey-wrapper">
      <div className="card card-schedule-date">
        <Form noValidate onSubmit={handleSubmit(verify)}>
          <div className="card-header"><h4><i className="fa fa-envelope" /> Send Application</h4>
          </div>
          <div className="card-block">
            <h3>Congratulations</h3>
            <p>You have successfully completed a TypTap Homeowners Quote.</p>
            <p>With this information, we will generate the Homeowners Application, and e-mail it to:</p>
            <ul>
              <li>{`${_.get(quoteData, 'policyHolders[0].firstName')} ${_.get(quoteData, 'policyHolders[0].lastName')} (${_.get(quoteData, 'policyHolders[0].emailAddress')})`}</li>
              {_.has(quoteData, 'policyHolders[1].firstName') && <li>{`${_.get(quoteData, 'policyHolders[1].firstName')} ${_.get(quoteData, 'policyHolders[1].lastName')} (${_.get(quoteData, 'policyHolders[1].emailAddress')})`}</li>}
              <li>A copy will also be sent to you ({selectedAgent.emailAddress})</li>
            </ul>
            <p>Once all electronic signatures have been received, the policy will automatically be bound and the policy documents will be emailed to you and to the policyholder.</p>
            <p>NOTE: All signatures must be completed within 10 days, or the application will expire.</p>
            <p>{'Once you send, no changes can be made to this quote.'}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary btn-block" type="button" onClick={secondaryButtonHandler} disabled={isLoading}>Edit Quote</button>
            <button className="btn btn-secondary btn-block" type="button" onClick={redirectToHome} disabled={isLoading}>Save Quote, Continue Later</button>
            <button className="btn btn-primary btn-block" type="submit" disabled={isLoading} data-test="submit">Send Application for signature</button>
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
      recalc: PropTypes.bool,
      submitting: PropTypes.bool
    })
  })
};


const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  appState: state.appState
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, { updateQuote })(reduxForm({
  form: 'ScheduleDate'
})(ScheduleDate));
