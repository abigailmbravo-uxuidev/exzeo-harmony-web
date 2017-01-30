import React, { PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import moment from 'moment';
import Footer from '../Footer';
import BoolInput from '../form/BoolInput';
import quoteTest from './quoteTest';

const Summary = ({ quote, styleName, handleSubmit, handleOnSubmit, handleChange,
   pristine, reset, submitting, error, invalid }) => {
  const property = quoteTest.property;
  const coverageLimits = quoteTest.coverageLimits;
  const mailingAddress = quoteTest.policyHolderMailingAddress;
  return (
    <div className="workflow" role="article">
      <div className="fade-in">
        <div className="workflow-content">
          <section>
            <Form
              className={`fade-in ${styleName || ''}`} id="survey" onSubmit={null}
              noValidate
            >
              <div className="form-group survey-wrapper">
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


                  {/* BoolInput component with addition of class: "verification"*/}
                  <div className="form-group switch  verification">
                    <label htmlFor="test">Confirmed
                                                  <input
                                                    type="checkbox"
                                                    name="test"
                                                    checked={false}
                                                  />
                      <div className="switch-div" />
                      {/* needed to add a span element for marker icon*/}
                      <span />
                    </label>
                  </div>


                </section>

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
                  {/* BoolInput component with addition of class: "verification"*/}
                  <div className="form-group switch  verification">
                    <label htmlFor="test">Confirmed
                                                  <input
                                                    type="checkbox"
                                                    name="test"
                                                    checked={false}
                                                  />
                      <div className="switch-div" />
                      {/* needed to add a span element for marker icon*/}
                      <span />
                    </label>
                  </div>


                </section>

                <section className="display-element demographics">
                  <h3>Policy Holder Details</h3>
                  {(quoteTest.policyHolders &&
                    quoteTest.policyHolders.length > 0) ?
                    quoteTest.policyHolders.map((policyHolder, index) => (
                      <dl>
                        <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                        <div>
                          <dt>Name</dt>
                          <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                          <dt>Phone Number</dt>
                          <dd>{policyHolder.phoneNumber}</dd>
                          <dt>Email</dt>
                          <dd>{policyHolder.emailAddress}</dd>
                        </div>
                      </dl>
                  )) : null}

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

                  {/* BoolInput component with addition of class: "verification"*/}
                  <div className="form-group switch  verification">
                    <label htmlFor="test">Confirmed
                                                  <input
                                                    type="checkbox"
                                                    name="test"
                                                    checked={false}
                                                  />
                      <div className="switch-div" />
                      {/* needed to add a span element for marker icon*/}
                      <span />
                    </label>
                  </div>


                </section>

                <section className="display-element demographics">
                  <h3>Additional Interests</h3>
                  {(quoteTest.additionalInterests &&
                    quoteTest.additionalInterests.length > 0) ?
                    quoteTest.additionalInterests.map((additionalInterests, index) => (
                      <dl>
                        <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
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

                  {/* BoolInput component with addition of class: "verification"*/}
                  <div className="form-group switch  verification">
                    <label htmlFor="test">Confirmed
                                                  <input
                                                    type="checkbox"
                                                    name="test"
                                                    checked={false}
                                                  />
                      <div className="switch-div" />
                      {/* needed to add a span element for marker icon*/}
                      <span />
                    </label>
                  </div>

                </section>

              </div>
              <div className="workflow-steps">
                <button className="btn btn-primary" type="submit" form="survey">next</button></div>
              <Footer />
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

Summary.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  quote: PropTypes.object,  //eslint-disable-line
  styleName: PropTypes.string,
};

export default reduxForm({
  form: 'Summary', // a unique identifier for this form
})(Summary);
