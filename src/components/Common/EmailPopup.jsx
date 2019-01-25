import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import { updateQuote } from '../../actions/quoteState.actions';

const EmailPopup = ({ submitting, handleSubmit, primaryButtonHandler, secondaryButtonHandler }) => (
  <div className="email-modal modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-email">
          <Form className={'fade-in'} id="SendEmail" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
            <div className="card-header">
              <h4><i className="fa fa-share-alt" /> Share Quote</h4>
            </div>
            <div className="card-block">
              <TextField autoFocus type="text" name={'name'} value styleName={'name'} label={'Name'} validations={['required']} />
              <TextField type="text" name={'emailAddr'} styleName={'emailAddress'} label={'Email Address'} validations={['required', 'email']} />
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={secondaryButtonHandler} data-test="cancel_email" type="button">Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={submitting} data-test="submit_email">Send Email</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

EmailPopup.propTypes = {
  ...propTypes,
  primaryButtonHandler: PropTypes.func,
  secondaryButtonHandler: PropTypes.func
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quote: state.quoteState.quote
});

export default connect(mapStateToProps, { updateQuote })(reduxForm({
  form: 'SendEmail'
})(EmailPopup));
