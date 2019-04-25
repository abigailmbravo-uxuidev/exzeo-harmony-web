import React from 'react';
import { connect } from 'react-redux';
import { Button, Switch, noop } from '@exzeo/core-ui';


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
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      confirmPropertyDetails: false,
      confirmQuoteDetails: false,
      confirmPolicyHolderDetails: false,
      confirmAdditionalInterestsDetails: false,
      showPolicyHolderEditPopup: false
    };
  }

  sendApplicationSubmit = async (data) => {
    const { customHandlers } = this.props;
    this.setState(() => ({ submitting: true }));
    await customHandlers.handleSubmit({ shouldSendApplication: true, ...data });
    customHandlers.setShowSendApplicationPopup(false);
    customHandlers.history.replace('thankYou');
  };

  handlePolicyHolderSubmit = async () => {
    const { formValues } = this.props;
    const { customHandlers } = this.props;
    this.setState(() => ({ submitting: true }));
    if(formValues.removeSecondary && formValues.policyHolders.length > 1){
      formValues.policyHolders.pop();
    }
    await customHandlers.handleSubmit({ remainOnStep: true, ...formValues });
    this.setState(() => ({ submitting: false }));
    this.setPolicyHolderEditPopup(false);
  };

  redirectToHome = () => {
    this.props.customHandlers.history.replace('/');
  };

  setConfirmPropertyDetails = (value) => {
    this.setState(() => ({ confirmPropertyDetails: value}))
    return value;
  }

  setConfirmQuoteDetails = (value) => {
    this.setState(() => ({ confirmQuoteDetails: value}))
    return value;
  }

  setConfirmPolicyHolderDetails = (value) => {
    this.setState(() => ({ confirmPolicyHolderDetails: value}))
    return value;
  }

  setConfirmAdditionalInterestsDetails = (value) => {
    this.setState(() => ({ confirmAdditionalInterestsDetails: value}))
    return value;
  }

  setPolicyHolderEditPopup = (value) => {
    this.setState(() => ({ showPolicyHolderEditPopup: value}))
    return value;
  }
  

  closeScheduleDatePopup = () => {
    const { customHandlers } = this.props;
    customHandlers.setShowSendApplicationPopup(false);
    this.setState(() => ({       
      confirmPropertyDetails: false,
      confirmQuoteDetails: false,
      confirmPolicyHolderDetails: false,
      confirmAdditionalInterestsDetails: false
    }))

  }

  render() {
    const {
      quote,
      initialValues,
      config,
      agents,
      customHandlers: {
        goToStep,
        setShowSendApplicationPopup,
        getState,
      },
    } = this.props;

    const { submitting, showPolicyHolderEditPopup} = this.state;
    const { showSendApplicationPopup } = getState();
    const {productDescription, companyName, details } = config.extendedProperties;
    const { property, policyHolders, policyHolderMailingAddress, additionalInterests } = quote;
    const selectedAgent = agents.find(agent => agent.agentCode === quote.agentCode) || {};
    return (
      <React.Fragment>
        <div className="verify">
        <DetailGroup
          header="Property Details"
          detailClass="property-details"
          switchName="confirmPropertyDetails"
          switchValue={this.state.confirmPropertyDetails}
          switchOnChange={this.setConfirmPropertyDetails}
          handleEditClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)} >
          <PropertyDetails quoteNumber={quote.quoteNumber} effectiveDate={quote.effectiveDate} property={property} selectedAgent={selectedAgent} />
        </DetailGroup>
        <DetailGroup
          header="Quote Details"
          detailClass="quote-details"
          switchName="confirmPropertyDetails"
          switchValue={this.state.confirmQuoteDetails}
          switchOnChange={this.setConfirmQuoteDetails}
          handleEditClick={() => goToStep(STEP_NAMES.askToCustomizeDefaultQuote)} >
          <QuoteDetails details={details} formValues={quote} />
        </DetailGroup>
        <DetailGroup
          header="Policyholder Details"
          detailClass="policyholder-details"
          switchName="confirmPolicyHolderDetails"
          switchValue={this.state.confirmPolicyHolderDetails}
          switchOnChange={this.setConfirmPolicyHolderDetails}
          handleEditClick={() => this.setPolicyHolderEditPopup(true)} >
          <PolicyHolderDetails policyHolders={policyHolders} />
        </DetailGroup>
        <DetailGroup
          header="Mailing Address"
          detailClass="mailing-address-details"
          handleEditClick={() => goToStep(STEP_NAMES.askAdditionalQuestions)} >
          <AddressDetails address={policyHolderMailingAddress} />
        </DetailGroup>
        <DetailGroup
          header="Additional Parties"
          detailClass=" additional-interests-details"
          switchName="confirmPropertyDetails"
          switchValue={this.state.confirmAdditionalInterestsDetails}
          switchOnChange={this.setConfirmAdditionalInterestsDetails}
          handleEditClick={() => goToStep(STEP_NAMES.addAdditionalAIs)} >
            <AdditionalInterestDetails additionalInterests={additionalInterests} />
        </DetailGroup>
        <div className="workflow-steps">
          <Button
            className={Button.constants.classNames.primary}
            onClick={setShowSendApplicationPopup}
              disabled={!this.state.confirmPropertyDetails || !this.state.confirmQuoteDetails ||
              !this.state.confirmPolicyHolderDetails ||
              !this.state.confirmAdditionalInterestsDetails || submitting}
            data-test="next"
          >next</Button>
        </div>
         {showSendApplicationPopup &&
          <ScheduleDate
            selectedAgent={selectedAgent}
            submitting={submitting}
            entity={quote}
            productDescription={productDescription}
            companyName={companyName}
            handleSubmit={this.sendApplicationSubmit}
            redirectToHome={this.redirectToHome}
            handleCancel={this.closeScheduleDatePopup}
          />
         }
         {showPolicyHolderEditPopup &&
          <PolicyHolderPopup
            submitting={submitting}
            handleSubmit={this.handlePolicyHolderSubmit}
            handleCancel={() => this.setPolicyHolderEditPopup(false)}
            config={config}
            initialValues={initialValues}
          />
         }
         </div>
      </React.Fragment>
    );
  }
}

Verify.defaultProps = {
  submitting: false,
  quote: {},
  customHandlers: {},
  agents: []
};

const mapStateToProps = state => ({
  agents: state.agencyState.agents,
  quote: state.quoteState.quote
});

export default connect(mapStateToProps)(Verify);
