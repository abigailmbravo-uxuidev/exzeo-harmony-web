/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, change, Field } from 'redux-form';
import _ from 'lodash';

import Footer from '../Common/Footer';
import failedSubmission from '../Common/reduxFormFailSubmit';
import SnackBar from '../Common/SnackBar';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import { CheckInput } from '../Form/inputs/CheckField';
import {
  RadioFieldBilling,
  SelectFieldBilling
} from '../Form/inputs';

export const handleFormSubmit = async (data, dispatch, props) => {
  await props.updateQuote({ data, quoteNumber: props.quote.quoteNumber });
  props.history.replace('verify');
};

const handleGetQuoteData = state => state.quoteState.quote || {};

const handleGetPaymentPlans = (state) => {
  const stateFromQuoteState = state.quoteState.state || null;
  if (!stateFromQuoteState || !stateFromQuoteState.variables) return {};
  const result = stateFromQuoteState.variables.find(v => v.name === 'billingOptions');
  return result && result.value && result.value.result ? result.value.result : {};
};

const handleInitialize = (state) => {
  const quote = handleGetQuoteData(state);
  const uiQuestions = handleGetQuestions(state);
  const values = getInitialValues(uiQuestions, quote);

  _.forEach(uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  const paymentPlans = handleGetPaymentPlans(state);
  const selectedBilling = _.find(paymentPlans.options, ['billToId', _.get(quote, 'billToId')]);

  if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !_.get(quote, 'billToId') && !_.get(quote, 'billPlan')) {
    values.billToId = _.get(paymentPlans.options[0], 'billToId');
    values.billToType = _.get(paymentPlans.options[0], 'billToType');
    values.billPlan = 'Annual';
  } else if (selectedBilling) {
    values.billToId = selectedBilling.billToId;
    values.billToType = selectedBilling.billToType;
    values.billPlan = _.get(quote, 'billPlan') || '';
  }

  values.sameAsProperty = _.isEqual(_.get(quote, 'policyHolderMailingAddress.address1'), _.get(quote, 'property.physicalAddress.address1')) &&
    _.isEqual(_.get(quote, 'policyHolderMailingAddress.city'), _.get(quote, 'property.physicalAddress.city')) &&
    _.isEqual(_.get(quote, 'policyHolderMailingAddress.state'), _.get(quote, 'property.physicalAddress.state')) &&
    _.isEqual(_.get(quote, 'policyHolderMailingAddress.zip'), _.get(quote, 'property.physicalAddress.zip'));

  return values;
};

const handleGetQuestions = state => (state.quoteState.state && Array.isArray(state.quoteState.state.uiQuestions) ? state.quoteState.state.uiQuestions: []);

export const getSelectedPlan = (answer) => {
  let selection;

  if (answer === 'Annual') {
    selection = 'annual';
  } else if (answer === 'Semi-Annual') {
    selection = 'semiAnnual';
  } else if (answer === 'Quarterly') {
    selection = 'quarterly';
  }
  return selection;
};

