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
import MailingAddressForm from '../MailingAddress/MailingAddressForm';

let Verify = ({ dispatch, initialValues, quote, state, styleName, handleSubmit, handleOnSubmit, handleChange,
  effectiveDate,
  policyHolderFirstName1,
  policyHolderLastName1,
  policyHolderPhoneNumber1,
  policyHolderEmail1,
  policyHolderFirstName2,
  policyHolderLastName2,
  policyHolderPhoneNumber2,
  policyHolderEmail2,
  policyHolderAddress1,
  policyHolderAddress2,
  policyHolderCity,
  policyHolderState,
  policyHolderZip,
  policyHolderCountry,
  editConfirmAdditionalInterests,
  editConfirmPolicyHolder,
  editProperty,
  editMailingAddress,
  confirmProperyDetails,
  confirmQuoteDetails,
  confirmPolicyHolderDetails,
  confirmAdditionalInterestsDetails,
   pristine, reset, submitting, error, invalid }) => {
  const property = quoteTest.property;
  const coverageLimits = quoteTest.coverageLimits;
  const mailingAddress = quoteTest.policyHolderMailingAddress;

  const policyHolder1 = quoteTest.policyHolders.length > 0 ? quoteTest.policyHolders[0] : [];
  const policyHolder2 = quoteTest.policyHolders.length > 1 ? quoteTest.policyHolders[1] : [];

  initialValues.effectiveDate = moment(quoteTest.effectiveDate).format('YYYY-MM-DD');

  initialValues.policyHolderFirstName1 = policyHolder1.firstName;
  initialValues.policyHolderLastName1 = policyHolder1.lastName;
  initialValues.policyHolderPhoneNumber1 = policyHolder1.primaryPhoneNumber;
  initialValues.policyHolderEmail1 = policyHolder1.emailAddress;
  initialValues.policyHolderFirstName2 = policyHolder2.firstName;
  initialValues.policyHolderLastName2 = policyHolder2.lastName;
  initialValues.policyHolderPhoneNumber2 = policyHolder2.primaryPhoneNumber;
  initialValues.policyHolderEmail2 = policyHolder2.emailAddress;

  initialValues.policyHolderAddress1 = mailingAddress.address1;
  initialValues.policyHolderAddress2 = mailingAddress.address2;
  initialValues.policyHolderCity = mailingAddress.city;
  initialValues.policyHolderState = mailingAddress.state;
  initialValues.policyHolderZip = mailingAddress.zip;
  initialValues.policyHolderCountry = mailingAddress.country.displayText;

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
        <div className="workflow-content">
          <div className="form-group survey-wrapper">
            {!editProperty &&
            <section className="display-element demographics">
              <h3>Property Details</h3>
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
                  <dd>{moment(effectiveDate).format('MM/DD/YYYY')}</dd>
                </div>
              </dl>
              <dl>
                {!confirmProperyDetails && <div>
                  <label className="btn" htmlFor="editProperty">
                    <i className="fa fa-pencil" /> Edit </label>
                  <Field
                    name="editProperty" id="editProperty" component="input" type="checkbox"
                    style={{ display: 'none' }}
                  />
                </div>}
              </dl>

              <BoolInput
                disabled={editProperty}
                name={'confirmProperyDetails'}
                question={'Confirmed'}
                handleChange={function () { }}
                value={false}
                isSwitch
              />

            </section>
              }
            {editProperty &&
            <section className="display-element demographics">
              <h3>Property Details</h3>
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
            }
            <section className="display-element demographics">
              <h3>Quote Details</h3>
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
              <BoolInput
                name={'confirmQuoteDetails'}
                question={'Confirmed'}
                handleChange={function () { }}
                value={confirmQuoteDetails}
                isSwitch
              />

            </section>
            {!editConfirmPolicyHolder &&
            <section className="display-element demographics">
              <h3>Policy Holder Details</h3>
              {(quoteTest.policyHolders &&
                  quoteTest.policyHolders.length > 0) ?
                  quoteTest.policyHolders.map((policyHolder, index) => (
                    <dl key={`ph${index}`}>
                      <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                      <div>
                        <dt>Name</dt>
                        <dd>{index === 0 ?
                          `${policyHolderFirstName1} ${policyHolderLastName1}` :
                           `${policyHolderFirstName2} ${policyHolderLastName2}`}</dd>
                        <dt>Phone Number</dt>
                        <dd>{index === 0 ? policyHolderPhoneNumber1 : policyHolderPhoneNumber2}</dd>
                        <dt>Email</dt>
                        <dd>{index === 0 ? policyHolderEmail1 : policyHolderEmail2}</dd>
                      </div>
                    </dl>
                )) : null}
                {!confirmPolicyHolderDetails && <div>
                  <label className="btn" htmlFor="editConfirmPolicyHolder">
                    <i className="fa fa-pencil" /> Edit </label>
                  <Field
                    name="editConfirmPolicyHolder" id="editConfirmPolicyHolder" component="input" type="checkbox"
                    style={{ display: 'none' }}
                  />
                </div> }


              {!editMailingAddress && <div>
                <h4>Mailing Address</h4>
                <dl>
                  <div>
                    <dt>Address</dt>
                    <dd>{mailingAddress.address1}</dd>
                    <dd>{mailingAddress.address2}</dd>
                    <dt>City/State/Zip</dt>
                    <dd>{mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}</dd>
                    <dt>Country</dt>
                    <dd>{mailingAddress.country.displayText}</dd>
                  </div>
                </dl>
                <dl>
                  {!confirmPolicyHolderDetails && <div>
                    <label className="btn" htmlFor="editMailingAddress">
                      <i className="fa fa-pencil" /> Edit </label>
                    <Field
                      name="editMailingAddress" id="editMailingAddress" component="input" type="checkbox"
                      style={{ display: 'none' }}
                    />
                  </div> }
                </dl>
                <BoolInput
                  name={'confirmPolicyHolderDetails'}
                  question={'Confirmed'}
                  handleChange={function () {

                  }}
                  value={confirmPolicyHolderDetails}
                  isSwitch
                />
              </div>
            }
            </section>
            }


            <section className="display-element demographics">
              {editConfirmPolicyHolder &&
                <div>
                  <PolicyHolderUpdateForm
                    policyHolders={quoteTest.policyHolders}
                    handleOnSubmit={updateQuote}
                  />
                </div>
              }
              {editMailingAddress && <MailingAddressForm
                name={''}
                mailingAddress={quoteTest.policyHolderMailingAddress}
                handleOnSubmit={updateQuote}
              />}
            </section>


            {!editConfirmAdditionalInterests &&
            <section className="display-element demographics">
              <h3>Additional Interests</h3>
              {(quoteTest.additionalInterests &&
                    quoteTest.additionalInterests.length > 0) ?
                    quoteTest.additionalInterests.map((additionalInterests, index) => (
                      <dl key={`ai${index}`}>
                        <div>
                          <dt>Name</dt>
                          <dd>{`${additionalInterests.name1} ${additionalInterests.name2}`}</dd>
                          <dt>Address</dt>
                          <dd>{additionalInterests.mailingAddress.address1}</dd>
                          <dd>{additionalInterests.mailingAddress.address2}</dd>
                          <dt>City/State/Zip</dt>
                          <dd>{additionalInterests.mailingAddress.city},
                            {additionalInterests.mailingAddress.state}
                            {additionalInterests.mailingAddress.zip}
                          </dd>
                        </div>
                      </dl>
                  )) : null}
              {!confirmAdditionalInterestsDetails && <dl>
                <div>
                  <label className="btn" htmlFor="editConfirmAdditionalInterests">
                    <i className="fa fa-pencil" /> Edit </label>
                  <Field
                    name="editConfirmAdditionalInterests" id="editConfirmAdditionalInterests"
                    component="input" type="checkbox"
                    style={{ display: 'none' }}
                  />
                </div>
              </dl>}
              <BoolInput
                name={'confirmAdditionalInterestsDetails'}
                question={'Confirmed'}
                handleChange={function () {

                }}
                value={confirmAdditionalInterestsDetails}
                isSwitch
              />
            </section>
              }
            {editConfirmAdditionalInterests &&
            <section className="display-element demographics">
              <h3>Additional Interests</h3>
              {(quoteTest.additionalInterests &&
                  quoteTest.additionalInterests.length > 0) ?
                  quoteTest.additionalInterests.map((additionalInterests, index) => (
                    <dl key={`ai_edit${index}`}>
                      <div>
                        <dt>Name</dt>
                        <dd>{`${additionalInterests.name1} ${additionalInterests.name2}`}</dd>
                        <dt>Address</dt>
                        <dd>{additionalInterests.mailingAddress.address1}</dd>
                        <dd>{additionalInterests.mailingAddress.address2}</dd>
                        <dt>City/State/Zip</dt>
                        <dd>{additionalInterests.mailingAddress.city},
                          {additionalInterests.mailingAddress.state}
                          {additionalInterests.mailingAddress.zip}
                        </dd>
                      </div>
                    </dl>
                )) : null}
              {!confirmAdditionalInterestsDetails && <dl>
                <div>
                  <label className="btn" htmlFor="editConfirmAdditionalInterests">
                    <i className="fa fa-save" /> Save </label>
                  <Field
                    disabled={invalid}
                    name="editConfirmAdditionalInterests" id="editConfirmAdditionalInterests"
                    component="input" type="checkbox"
                    style={{ display: 'none' }}
                  />
                </div>
              </dl>}
              <BoolInput
                name={'confirmAdditionalInterestsDetails'}
                question={'Confirmed'}
                handleChange={function () {

                }}
                value={confirmAdditionalInterestsDetails}
                isSwitch
              />
            </section>
            }
            <section>
              <Form
                className={`fade-in ${styleName || ''}`} id="survey" onSubmit={function () { }}
                noValidate
              >
                <div className="workflow-steps">
                  <button
                    disabled={!confirmProperyDetails ||
                  !confirmQuoteDetails || !confirmPolicyHolderDetails ||
                !confirmAdditionalInterestsDetails}
                    className="btn btn-primary" type="submit" form="survey"
                  >next</button></div>
                <Footer />
              </Form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

Verify.propTypes = {
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
  quote: PropTypes.object,  //eslint-disable-line
  styleName: PropTypes.string,
};

Verify = reduxForm({
  form: 'Verify', // a unique identifier for this form
})(Verify);

const selector = formValueSelector('Verify'); // <-- same as form name

Verify = connect(
  (state) => {
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

    const policyHolderFirstName1 = selector(state, 'policyHolderFirstName1');
    const policyHolderLastName1 = selector(state, 'policyHolderLastName1');
    const policyHolderPhoneNumber1 = selector(state, 'policyHolderPhoneNumber1');
    const policyHolderEmail1 = selector(state, 'policyHolderEmail1');
    const policyHolderFirstName2 = selector(state, 'policyHolderFirstName2');
    const policyHolderLastName2 = selector(state, 'policyHolderLastName2');
    const policyHolderPhoneNumber2 = selector(state, 'policyHolderPhoneNumber2');
    const policyHolderEmail2 = selector(state, 'policyHolderEmail2');

    const policyHolderAddress1 = selector(state, 'policyHolderAddress1');
    const policyHolderAddress2 = selector(state, 'policyHolderAddress2');
    const policyHolderCity = selector(state, 'policyHolderCity');
    const policyHolderState = selector(state, 'policyHolderState');
    const policyHolderZip = selector(state, 'policyHolderZip');
    const policyHolderCountry = selector(state, 'policyHolderCountry');


    return {
      initialValues: {
        effectiveDate,
        policyHolderFirstName1,
        policyHolderLastName1,
        policyHolderPhoneNumber1,
        policyHolderEmail1,
        policyHolderFirstName2,
        policyHolderLastName2,
        policyHolderPhoneNumber2,
        policyHolderEmail2,
        policyHolderAddress1,
        policyHolderAddress2,
        policyHolderCity,
        policyHolderState,
        policyHolderZip,
        policyHolderCountry,
      },
      effectiveDate,
      policyHolderFirstName1,
      policyHolderLastName1,
      policyHolderPhoneNumber1,
      policyHolderEmail1,
      policyHolderFirstName2,
      policyHolderLastName2,
      policyHolderPhoneNumber2,
      policyHolderEmail2,
      policyHolderAddress1,
      policyHolderAddress2,
      policyHolderCity,
      policyHolderState,
      policyHolderZip,
      policyHolderCountry,
      editConfirmAdditionalInterests,
      editConfirmPolicyHolder,
      editProperty,
      editMailingAddress,
      confirmProperyDetails,
      confirmQuoteDetails,
      confirmPolicyHolderDetails,
      confirmAdditionalInterestsDetails,
    };
  },
)(Verify);

export default Verify;
