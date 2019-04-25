import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Button, Switch, normalize, noop } from '@exzeo/core-ui';


import { STEP_NAMES } from '../constants/workflowNavigation';

import PolicyHolderDetails from './PolicyHolderDetails';
import AddressDetails from './AddressDetails';
import AdditionalInterestDetails from './AdditionalInterestDetails';
import PolicyHolderPopup from './PolicyHolderPopup';
import ScheduleDate from './ScheduleDate';
import QuoteDetails from './QuoteDetails';
import PropertyDetails from './PropertyDetails';

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
        <div className="detail-group property-details">
          <h3 className="section-group-header">
            <i className="fa fa-map-marker" /> Property Details
            <span id="askAdditionalCustomerData" className="edit-btn" onClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)}>
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <PropertyDetails quoteNumber={quote.quoteNumber} effectiveDate={quote.effectiveDate} property={property} selectedAgent={selectedAgent} />
          <Switch 
          input={{
            name: 'confirmPropertyDetails',
            value: this.state.confirmPropertyDetails,
            onChange: (value) => this.setConfirmPropertyDetails(value),
            onFocus: noop,
            onBlur: noop,
          }}
          styleName="switch"
          customClass="verification"
          label="Verified" 
            />
        </div>
        <div className="detail-group quote-details">
          <h3 className="section-group-header">
            <i className="fa fa-list" /> Quote Details
            <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.askToCustomizeDefaultQuote)}>
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <QuoteDetails details={details} formValues={quote} />
          <Switch 
            input={{
              name: 'confirmQuoteDetails',
              value: this.state.confirmQuoteDetails,
              onChange: (value) => this.setConfirmQuoteDetails(value),
              onFocus: noop,
              onBlur: noop,
            }}
            styleName="switch"
            customClass="verification"
            label="Verified"
             />
        </div>
        <div className="detail-group policyholder-details">
          <h3 className="section-group-header">
            <i className="fa fa-vcard-o" /> Policyholder Details
            <span className="edit-btn" onClick={() => this.setPolicyHolderEditPopup(true)} data-test="edit-policyholder">
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <PolicyHolderDetails policyHolders={policyHolders} />
        </div>
        <div className="detail-group mailing-address-details">
          <h3 className="section-group-header">
            <i className="fa fa-envelope" /> Mailing Address
            <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.askAdditionalQuestions)}>
              <i className="fa fa-pencil" /> Edit
            </span>
          </h3>
          <AddressDetails address={policyHolderMailingAddress} />
          <Switch 
            input={{
              name: 'confirmPolicyHolderDetails',
              value: this.state.confirmPolicyHolderDetails,
              onChange: (value) => this.setConfirmPolicyHolderDetails(value),
              onFocus: noop,
              onBlur: noop,
            }}
            styleName="switch"
            customClass="verification"
            label="Verified"
             />
        </div>
        <div className="detail-group additional-interests-details">
            <h3 className="section-group-header">
              <i className="fa fa-user-plus" /> Additional Parties
              <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.addAdditionalAIs)}>
                <i className="fa fa-pencil" /> Edit
              </span>
            </h3>
            <AdditionalInterestDetails additionalInterests={additionalInterests} />
            <Switch 
            input={{
              name: 'confirmAdditionalInterestsDetails',
              value: this.state.confirmAdditionalInterestsDetails,
              onChange: (value) => this.setConfirmAdditionalInterestsDetails(value),
              onFocus: noop,
              onBlur: noop,
            }}
            styleName="switch"
            customClass="verification"
            label="Verified"
             />
          </div>
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
