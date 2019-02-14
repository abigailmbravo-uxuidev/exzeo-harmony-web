import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import { Loader } from '@exzeo/core-ui/src';

const EmailPopup = ({
  submitting,
  handleSubmit,
  handleCancel,
}) => (
    <div className="email-modal modal active" role="article">
      <div className="survey-wrapper">
        <div className="contact-message">
          <div className="card card-email">
            {submitting &&
              <Loader />
            }
            <div className="fade-in" id="SendEmail">
              <div className="card-header">
                <h4><i className="fa fa-share-alt" /> Share Quote</h4>
              </div>
              <div className="card-block">
                <TextField autoFocus type="text" name="name" value styleName="name" label="Name" validations={['required']} />
                <TextField type="text" name="emailAddr" styleName="emailAddress" label="Email Address" validations={['required', 'email']} />
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  data-test="cancel"
                >Cancel</button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  data-test="submit"
                >Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

EmailPopup.propTypes = {
  primaryButtonHandler: PropTypes.func,
  secondaryButtonHandler: PropTypes.func
};

export default reduxForm({
  form: 'SendEmail'
})(EmailPopup);
