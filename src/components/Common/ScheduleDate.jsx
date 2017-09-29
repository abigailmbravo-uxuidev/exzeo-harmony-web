import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';


const ScheduleDate = ({ appState, handleSubmit, verify, showScheduleDateModal }) => (
  <div className="modal schedule-date-modal">
    <div className="survey-wrapper">
      <div className="card card-schedule-date">
        <Form noValidate onSubmit={handleSubmit(verify)}>
          <div className="card-header"><h4><i className="fa fa-envelope" /> Send Application</h4>
          </div>
          <div className="card-block">
            <h3>Congratulations</h3>
            <p>You have successfully completed a TypTap Homeowners Quote.</p>
            <p>With this information, we will generate the Homeowners Application, and e-mail it to the policyholder(s) for electronic signature. You will be copied on this email.</p>
            <p>Once all electronic signatures have been received, the policy will automatically be bound and the policy documents will be emailed to you and to the policyholder.</p>
            <p>NOTE: All signatures must be completed within 10 days, or the application will expire.</p>
            <p>Once you select "SEND", no changes can be made to this quote.</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary" type="button" onClick={() => showScheduleDateModal(false)}>Cancel</button>
            <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Send</button>
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
