import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ModalPortal, useForm } from '@exzeo/core-ui';
import { STEP_NAMES } from '../constants/workflowNavigation';
import PolicyHolderDetails from './PolicyHolderDetails';
import AddressDetails from './AddressDetails';
import AdditionalInterestDetails from './AdditionalInterestDetails';
import PolicyHolderPopup from './PolicyHolderPopup';
import ScheduleDate from './ScheduleDate';
import QuoteDetails from './QuoteDetails';
import PropertyDetails from './PropertyDetails';
import DetailGroup from './DetailGroup';
import { useQuoteWorkflow } from '../context';

const Verify = ({
  initialValues,
  options,
  productDescription,
  companyName,
  details
}) => {
  const history = useHistory();
  const { goToStep, handleSubmit } = useQuoteWorkflow();

  const {
    property,
    policyHolders,
    policyHolderMailingAddress,
    additionalInterests
  } = initialValues;

  const [confirmProperty, setConfirmProperty] = useState(false);
  const [confirmQuote, setConfirmQuote] = useState(false);
  const [confirmPolicy, setConfirmPolicy] = useState(false);
  const [confirmAdditionalInterest, setConfirmAdditionalInterest] = useState(
    false
  );
  const [showPolicyHolderEditPopup, setShowPolicyHolderEditPopup] = useState(
    false
  );
  const [showApplicationPopup, setShowApplicationPopup] = useState(false);

  const formApi = useForm();
  const { submitting } = formApi.getState();

  const sendApplicationSubmit = async () => {
    await handleSubmit({
      ...initialValues,
      shouldSendApplication: true
    });
  };

  const handlePolicyHolderSubmit = async modalFormValues => {
    const data = {
      ...initialValues,
      additionalPolicyholder: modalFormValues.additionalPolicyholder,
      policyHolders: [...modalFormValues.policyHolders]
    };

    await handleSubmit({ remainOnStep: true, ...data });
    setShowPolicyHolderEditPopup(false);
  };

  const redirectToHome = () => {
    history.replace('/');
  };

  const closeScheduleDatePopup = () => {
    setConfirmProperty(false);
    setConfirmPolicy(false);
    setConfirmQuote(false);
    setConfirmAdditionalInterest(false);
    setShowApplicationPopup(false);
  };

  const submitDisabled = !(
    confirmProperty &&
    confirmQuote &&
    confirmPolicy &&
    confirmAdditionalInterest &&
    !submitting
  );

  const selectedAgent =
    (options.agents || []).find(
      agent => agent.answer === initialValues.agentCode
    ) || {};

  return (
    <div className="verify">
      <DetailGroup
        header="Property Details"
        detailClass="property-details"
        switchName="confirmProperty"
        switchValue={confirmProperty}
        switchOnChange={value => setConfirmProperty(value)}
        handleEditClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)}
      >
        <PropertyDetails
          quoteNumber={initialValues.quoteNumber}
          effectiveDate={initialValues.effectiveDate}
          property={property}
          selectedAgent={selectedAgent}
        />
      </DetailGroup>

      <DetailGroup
        icon="fa fa-list"
        header="Quote Details"
        detailClass="quote-details"
        switchName="confirmQuote"
        switchValue={confirmQuote}
        switchOnChange={value => setConfirmQuote(value)}
        handleEditClick={() => goToStep(STEP_NAMES.askToCustomizeDefaultQuote)}
      >
        <QuoteDetails details={details} formValues={initialValues} />
      </DetailGroup>

      <DetailGroup
        icon="fa fa-vcard-o"
        header="Policyholder Details"
        detailClass="policyholder-details"
        handleEditClick={() => setShowPolicyHolderEditPopup(true)}
      >
        <PolicyHolderDetails policyHolders={policyHolders} />
      </DetailGroup>
      <DetailGroup
        icon="fa fa-envelope"
        header="Mailing Address"
        detailClass="mailing-address-details"
        switchName="confirmPolicy"
        switchValue={confirmPolicy}
        switchOnChange={value => setConfirmPolicy(value)}
        handleEditClick={() => goToStep(STEP_NAMES.askAdditionalQuestions)}
      >
        <AddressDetails address={policyHolderMailingAddress} />
      </DetailGroup>

      <DetailGroup
        icon="fa fa-user-plus"
        header="Additional Parties"
        dataTest="additional-interests"
        detailClass="additional-interests-details"
        switchName="confirmAdditionalInterest"
        switchValue={confirmAdditionalInterest}
        switchOnChange={value => setConfirmAdditionalInterest(value)}
        handleEditClick={() => goToStep(STEP_NAMES.addAdditionalAIs)}
      >
        <AdditionalInterestDetails additionalInterests={additionalInterests} />
      </DetailGroup>

      <div className="workflow-steps">
        <Button
          className={Button.constants.classNames.primary}
          onClick={() => setShowApplicationPopup(true)}
          disabled={submitDisabled}
          data-test="next"
        >
          next
        </Button>
      </div>
      {showApplicationPopup && (
        <ScheduleDate
          selectedAgent={selectedAgent}
          submitting={submitting}
          entity={initialValues}
          productDescription={productDescription}
          companyName={companyName}
          handleSubmit={sendApplicationSubmit}
          redirectToHome={redirectToHome}
          handleCancel={closeScheduleDatePopup}
        />
      )}
      {showPolicyHolderEditPopup && (
        <ModalPortal>
          <PolicyHolderPopup
            submitting={submitting}
            handleFormSubmit={handlePolicyHolderSubmit}
            handleCancel={() => setShowPolicyHolderEditPopup(false)}
            initialValues={{
              policyHolders: initialValues.policyHolders,
              additionalPolicyholder: initialValues.policyHolders.length > 1
            }}
          />
        </ModalPortal>
      )}
    </div>
  );
};

Verify.defaultProps = {
  initialValues: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default Verify;
