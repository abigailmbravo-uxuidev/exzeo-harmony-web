import React from 'react';
import { Field, Radio, validation } from '@exzeo/core-ui';

const PLAN_TITLES = {
  annual: 'Annual Installment Plan',
  semiAnnual: 'Semi-Annual Installment Plan',
  quarterly: 'Quarterly Installment Plan',
};

function getBillPlans(options, formValues) {
  return '';
}

const MailingBilling = ({ config, options, formValues }) => {
  const billPlans = getBillPlans(options, formValues);

  return (
    <React.Fragment>
       <Field name="billPlan" validate={validation.isRequired}>
         {({ input, meta }) => (
           <Radio
            input={input}
            meta={meta}
            label="Bill Plan"
            styleName='radio'
            answers={[{answer: 'annual', label: 'Annual'}]}
            dataTest="billPlan"
            segmented
           />
         )}
       </Field>

      <section>
        Available Plans... (coming soon)
      </section>


    </React.Fragment>
  );
};

export default MailingBilling;
