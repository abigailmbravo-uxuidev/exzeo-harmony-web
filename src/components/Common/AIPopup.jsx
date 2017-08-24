import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const AdditionalInterestPopup = ({ appState, handleSubmit, primaryButtonHandler, secondaryButtonHandler, selectedAI }) => (
  <div className="ai-modal modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-additional-interest">
          <Form className={'fade-in'} id="DeleteAdditionalInterest" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
            <div className="card-header">
              <h4><i className={'fa AdditionalInterest'} />Delete {selectedAI.type} {selectedAI.order + 1}</h4>
            </div>
            <div className="card-block">
              {`Are you sure you want to delete ${selectedAI.name1}`}
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={secondaryButtonHandler} type="button" disabled={appState.data.submitting}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Delete</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

AdditionalInterestPopup.propTypes = {
  ...propTypes,
  primaryButtonHandler: PropTypes.func,
  secondaryButtonHandler: PropTypes.func
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
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
  form: 'DeleteAdditionalInterest'
})(AdditionalInterestPopup));
