import React from 'react';
import PolicyHolder from '@exzeo/core-ui/src/@Harmony/Gandalf/@components/PolicyHolder';
import { Button } from '@exzeo/core-ui';

const PolicyHolderPopup = ({ initialValues, handleSubmit, handleCancel, submitting }) => (
  <div className="edit-policyholder-modal modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-policyholder">
          <div className="card-block">
              <PolicyHolder isPrimary fieldPrefix="policyHolders[0]" initialValues={initialValues} title="Primary Policyholder" />
              <PolicyHolder fieldPrefix="policyHolders[1]" watchField="removeSecondary" initialValues={initialValues} title="Secondary Policyholder" />
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
                >Save</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default PolicyHolderPopup;
