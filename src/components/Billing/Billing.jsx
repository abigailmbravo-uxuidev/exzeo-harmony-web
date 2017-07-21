/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, change, propTypes, Field, formValueSelector } from 'redux-form';
import _ from 'lodash';
import Footer from '../Common/Footer';
import { CheckInput } from '../Form/inputs/CheckField';
import {
  RadioFieldBilling, SelectFieldBilling
} from '../Form/inputs';

import { getInitialValues } from '../Customize/customizeHelpers';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import FieldGenerator from '../Form/FieldGenerator';
import Loader from '../Common/Loader';

// ------------------------------------------------
// List the user tasks that directly tie to
//  the cg tasks.
// ------------------------------------------------
const userTasks = {
  formSubmit: 'askAdditionalQuestions'
};
export const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const taskData = { ...data };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'updateQuoteWithAdditionalQuestions' }) ? _.find(taskData.model.variables, { name: 'updateQuoteWithAdditionalQuestions' }).value.result :
  _.find(taskData.model.variables, { name: 'quote' }).value.result;
  return quoteData;
};

const handleGetPaymentPlans = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const paymentPlanResult = taskData && taskData.previousTask && taskData.previousTask.value ? taskData.previousTask.value.result : {};
  return paymentPlanResult;
};

const handleInitialize = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = handleGetQuoteData(state);

  const values = getInitialValues(taskData.uiQuestions, quoteData);

  _.forEach(taskData.uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });

  const paymentPlans = handleGetPaymentPlans(state);

  if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !values.billTo && !values.billPlan) {
    values.billTo = _.get(paymentPlans.options[0], 'billToId');
    values.billToId = _.get(paymentPlans.options[0], 'billToId');
    values.billToType = _.get(paymentPlans.options[0], 'billToType');
    values.billPlan = 'Annual';
  } else {
    values.billTo = _.get(quoteData, 'billToId');
    values.billToId = _.get(quoteData, 'billToId');
    values.billToType = _.get(quoteData, 'billToType');
    values.billPlan = _.get(quoteData, 'billPlan');
  }

  values.sameAsProperty = false;

  return values;
};

const handleGetQuestions = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  return taskData.uiQuestions;
};

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

export const InstallmentTerm = ({ paymentPlans, payPlans }) => (<div className="installment-term">
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
              $ {paymentPlan.s1.amount} : {moment.utc(paymentPlan.s1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.s2.amount} : {moment.utc(paymentPlan.s2.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div>}
          {paymentPlan && paymentPlan.q1 && paymentPlan.q2 && paymentPlan.q3 && paymentPlan.q4 && <div>
            <dt><span>Quarterly</span> Installment Plan</dt>
            <dd>
              $ {paymentPlan.q1.amount} : {moment.utc(paymentPlan.q1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.q2.amount} : {moment.utc(paymentPlan.q2.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.q3.amount} : {moment.utc(paymentPlan.q3.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {paymentPlan.q4.amount} : {moment.utc(paymentPlan.q4.dueDate).format('MM/DD/YYYY')}
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

let sameAsProperty = false;
export const Billing = (props) => {
  const {
    fieldQuestions,
    quoteData,
    dispatch,
    handleSubmit,
    fieldValues,
    paymentPlanResult
  } = props;

  const selectBillTo = (event) => {
    const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', props.billToValue]) ?
    _.find(paymentPlanResult.options, ['billToId', props.billToValue]) : {};

    dispatch(change('Billing', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('Billing', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('Billing', 'billPlan', 'Annual'));
  };

  const selectBillPlan = (value) => {
    const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', props.billToValue]) ?
    _.find(paymentPlanResult.options, ['billToId', props.billToValue]) : {};

    dispatch(change('Billing', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('Billing', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('Billing', 'billPlan', value));
  };

  const fillMailForm = () => {
    fieldQuestions.forEach((question) => {
      if (question.physicalAddressLocation) {
        if (!sameAsProperty) {
          dispatch(change('Billing', question.name, _.get(quoteData, question.physicalAddressLocation)));
        } else {
          dispatch(change('Billing', question.name, ''));
        }
      }
    });
    sameAsProperty = !sameAsProperty;
  };

  return (
    <div className="route-content">
      {props.appState.data.submitting && <Loader />}
      <Form className="fade-in" id="Billing" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3 className="section-group-header"><i className="fa fa-envelope" /> Mailing Address</h3>
            <CheckInput
              label="Is the mailing address the same as the property address?" input={{
                value: sameAsProperty,
                name: 'sameAsProperty',
                onChange: fillMailForm
              }} isSwitch
            /> {fieldQuestions && fieldQuestions.map((question, index) => (<FieldGenerator
              data={quoteData}
              question={question} values={fieldValues} key={index}
            />))}
            <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
            <SelectFieldBilling
              name="billTo"
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
              answers={_.find(paymentPlanResult.options, ['billToId', props.billToValue]) ?
               _.find(paymentPlanResult.options, ['billToId', props.billToValue]).payPlans : []}
              paymentPlans={paymentPlanResult.paymentPlans}
            />

            <InstallmentTerm
              payPlans={_.find(paymentPlanResult.options, ['billToId', props.billToValue]) ?
               _.find(paymentPlanResult.options, ['billToId', props.billToValue]).payPlans : []}
              paymentPlans={paymentPlanResult.paymentPlans}
            />
          </div>
          <Field name="billToId" component="input" type="hidden" />
          <Field name="billToType" component="input" type="hidden" />
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="Billing" disabled={props.appState.data.submitting || !props.billToValue}>next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
Billing.propTypes = {
  ...propTypes,
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  fieldValues: PropTypes.any, // eslint-disable-line
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = (state) => {
  const selector = formValueSelector('Billing');
  const billToValue = selector(state, 'billTo');

  return {
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'Billing.values', {}),
    initialValues: handleInitialize(state),
    fieldQuestions: handleGetQuestions(state),
    quoteData: handleGetQuoteData(state),
    paymentPlanResult: handleGetPaymentPlans(state),
    billToValue
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Billing' })(Billing));
