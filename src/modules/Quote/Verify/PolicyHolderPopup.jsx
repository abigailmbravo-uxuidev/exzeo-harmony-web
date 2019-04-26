import React from 'react';
import {Form} from '@exzeo/core-ui';
import PolicyHolder from '@exzeo/core-ui/src/@Harmony/Gandalf/@components/PolicyHolder';
import {Button} from '@exzeo/core-ui';

const PolicyHolderPopup = ({formValues, handleFormSubmit, handleCancel, submitting}) => {
  return (
    <div className="edit-policyholder-modal modal active" role="article">
      <div className="survey-wrapper">
        <Form
          onSubmit={handleFormSubmit}
          initialValues={formValues}
          render={({values, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <div className="contact-message">
                <div className="card card-policyholder">

                  <React.Fragment>
                    <div className="card-block">
                      <PolicyHolder
                        isPrimary
                        fieldPrefix="policyHolders[0]"
                        formValues={values}
                        title="Primary Policyholder"
                      />
                      <PolicyHolder
                        fieldPrefix="policyHolders[1]"
                        watchField="removeSecondary"
                        formValues={values}
                        title="Secondary Policyholder"
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
                        type="submit"
                        disabled={submitting}
                        data-test="modal-submit"
                      >Save</Button>
                    </div>
                  </React.Fragment>

                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};


export default PolicyHolderPopup;
