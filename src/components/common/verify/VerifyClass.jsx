import React, { PropTypes, Component } from 'react';
// import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector, Field, change } from 'redux-form';
import moment from 'moment';
import Footer from '../Footer';
import BoolInput from '../form/BoolInput';
import quoteTest from './quoteTest';
import TextInput from '../form/TextInput';
import EffectiveDateForm from '../EffectiveDate/EffectiveDateForm';
import PolicyHolderUpdateForm from '../policyHolder/PolicyHolderUpdateForm';
import AdditionalInterestUpdateForm from '../AdditionalInterests/AdditionalInterestUpdateForm';
import MailingAddressForm from '../MailingAddress/MailingAddressForm';

class Verify extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  componentWillMount() {

  }

  handleChange = (event) => {
    // const { state } = this;
    // state[event.target.name] = event.target.value;
    // state.updated = true;
    // this.setState(state);
  }

  updateQuote() {
    this.props.dispatch(change('Verify', 'editProperty', false));
    this.props.dispatch(change('Verify', 'editConfirmPolicyHolder', false));
    this.props.dispatch(change('Verify', 'editMailingAddress', false));
    this.props.dispatch(change('Verify', 'editConfirmAdditionalInterests', false));
    // Object.assign({}, state, { whatever: action.value });
    alert('quote updated');
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    this.context.router.push('/workflow/verify');
    // const { state } = this;
    // if (state.updated) {
    //   // Do two mutations
    //   state.updated = false;
    //   this.setState(state);
    // } else {
    //   this.context.router.push('/workflow/shareQuote');
    // }
  }

  render() {
    const {
      handleSubmit,
      dispatch,
      initialValues,
      quote,
      state,
      styleName,
      effectiveDate,
      editConfirmAdditionalInterests,
      editConfirmPolicyHolder,
      editProperty,
      editMailingAddress,
      confirmProperyDetails,
      confirmQuoteDetails,
      confirmPolicyHolderDetails,
      confirmAdditionalInterestsDetails,
      pristine,
      reset,
      submitting,
      error,
      invalid,
    } = this.props;

    const property = quoteTest.property;
    const coverageLimits = quoteTest.coverageLimits;
    const mailingAddress = quoteTest.policyHolderMailingAddress;

    const policyHolder1 = quoteTest.policyHolders.length > 0 ? quoteTest.policyHolders[0] : [];
    const policyHolder2 = quoteTest.policyHolders.length > 1 ? quoteTest.policyHolders[1] : [];

    initialValues.effectiveDate = moment(quoteTest.effectiveDate).format('YYYY-MM-DD');

    initialValues.additionalInterests = quoteTest.additionalInterests;
    initialValues.policyHolders = quoteTest.policyHolders;
    initialValues.policyHolderMailingAddress = quoteTest.policyHolderMailingAddress;

    return (
      <div className="detail-content-wrapper route-verify">
        <div className="detail-wrapper">
          {!editProperty && <div className="detail-group property-details">
            <h4 className="section-group-header"><i className="fa fa-map-marker" /> Property Details</h4>
            {!confirmProperyDetails && <div>
              <label className="btn btn-link edit-btn" htmlFor="editProperty">
                <i className="fa fa-pencil" />
                    Edit
                  </label>
              <Field
                name="editProperty" id="editProperty" component="input" type="checkbox" style={{
                  display: 'none',
                }}
              />
            </div>}
            <section className="display-element">
              <dl className="quote-number">
                <div>
                  <dt>Quote Number</dt>
                  <dd>{quoteTest.quoteNumber}</dd>
                </div>
              </dl>
              <dl className="property-information">
                <div>
                  <dt>Property Address</dt>
                  <dd>{property.physicalAddress.address1}</dd>
                  <dd>{property.physicalAddress.address2}</dd>
                  <dd>{`${property.physicalAddress.city}, ${property.physicalAddress.state} ${
                        property.physicalAddress.zip}`}</dd>
                  <dt>Year Built</dt>
                  <dd>{property.yearBuilt}</dd>
                  <dt>Flood Zone</dt>
                  <dd>{property.protectionClass}</dd>
                </div>
              </dl>
              <dl className="effective-date">
                <div>
                  <dt>Effective Date</dt>
                  <dd>{moment(quoteTest.effectiveDate).format('MM/DD/YYYY')}</dd>
                </div>
              </dl>
            </section>
            <BoolInput styleName="verification" disabled={editProperty} name={'confirmProperyDetails'} question={'Verified'} handleChange={function () {}} value={false} isSwitch />
          </div>}
          {editProperty && <div className="detail-group property-details edit">
            <h4 className="section-group-header"><i className="fa fa-map-marker" /> Property Details</h4>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <dl className="quote-number">
                <div>
                  <dt>Quote Number</dt>
                  <dd>{quoteTest.quoteNumber}</dd>
                </div>
              </dl>
              <dl className="property-information">
                <div>
                  <dt>Property Address</dt>
                  <dd>{property.physicalAddress.address1}</dd>
                  <dd>{property.physicalAddress.address2}</dd>
                  <dd>{`${property.physicalAddress.city}, ${property.physicalAddress.state} ${
                        property.physicalAddress.zip}`}</dd>
                  <dt>Year Built</dt>
                  <dd>{property.yearBuilt}</dd>
                  <dt>Flood Zone</dt>
                  <dd>{property.protectionClass}</dd>
                </div>
              </dl>
              <div className="effective-date">
                <EffectiveDateForm handleOnSubmit={this.updateQuote} effectiveDate={moment(effectiveDate).format('MM/DD/YYYY')} />
              </div>
            </section>
          </div>}

          <div className="detail-group quote-details">
            <h4 className="section-group-header"><i className="fa fa-list" /> Quote Details</h4>
            <section className="display-element">
              <dl>
                <div>
                  <dt>Yearly Premium</dt>
                  <dd>${12345}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt>Building Limit</dt>
                  <dd>${coverageLimits.dwelling.amount}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt>Building Deductible</dt>
                  <dd>${coverageLimits.dwelling.maxAmount}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt>Personal Property</dt>
                  <dd>${coverageLimits.personalProperty.amount}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt>Personal Property Deductible</dt>
                  <dd>${coverageLimits.personalProperty.amount}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt>Personal Property Replacement Cost</dt>
                  <dd>${coverageLimits.personalProperty.amount}</dd>
                </div>
              </dl>
            </section>
            <BoolInput styleName="verification" name={'confirmQuoteDetails'} question={'Verified'} handleChange={function () {}} value={confirmQuoteDetails} isSwitch />
          </div>

          {!editConfirmPolicyHolder && <div className="detail-group policyholder-details">
            <h4 className="section-group-header"><i className="fa fa-vcard-o" /> Policy Holder Details</h4>
            {!confirmPolicyHolderDetails && <div>
              <label className="btn btn-link edit-btn" htmlFor="editConfirmPolicyHolder">
                <i className="fa fa-pencil" />
                    Edit
                  </label>
              <Field
                name="editConfirmPolicyHolder" id="editConfirmPolicyHolder" component="input" type="checkbox" style={{
                  display: 'none',
                }}
              />
            </div>}
            <section className="display-element">
              {(quoteTest.policyHolders && quoteTest.policyHolders.length > 0) ? quoteTest.policyHolders.map((policyHolder, index) => (
                <dl key={`ph${index}`}>
                  <h5>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h5>
                  <div>
                    <dt>Name</dt>
                    <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                    <dt>Phone Number</dt>
                    <dd>{policyHolder.primaryPhoneNumber}</dd>
                    <dt>Email</dt>
                    <dd>{policyHolder.emailAddress}</dd>
                  </div>
                </dl>
                    )) : null}
            </section>
          </div>}
          {editConfirmPolicyHolder && <div className="detail-group policyholder-details edit">
            <h4 className="section-group-header"><i className="fa fa-vcard-o" /> Policy Holder Details</h4>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <PolicyHolderUpdateForm handleOnSubmit={this.updateQuote} state={state} />
            </section>
          </div>}

          {!editMailingAddress && <div className="detail-group mailing-address-details">
            <h4 className="section-group-header"><i className="fa fa-envelope-open-o" /> Mailing Address</h4>
            <section className="display-element">
              <dl>
                <div>
                  <dt>Address</dt>
                  <dd>{mailingAddress.address1}</dd>
                  <dd>{mailingAddress.address2}</dd>
                  <dt>City/State/Zip</dt>
                  <dd>{mailingAddress.city}, {mailingAddress.state}
                    {mailingAddress.zip}</dd>
                  <dt>Country</dt>
                  <dd>{mailingAddress.country.displayText}</dd>
                </div>
              </dl>
              <dl>
                {!confirmPolicyHolderDetails && <div>
                  <label className="btn btn-link edit-btn" htmlFor="editMailingAddress">
                    <i className="fa fa-pencil" />
                        Edit
                      </label>
                  <Field
                    name="editMailingAddress" id="editMailingAddress" component="input" type="checkbox" style={{
                      display: 'none',
                    }}
                  />
                </div>}
              </dl>
            </section>
            <BoolInput styleName="verification" name={'confirmPolicyHolderDetails'} question={'Verified'} handleChange={function () {}} value={confirmPolicyHolderDetails} isSwitch />
          </div>}
          {editMailingAddress && <div className="detail-group mailing-address-details edit">
            <h4 className="section-group-header"><i className="fa fa-envelope-open-o" /> Mailing Address</h4>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <MailingAddressForm name={'policyHolderMailingAddress'} handleOnSubmit={this.updateQuote} />
            </section>
          </div>}

          {!editConfirmAdditionalInterests && <div className="detail-group additional-interests-details">
            <h4 className="section-group-header"><i className="fa fa-bank" /> Additional Interests</h4>
            {!confirmAdditionalInterestsDetails && <div>
              <label className="btn btn-link edit-btn" htmlFor="editConfirmAdditionalInterests">
                <i className="fa fa-pencil" />
                    Edit
                  </label>
              <Field
                name="editConfirmAdditionalInterests" id="editConfirmAdditionalInterests" component="input" type="checkbox" style={{
                  display: 'none',
                }}
              />
            </div>}
            <section className="display-element">

              {(quoteTest.additionalInterests && quoteTest.additionalInterests.length > 0) ? quoteTest.additionalInterests.map((additionalInterests, index) => (
                <dl key={`ai${index}`}>
                  <div>
                    <dt>Name</dt>
                    <dd>{`${additionalInterests.name1} ${additionalInterests.name2}`}</dd>
                    <dt>Address</dt>
                    <dd>{additionalInterests.mailingAddress.address1}</dd>
                    <dd>{additionalInterests.mailingAddress.address2}</dd>
                    <dt>City/State/Zip</dt>
                    <dd>{additionalInterests.mailingAddress.city}, {additionalInterests.mailingAddress.state}
                      {additionalInterests.mailingAddress.zip}
                    </dd>
                  </div>
                </dl>
                    )) : null}

              <BoolInput styleName="verification" name={'confirmAdditionalInterestsDetails'} question={'Verified'} handleChange={function () {}} value={confirmAdditionalInterestsDetails} isSwitch />
            </section>
          </div>}
          {editConfirmAdditionalInterests && <div className="detail-group additional-interests-details edit">
            <h4 className="section-group-header"><i className="fa fa-bank" /> Additional Interests</h4>
            <div className="editing"><i className="fa fa-pencil" /> Editing</div>
            <section className="display-element">
              <AdditionalInterestUpdateForm additionalInterests={quoteTest.additionalInterests} handleOnSubmit={this.updateQuote} />
            </section>
          </div>}

          <section>
            <Form className={`fade-in ${styleName || ''}`} id="survey" onSubmit={handleSubmit(this.handleOnSubmit)} noValidate>
              <div className="workflow-steps">
                <button disabled={!confirmProperyDetails || !confirmQuoteDetails || !confirmPolicyHolderDetails || !confirmAdditionalInterestsDetails} className="btn btn-primary" type="submit" form="survey">next</button>
              </div>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}

Verify.propTypes = {
  editMailingAddress: PropTypes.bool,
  effectiveDate: PropTypes.string,
  editConfirmAdditionalInterests: PropTypes.bool,
  editConfirmPolicyHolder: PropTypes.bool,
  editProperty: PropTypes.bool,
  confirmProperyDetails: PropTypes.bool,
  confirmQuoteDetails: PropTypes.bool,
  confirmPolicyHolderDetails: PropTypes.bool,
  confirmAdditionalInterestsDetails: PropTypes.bool,
  handleSubmit: PropTypes.func,
  quote: PropTypes.object, //eslint-disable-line
  styleName: PropTypes.string,
};

Verify = reduxForm({
  form: 'Verify', // a unique identifier for this form
})(Verify);

const selector = formValueSelector('Verify'); // <-- same as form name

Verify = connect((state) => {
  // can select values individually
  const editConfirmAdditionalInterests = selector(state, 'editConfirmAdditionalInterests');
  const editConfirmPolicyHolder = selector(state, 'editConfirmPolicyHolder');
  const editMailingAddress = selector(state, 'editMailingAddress');
  const editProperty = selector(state, 'editProperty');
  const confirmProperyDetails = selector(state, 'confirmProperyDetails');
  const confirmQuoteDetails = selector(state, 'confirmQuoteDetails');
  const confirmPolicyHolderDetails = selector(state, 'confirmPolicyHolderDetails');
  const confirmAdditionalInterestsDetails = selector(state, 'confirmAdditionalInterestsDetails');

  const effectiveDate = selector(state, 'effectiveDate');

  return {
    initialValues: {
      policyHolderMailingAddress: {},
      additionalInterests: [],
      policyHolders: [],
    },
    state,
    effectiveDate,
    editConfirmAdditionalInterests,
    editConfirmPolicyHolder,
    editProperty,
    editMailingAddress,
    confirmProperyDetails,
    confirmQuoteDetails,
    confirmPolicyHolderDetails,
    confirmAdditionalInterestsDetails,
  };
})(Verify);

export default Verify;
