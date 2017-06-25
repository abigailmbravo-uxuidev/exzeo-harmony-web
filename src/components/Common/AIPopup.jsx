import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import FieldGenerator from '../Form/FieldGenerator';

const AdditionalInterestPopup = ({ submitting, handleSubmit, primaryButtonHandler, secondaryButtonHandler, questions, quoteData, fieldValues, headerName }) => (
  <div className="ai-modal" role="article">

    <div className="card card-additional-interest">
      <Form className={'fade-in'} id="AddAdditionalInterest" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
        <div className="card-header">
          <h4><i className={`fa ${headerName}`} />{headerName}</h4>
        </div>
        <div className="card-block">
          {questions && questions && questions.map((question, index) =>
            <FieldGenerator data={quoteData} question={question} values={fieldValues} key={index} />)}
        </div>
        <div className="card-footer">
          <button className="btn btn-secondary" onClick={secondaryButtonHandler} type="button">Cancel</button>
          <button className="btn btn-primary" type="submit" disabled={submitting}>Save &amp; Add</button>
        </div>
      </Form>
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
  form: 'AdditionalInterestPopup'
})(AdditionalInterestPopup));
