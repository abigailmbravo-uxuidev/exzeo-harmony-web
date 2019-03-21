import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Loader, Input, Button, validation } from '@exzeo/core-ui';

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
              <div className="card-header" data-test="modal-header">
                <h4><i className="fa fa-share-alt" /> Share Quote</h4>
              </div>
              <div className="card-block">
                <Field
                  name="name"
                  styleName="text"
                  component={Input}
                  label="Name"
                  validate={validation.isRequired}
                  dataTest="name"
                />

                <Field
                  name="emailAddr"
                  styleName="text"
                  component={Input}
                  label="Email Address"
                  validate={[validation.isRequired, validation.isEmail]}
                  dataTest="emailAddr"
                />

              </div>
              <div className="card-footer">
                <Button
                  className={Button.constants.classNames.secondary}
                  onClick={handleCancel}
                  data-test="modal-cancel"
                >Cancel</Button>
                <Button
                  className={Button.constants.classNames.primary}
                  onClick={handleSubmit}
                  disabled={submitting}
                  data-test="modal-submit"
                >Send Email</Button>
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
