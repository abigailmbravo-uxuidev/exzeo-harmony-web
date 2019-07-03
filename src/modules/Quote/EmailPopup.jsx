import React from 'react';
import PropTypes from 'prop-types';
import {
  Loader,
  Input,
  Button,
  validation,
  Form,
  Field,
  composeValidators
} from '@exzeo/core-ui';

const EmailPopup = ({ onSubmit, handleCancel }) => (
  <div className="email-modal modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="card card-email">
                {submitting && <Loader />}
                <div className="fade-in" id="SendEmail">
                  <div className="card-header" data-test="modal-header">
                    <h4>
                      <i className="fa fa-share-alt" /> Share Quote
                    </h4>
                  </div>
                  <div className="card-block">
                    <Field
                      name="toName"
                      styleName="text"
                      component={Input}
                      label="Name"
                      validate={composeValidators([
                        validation.isRequired,
                        validation.isValidNameFormat
                      ])}
                      dataTest="name"
                    />

                    <Field
                      name="toEmail"
                      styleName="text"
                      component={Input}
                      label="Email Address"
                      validate={composeValidators([
                        validation.isRequired,
                        validation.isEmail
                      ])}
                      dataTest="email"
                    />
                  </div>
                  <div className="card-footer">
                    <Button
                      className={Button.constants.classNames.secondary}
                      onClick={handleCancel}
                      data-test="modal-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      className={Button.constants.classNames.primary}
                      onClick={handleSubmit}
                      disabled={submitting}
                      data-test="modal-submit"
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  </div>
);

EmailPopup.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default EmailPopup;
