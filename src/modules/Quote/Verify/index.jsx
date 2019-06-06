import React from 'react';
import { Button, ModalPortal } from '@exzeo/core-ui';

import { STEP_NAMES } from '../constants/workflowNavigation';

import PolicyHolderDetails from './PolicyHolderDetails';
import AddressDetails from './AddressDetails';
import AdditionalInterestDetails from './AdditionalInterestDetails';
import PolicyHolderPopup from './PolicyHolderPopup';
import ScheduleDate from './ScheduleDate';
import QuoteDetails from './QuoteDetails';
import PropertyDetails from './PropertyDetails';
import DetailGroup from './DetailGroup';

export class Verify extends React.Component {
  state = {
    submitting: false,
    confirmProperty: false,
    confirmQuote: false,
    confirmPolicy: false,
    confirmAdditionalInterest: false,
    showPolicyHolderEditPopup: false,
    showApplicationPopup: false,
  };

  sendApplicationSubmit = async () => {
    const { customHandlers } = this.props;
    await customHandlers.handleSubmit({ shouldSendApplication: true });
  };

  handlePolicyHolderSubmit = async (childFormValues) => {
    const { initialValues, customHandlers } = this.props;

    const data = { ...initialValues, ...childFormValues };
    await customHandlers.handleSubmit({ remainOnStep: true, ...data });

    this.setPolicyHolderEditPopup(false);
  };

  redirectToHome = () => {
    this.props.customHandlers.history.replace('/');
  };

  setConfirmation = (name, value) => {
    this.setState({ [name]: value });
  };

  setPolicyHolderEditPopup = (value) => {
    this.setState(() => ({ showPolicyHolderEditPopup: value}));
  };


  closeScheduleDatePopup = () => {
    this.setState(() => ({
      confirmProperty: false,
      confirmQuote: false,
      confirmPolicy: false,
      confirmAdditionalInterest: false,
      showSendApplicationPopup: false,
    }));

  };

  render() {
    const {
      initialValues,
      formInstance,
      config,
      options,
      customHandlers,
    } = this.props;

    const {
      // submitting,
      showPolicyHolderEditPopup,
      showSendApplicationPopup,
      confirmProperty,
      confirmQuote,
      confirmPolicy,
      confirmAdditionalInterest
    } = this.state;

    const { productDescription, companyName, details } = config.extendedProperties;
    const { goToStep } = customHandlers;
    const { property, policyHolders, policyHolderMailingAddress, additionalInterests } = initialValues;
    const { submitting } = formInstance.getState();
    const submitDisabled = !(confirmProperty && confirmQuote && confirmPolicy && confirmAdditionalInterest && !submitting);
    const selectedAgent = (options.agents || []).find(agent => agent.answer === initialValues.agentCode) || {};

    return (
      <div className="verify">
        <DetailGroup
          header="Property Details"
          detailClass="property-details"
          switchName="confirmProperty"
          switchValue={confirmProperty}
          switchOnChange={(value) => this.setConfirmation('confirmProperty', value)}
          handleEditClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)} >
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
          switchOnChange={(value) => this.setConfirmation('confirmQuote', value)}
          handleEditClick={() => goToStep(STEP_NAMES.askToCustomizeDefaultQuote)} >
          <QuoteDetails
            details={details}
            formValues={initialValues}
          />
        </DetailGroup>

        <DetailGroup
          icon="fa fa-vcard-o"
          header="Policyholder Details"
          detailClass="policyholder-details"
          handleEditClick={() => this.setPolicyHolderEditPopup(true)} >
          <PolicyHolderDetails policyHolders={policyHolders} />
        </DetailGroup>
        <DetailGroup
          icon="fa fa-envelope"
          header="Mailing Address"
          detailClass="mailing-address-details"
          switchName="confirmPolicy"
          switchValue={confirmPolicy}
          switchOnChange={(value) => this.setConfirmation('confirmPolicy', value)}
          handleEditClick={() => goToStep(STEP_NAMES.askAdditionalQuestions)} >
          <AddressDetails address={policyHolderMailingAddress} />
        </DetailGroup>

        <DetailGroup
          icon="fa fa-user-plus"
          header="Additional Parties"
          detailClass="additional-interests-details"
          switchName="confirmAdditionalInterest"
          switchValue={confirmAdditionalInterest}
          switchOnChange={(value) => this.setConfirmation('confirmAdditionalInterest', value)}
          handleEditClick={() => goToStep(STEP_NAMES.addAdditionalAIs)} >
            <AdditionalInterestDetails additionalInterests={additionalInterests} />
        </DetailGroup>

        <div className="workflow-steps">
          <Button
            className={Button.constants.classNames.primary}
            onClick={() => this.setState({ showSendApplicationPopup: true })}
            disabled={submitDisabled}
            data-test="next"
          >next</Button>
        </div>
         {showSendApplicationPopup &&
            <ScheduleDate
              selectedAgent={selectedAgent}
              submitting={submitting}
              entity={initialValues}
              productDescription={productDescription}
              companyName={companyName}
              handleSubmit={this.sendApplicationSubmit}
              redirectToHome={this.redirectToHome}
              handleCancel={this.closeScheduleDatePopup}
            />
         }
         {showPolicyHolderEditPopup &&
           <ModalPortal>
            <PolicyHolderPopup
              submitting={submitting}
              handleFormSubmit={this.handlePolicyHolderSubmit}
              handleCancel={() => this.setPolicyHolderEditPopup(false)}
              initialValues={{
                policyHolders: initialValues.policyHolders,
                additionalPolicyholder: initialValues.policyHolders.length > 1
              }}
            />
           </ModalPortal>
         }
       </div>
    );
  }
}

Verify.defaultProps = {
  submitting: false,
  quote: {},
  customHandlers: {},
  agents: []
};

export default Verify;
