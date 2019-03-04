import React from 'react';
import { Field, Radio, OnChangeListener, validation, emptyObject, emptyArray } from '@exzeo/core-ui';
import PaymentPlanView from './PaymentPlanView';

const PLAN_LABELS = {
  'Annual': 'Annual Installment Plan',
  'Semi-Annual': 'Semi-Annual Installment Plan',
  'Quarterly': 'Quarterly Installment Plan',
};

const PAY_PLANS = {
  'annual': 'Annual',
  'semiAnnual': 'Semi-Annual',
  'quarterly': 'Quarterly'
};

function getPaymentPlans(availablePlans, paymentPlans) {
  if (!availablePlans.length || !paymentPlans) return emptyObject;

  const planNames = Object.keys(paymentPlans);
  const visiblePlans = planNames.filter(p => availablePlans.indexOf(PAY_PLANS[p]) > -1);
  return visiblePlans.reduce((acc, plan) => ({ ...acc, ...paymentPlans[plan]}), {});
}

const MailingBilling = ({ config, options, formValues }) => {
  const billToConfig = options.billToConfig[`${formValues.billToId}`] || emptyObject;
  const availablePlans = (billToConfig || {}).availablePlans || emptyArray;
  const paymentPlan = getPaymentPlans(availablePlans, options.paymentPlans)

  return (
    <React.Fragment>
       <Field name="billPlan" validate={validation.isRequired}>
         {({ input, meta }) => (
           <Radio
            input={input}
            meta={meta}
            label="Bill Plan"
            styleName='radio'
            answers={(billToConfig || {}).payPlanOptions || emptyArray}
            dataTest="billPlan"
            segmented
           />
         )}
       </Field>


      <Field name="billToType" subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name="billToId">
            {(value) => {
              onChange(options.billToConfig[value].billToType)
            }}
          </OnChangeListener>
        )}
      </Field>

      <section>
        <PaymentPlanView paymentPlan={paymentPlan} />
      </section>


    </React.Fragment>
  );
};

MailingBilling.defaultProps = {
  config: emptyObject,
  options: emptyObject,
  formValues: emptyObject,
};

export default MailingBilling;
