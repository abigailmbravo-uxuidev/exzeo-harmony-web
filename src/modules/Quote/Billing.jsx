import React, { useState } from 'react';
import {
  OnChangeListener,
  Modal,
  ModalPortal,
  Button,
  useField,
  useForm
} from '@exzeo/core-ui';
import {
  Billing as BillingSection,
  AdditionalInterestForm,
  AI_TYPES
} from '@exzeo/core-ui/src/@Harmony';
import { useQuoteWorkflow } from './context';

const TEMP_BILL_PAYER_VALUE = 'temp_bill_payer';

const Billing = ({ initialValues }) => {
  const [showBillPayerModal, setShowBillPayerModal] = useState(false);
  const { handleSubmit } = useQuoteWorkflow();
  const formInstance = useForm();
  const billToIdField = useField('billToId');

  const handleSubmitBillPayer = async billPayer => {
    const { values: formValues } = formInstance.getState();
    const submitValues = {
      ...formValues,
      additionalInterests: [...formValues.additionalInterests, billPayer]
    };
    await handleSubmit({ remainOnStep: true, ...submitValues });
    setShowBillPayerModal(false);
  };

  const handleCancelBillPayer = () => {
    billToIdField.input.onChange('');
    setShowBillPayerModal(false);
  };

  const additionalBillToOptions = initialValues.additionalInterests.some(
    ai => ai.type === AI_TYPES.billPayer || ai.type === AI_TYPES.premiumFinance
  )
    ? []
    : [{ answer: TEMP_BILL_PAYER_VALUE, label: 'Bill Payer' }];

  return (
    <React.Fragment>
      <BillingSection
        initialValues={initialValues}
        additionalBillToOptions={additionalBillToOptions}
      />
      <OnChangeListener name="billToId">
        {value => {
          if (value === TEMP_BILL_PAYER_VALUE) {
            setShowBillPayerModal(true);
          }
        }}
      </OnChangeListener>
      {showBillPayerModal && (
        <ModalPortal>
          <Modal
            size={Modal.sizes.xlarge}
            className="AdditionalInterestModal billPayer"
            header={
              <h4>
                <i className="fa Bill Payer" />
                &nbsp;Other Bill Payer
              </h4>
            }
          >
            <div className="other-bill-payer-header">
              <p>
                {`If bill needs to go to somewhere other than the policyholder or
                an additional interest, please enter address information. Please
                be aware that this person is not added to the policy, this is
                just a person/location the bill will be sent to.`}
              </p>
            </div>
            <AdditionalInterestForm
              type="Bill Payer"
              handleFormSubmit={handleSubmitBillPayer}
            >
              {({ submitting }) => (
                <div className="card-footer">
                  <div className="btn-group">
                    <Button
                      className={Button.constants.classNames.secondary}
                      label="cancel"
                      onClick={handleCancelBillPayer}
                      data-test="ai-modal-cancel"
                    />

                    <Button
                      className={Button.constants.classNames.primary}
                      label="save"
                      disabled={submitting}
                      type="submit"
                      data-test="ai-modal-submit"
                    />
                  </div>
                </div>
              )}
            </AdditionalInterestForm>
          </Modal>
        </ModalPortal>
      )}
    </React.Fragment>
  );
};

export default Billing;
