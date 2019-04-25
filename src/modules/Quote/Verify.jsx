import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Button, Switch, normalize, noop } from '@exzeo/core-ui';

import ScheduleDate from './ScheduleDate';
import QuoteDetails from './QuoteDetails';
import PropertyDetails from './PropertyDetails';

import { STEP_NAMES } from './constants/workflowNavigation';
import PolicyHolderDetails from './PolicyHolderDetails';
import AddressDetails from './AddressDetails';
import AdditionalInterestDetails from './AdditionalInterestDetails';

export class Verify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      confirmPropertyDetails: false,
      confirmQuoteDetails: false,
      confirmPolicyHolderDetails: false,
      confirmAdditionalInterestsDetails: false
    };
  }

  sendApplicationSubmit = async (data) => {
    const { customHandlers } = this.props;
    this.setState(() => ({ submitting: true }));
    await customHandlers.handleSubmit({ shouldSendApplication: true, ...data });
    customHandlers.setShowSendApplicationPopup(false);
    customHandlers.history.replace('thankYou');
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
      formValues,
      config,
      agents,
      customHandlers: {
        goToStep,
        setShowSendApplicationPopup,
        getState,
      },
    } = this.props;

    const { submitting } = this.state;
    const { showSendApplicationPopup } = getState();
    const {productDescription, companyName, quoteDetails } = config.extendedProperties;
    const { property, policyHolders, policyHolderMailingAddress, additionalInterests } = formValues;
    const selectedAgent = agents.find(agent => agent.agentCode === formValues.agentCode) || {};
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
          <PropertyDetails quoteNumber={formValues.quoteNumber} effectiveDate={formValues.effectiveDate} property={property} selectedAgent={selectedAgent} />
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
          <QuoteDetails quoteDetails={quoteDetails} formValues={formValues} />
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
            <span className="edit-btn" onClick={() => goToStep(STEP_NAMES.askAdditionalCustomerData)} data-test="edit-policyholder">
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
            entity={formValues}
            productDescription={productDescription}
            companyName={companyName}
            handleSubmit={this.sendApplicationSubmit}
            redirectToHome={this.redirectToHome}
            handleCancel={this.closeScheduleDatePopup}
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
});

export default connect(mapStateToProps)(Verify);
