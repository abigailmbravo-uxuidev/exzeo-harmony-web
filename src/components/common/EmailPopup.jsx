/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, {PropTypes} from 'react';
import {reduxForm, Form} from 'redux-form';
import TextField from '../form/inputs/TextField';

let EmailPopup = ({submitting, showEmailPopup, primaryButtonHandler, secondaryButtonHandler, handleSubmit}) => (
  <div className={showEmailPopup === true ? 'email-modal active' : 'email-modal'} role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-email">
          <Form className={'fade-in'} id="SendEmail" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
            <div className="card-header">
              <h4><i className="fa fa-share-alt"/> Share Quote</h4>
            </div>
            <div className="card-block">
              <TextField type="text" name={'name'} value styleName={'name'} label={'Name'} validations={['required']}/>
              <TextField type="text" name={'emailAddr'} styleName={'emailAddress'} label={'Email Address'} validations={['required', 'email']}/>
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={secondaryButtonHandler}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={submitting}>Send Email</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

EmailPopup = reduxForm({
  form: 'ShareEmail' // a unique identifier for this form
})(EmailPopup);

EmailPopup.propTypes = {
  submitting: PropTypes.bool,
  secondaryButtonHandler: PropTypes.func,
  primaryButtonHandler: PropTypes.func,
  handleSubmit: PropTypes.func,
  showEmailPopup: PropTypes.bool
};

export default EmailPopup;
