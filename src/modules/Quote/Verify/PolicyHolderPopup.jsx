import React from 'react';
import { Form, Field, Button, Switch } from '@exzeo/core-ui';
import { PolicyHolder } from '@exzeo/core-ui/src/@Harmony';

const PolicyHolderPopup = ({
  initialValues,
  handleFormSubmit,
  handleCancel,
  submitting
}) => {
  return (
    <div className="modal modal-xl" role="article">
      <Form
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        render={({ values, handleSubmit }) => (
          <div className="card card-policyholder slide-in-bottom">
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h4>
                  <i className="fa fa-vcard" />
                  &nbsp;Edit Policyholder(s)
                </h4>
              </div>
              <div className="card-block">
                <PolicyHolder
                  fieldPrefix="policyHolders[0]"
                  title="Primary Policyholder"
                />
                <Field name="additionalPolicyholder">
                  {({ input, meta }) => (
                    <Switch
                      input={input}
                      meta={meta}
                      label="Do you want to add an additional Policyholder?"
                      customClass="switch"
                      dataTest="additionalPolicyholder"
                    />
                  )}
                </Field>
                {values.additionalPolicyholder && (
                  <PolicyHolder
                    fieldPrefix="policyHolders[1]"
                    title="Secondary Policyholder"
                  />
                )}
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
                  type="submit"
                  disabled={submitting}
                  data-test="modal-submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        )}
      />
    </div>
  );
};

export default PolicyHolderPopup;