export const InstallmentTerm = ({ paymentPlans, payPlans }) => (
  <div className="installment-term">
  {payPlans && payPlans.map((payPlan, index) => {
    const paymentPlan = paymentPlans[getSelectedPlan(payPlan)];
    return (
      <dl className="column-3" key={index}>
        <div>
          {paymentPlan && paymentPlan.amount && <div>
            <dt><span>Annual</span> Installment Plan</dt>
            <dd>
            $ {paymentPlan.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.dueDate).format('MM/DD/YYYY')}
            </dd></div>}
          {paymentPlan && paymentPlan.s1 && paymentPlan.s2 && <div>
            <dt><span>Semi-Annual</span> Installment Plan</dt>
            <dd>
              $ {paymentPlan.s1.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.s1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.s2.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.s2.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div>}
          {paymentPlan && paymentPlan.q1 && paymentPlan.q2 && paymentPlan.q3 && paymentPlan.q4 && <div>
            <dt><span>Quarterly</span> Installment Plan</dt>
            <dd>
              $ {paymentPlan.q1.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.q1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.q2.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.q2.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.q3.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.q3.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.q4.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} : {moment.utc(paymentPlan.q4.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div> }
        </div>
      </dl>
    );
  })}
</div>);

InstallmentTerm.propTypes = {
  payPlans: PropTypes.any, // eslint-disable-line
  paymentPlans: PropTypes.any // eslint-disable-line
};

export const Billing = (props) => {
  const {
    fieldQuestions,
    quote,
    dispatch,
    handleSubmit,
    fieldValues,
    paymentPlanResult,
    showSnackBar,
    isLoading
  } = props;

  const setPropertyToggle = () => {
    dispatch(change('Billing', 'sameAsProperty', false));
  };

  const selectBillTo = (event) => {
    const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', event.target.value]) ?
      _.find(paymentPlanResult.options, ['billToId', event.target.value]) : {};

    dispatch(change('Billing', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('Billing', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('Billing', 'billPlan', 'Annual'));
  };

  const selectBillPlan = (value) => {
    const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', props.fieldValues.billToId]) ?
      _.find(paymentPlanResult.options, ['billToId', props.fieldValues.billToId]) : {};

    dispatch(change('Billing', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('Billing', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('Billing', 'billPlan', value));
  };

  const fillMailForm = () => {
    fieldQuestions.forEach((question) => {
      if (question.physicalAddressLocation) {
        if (!props.fieldValues.sameAsProperty) {
          dispatch(change('Billing', question.name, _.get(quote, question.physicalAddressLocation)));
        } else {
          dispatch(change('Billing', question.name, ''));
        }
      }
    });
    dispatch(change('Billing', 'sameAsProperty', !props.fieldValues.sameAsProperty));
  };

  return (
    <div className="route-content">
      <SnackBar show={showSnackBar} timer={3000}>
        <p>Please correct errors.</p>
      </SnackBar>
      <Form className="fade-in" id="Billing" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-envelope" /> Mailing Address</h3>
            <CheckInput
              label="Is the mailing address the same as the property address?"
              isSwitch
              input={{
                value: fieldValues.sameAsProperty,
                name: 'sameAsProperty',
                onChange: fillMailForm
              }}
            />

            {fieldQuestions.map((question, index) => (
              <FieldGenerator
                key={index}
                onChange={setPropertyToggle}
                data={quote}
                question={question}
                values={fieldValues}
              />
            ))}

            <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
            <SelectFieldBilling
              name="billToId"
              component="select"
              label="Bill To"
              onChange={selectBillTo}
              validations={['required']}
              answers={paymentPlanResult.options}
              validate={[value => (value ? undefined : 'Field Required')]}
            />
            <RadioFieldBilling
              validations={['required']}
              value={'annual'}
              name={'billPlan'}
              label={'Bill Plan'}
              onChange={selectBillPlan}
              validate={[value => (value ? undefined : 'Field Required')]}
              segmented
              answers={_.find(paymentPlanResult.options, ['billToId', props.fieldValues.billToId]) ?
                _.find(paymentPlanResult.options, ['billToId', props.fieldValues.billToId]).payPlans : []}
              paymentPlans={paymentPlanResult.paymentPlans}
            />

            <InstallmentTerm
              payPlans={_.find(paymentPlanResult.options, ['billToId', props.fieldValues.billToId]) ?
                _.find(paymentPlanResult.options, ['billToId', props.fieldValues.billToId]).payPlans : []}
              paymentPlans={paymentPlanResult.paymentPlans}
            />
          </div>
          <Field name="billToType" component="input" type="hidden" />
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="Billing" disabled={isLoading || !props.fieldValues.billToId} data-test="submit">next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  showSnackBar: state.appState.showSnackBar,
  fieldValues: _.get(state.form, 'Billing.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quote: handleGetQuoteData(state),
  paymentPlanResult: handleGetPaymentPlans(state)
});

export default connect(mapStateToProps)(reduxForm({
  form: 'Billing',
  enableReinitialize: true,
  onSubmitFail: failedSubmission
})(Billing));
