/* eslint jsx-a11y/label-has-for:0 */
import React, { Component, PropTypes } from 'react';
import { Form } from 'redux-form';
import _ from 'lodash';
import localStorage from 'localStorage';
import FieldGenerator from '../../form/FieldGenerator';
import { CheckInput } from '../../form/inputs/CheckField';
import Footer from '../../common/Footer';
import questionsMock from './questionsMock';

class BillingForm extends Component {
  static propTypes = {
    completeStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    push: PropTypes.func,
    initialize: PropTypes.func,
    data: PropTypes.any, // eslint-disable-line
    fieldValues: PropTypes.any // eslint-disable-line
  }

  state = {
    sameAsProperty: false,
    questions: questionsMock,
    values: {}
  }

  fillMailForm = () => {
    const { state } = this;
    const { steps } = this.props.data; // eslint-disable-line
    const policyholderData = steps.data[0];
    const questions = this.state.questions;

    questions.forEach((question) => {
      if (question.defaultValueLocation) {
        if (!this.state.sameAsProperty) {
          state.values[question.name] = _.get(policyholderData, question.defaultValueLocation);
        } else {
          state.values[question.name] = '';
        }
      }
    });
    state.sameAsProperty = !this.state.sameAsProperty;
    this.props.initialize(state.values);
    this.setState(state);
  }

  handleOnSubmit = (data) => {
    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'askAdditionalQuestions',
          data
        }
      }
    }).then((updatedShouldGeneratePdfAndEmail) => {
      const activeLink = updatedShouldGeneratePdfAndEmail.data.completeStep.link;
      this.props.push(`${activeLink}`);
    }).catch((error) => {
      console.log('errors from graphql', error); // eslint-disable-line
      this.props.push('error');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    let details = [];
    let annualPremium = 0;
    let semiAnnualPremium = 0;
    let quarterlyPremium = 0;

    let quote = null;
    if (this.props.data && this.props.data.steps) {
      details = this.props.data.steps.details;
      quote = this.props.data.steps.data[0];
    }

    annualPremium = _.find(details, { name: 'Annual Premium' }) ?
     _.find(details, { name: 'Annual Premium' }).value : 0;

    semiAnnualPremium = Math.ceil(annualPremium / 2);

    quarterlyPremium = Math.ceil(annualPremium / 4);


    return (
      <div className="workflow-content">
        <Form className="fade-in" id="Billing" onSubmit={handleSubmit(this.handleOnSubmit)} noValidate>
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-envelope-open" /> Mailing Address</h3>
            <CheckInput
              label="Is the mailing address the same as the property address?"
              input={{
                value: this.state.sameAsProperty,
                name: 'sameAsProperty',
                onChange: this.fillMailForm,
                disabled: !this.props.data || this.props.data.loading
              }}
              isSwitch
            />
            {this.state.questions && this.state.questions.map((question, index) => (
              <FieldGenerator
                data={quote}
                question={question}
                values={this.props.fieldValues}
                key={index}
              />
            ))}
            <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
            <div className="form-group  BillTo">

              <label>Bill To</label>

              <select name="BillTo" value="">
                <option value="ph1">Policyholder 1</option>
                <option value="mh1">Bank of America</option>
                <option value="mh2">Capital One</option>
              </select>
            </div>
            <div className="form-group segmented BillType  " role="group">
              <label className="group-label label-segmented">Bill Plan</label>
              <div className="segmented-answer-wrapper">
                <div className="radio-column-3">
                  <label className="label-segmented"><input type="radio" value="A" name="billPlan" />
                    <span>Annual</span>
                  </label>
                </div>
                <div className="radio-column-3">
                  <label className="label-segmented"><input type="radio" value="S" name="billPlan" />
                    <span>Semi-Annual</span>
                  </label>
                </div>
                <div className="radio-column-3">
                  <label className="label-segmented"><input type="radio" value="Q" name="billPlan" />
                    <span>Quarterly </span>
                  </label>
                </div>
              </div>
              <div className="installment-term">
                <dl className="column-3">
                  <div>
                    <dt><span>Annual</span> Installment Plan</dt>
                    <dd>1st Installment: ${annualPremium}</dd>
                  </div>
                </dl>
                <dl className="column-3">
                  <div>
                    <dt><span>Semi-Annual</span> Installment Plan</dt>
                    <dd>1st Installment: ${semiAnnualPremium}</dd>
                    <dd>2nd Installment: ${semiAnnualPremium}</dd>
                  </div>
                </dl>
                <dl className="column-3">
                  <div>
                    <dt><span>Quarterly</span> Installment Plan</dt>
                    <dd>1st Installment: ${quarterlyPremium}</dd>
                    <dd>2nd Installment: ${quarterlyPremium}</dd>
                    <dd>3rd Installment: ${quarterlyPremium}</dd>
                    <dd>4th Installment: ${quarterlyPremium}</dd>
                  </div>
                </dl>
              </div>
            </div>

          </div>
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="Billing">next</button>
          </div>
          <Footer />
        </Form>
      </div>
    );
  }
}

export default BillingForm;
