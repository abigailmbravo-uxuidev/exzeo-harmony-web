import React, { PropTypes } from 'react';
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

let Verify = ({
  dispatch,
  initialValues,
  quote,
  state,
  styleName,
  handleSubmit,
  handleOnSubmit,
  handleChange,
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
}) => {
  const property = quoteTest.property;
  const coverageLimits = quoteTest.coverageLimits;
  const mailingAddress = quoteTest.policyHolderMailingAddress;

  const policyHolder1 = quoteTest.policyHolders.length > 0 ? quoteTest.policyHolders[0] : [];
  const policyHolder2 = quoteTest.policyHolders.length > 1 ? quoteTest.policyHolders[1] : [];

  initialValues.effectiveDate = moment(quoteTest.effectiveDate).format('YYYY-MM-DD');

  initialValues.additionalInterests = quoteTest.additionalInterests;
  initialValues.policyHolders = quoteTest.policyHolders;
  initialValues.policyHolderMailingAddress = quoteTest.policyHolderMailingAddress;

  console.log(initialValues.additionalInterests);

  function updateQuote() {
    dispatch(change('Verify', 'editProperty', false));
    dispatch(change('Verify', 'editConfirmPolicyHolder', false));
    dispatch(change('Verify', 'editMailingAddress', false));
    // Object.assign({}, state, { whatever: action.value });
    alert('quote updated');
  }

  return (
    <div className="workflow" role="article">
      <div className="fade-in">
        <div className="detail-content-wrapper ">
          <div className="detail-wrapper">

            {!editProperty && <div className="detail-group">
              <h4>Property Details</h4>
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
                <dl>
                  <div>
                    <dt>Quote Number</dt>
                    <dd>{quoteTest.quoteNumber}</dd>
                  </div>
                </dl>
                <dl>
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
                <dl>
                  <div>
                    <dt>Effective Date</dt>
                    <dd>{moment(quoteTest.effectiveDate).format('MM/DD/YYYY')}</dd>
                  </div>
                </dl>
              </section>
              <BoolInput styleName="verification" disabled={editProperty} name={'confirmProperyDetails'} question={'Confirmed'} handleChange={function () {}} value={false} isSwitch />
            </div>}
            {editProperty && <div className="detail-group">
              <h4>Property Details</h4>
              <section className="display-element">
                <dl>
                  <div>
                    <dt>Quote Number</dt>
                    <dd>{quoteTest.quoteNumber}</dd>
                  </div>
                </dl>
                <dl>
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
                <dl>
                  <div>
                    <EffectiveDateForm handleOnSubmit={updateQuote} effectiveDate={moment(effectiveDate).format('MM/DD/YYYY')} />
                  </div>
                </dl>
              </section>
            </div>}

            <div className="detail-group">
              <h4>Quote Details</h4>
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
              <BoolInput styleName="verification" name={'confirmQuoteDetails'} question={'Confirmed'} handleChange={function () {}} value={confirmQuoteDetails} isSwitch />
            </div>

            {!editConfirmPolicyHolder && <div className="detail-group">
              <h4>Policy Holder Details</h4>
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
                    <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
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
            {editConfirmPolicyHolder && <div className="detail-group">
              <h4>Policy Holder Details</h4>
              <section className="display-element">
                <PolicyHolderUpdateForm handleOnSubmit={updateQuote} />
              </section>
            </div>}

            {!editMailingAddress && <div className="detail-group">
              <h4>Mailing Address</h4>
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
              <BoolInput styleName="verification" name={'confirmPolicyHolderDetails'} question={'Confirmed'} handleChange={function () {}} value={confirmPolicyHolderDetails} isSwitch />
            </div>}
            {editMailingAddress && <div className="detail-group">
              <h4>Mailing Address</h4>
              <section className="display-element">
                <MailingAddressForm name={'policyHolderMailingAddress.'} handleOnSubmit={updateQuote} />
              </section>
            </div>}

            {!editConfirmAdditionalInterests && <div className="detail-group">
              <h4>Additional Interests</h4>
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

                <BoolInput styleName="verification" name={'confirmAdditionalInterestsDetails'} question={'Confirmed'} handleChange={function () {}} value={confirmAdditionalInterestsDetails} isSwitch />
              </section>
            </div>}
            {editConfirmAdditionalInterests && <div className="detail-group">
              <h4>Additional Interests</h4>
              <section className="display-element">
                <AdditionalInterestUpdateForm additionalInterests={quoteTest.additionalInterests} handleOnSubmit={updateQuote} />
              </section>
            </div>}

            <section>
              <Form className={`fade-in ${styleName || ''}`} id="survey" onSubmit={function () {}} noValidate>
                <div className="workflow-steps">
                  <button disabled={!confirmProperyDetails || !confirmQuoteDetails || !confirmPolicyHolderDetails || !confirmAdditionalInterestsDetails} className="btn btn-primary" type="submit" form="survey">next</button>
                </div>
              </Form>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

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
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
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
