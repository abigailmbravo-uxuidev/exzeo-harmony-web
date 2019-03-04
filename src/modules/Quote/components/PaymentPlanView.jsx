import React from 'react';
import { format, date } from '@exzeo/core-ui';

// TODO come back and clean this up. For now this works with what CG is giving us, may need to change once workflows are implemented.
const PaymentPlanView = ({ paymentPlan }) => {
  return (
    <dl className="column-3">
      <div>
        {paymentPlan && paymentPlan.amount &&
          <div>
            <dt><span>Annual</span> Installment Plan</dt>
            <dd>{format.toCurrency(paymentPlan.amount)} : {date.formatDate(paymentPlan.dueDate)}</dd>
          </div>
        }
        {paymentPlan && paymentPlan.s1 && paymentPlan.s2 &&
          <div>
            <dt><span>Semi-Annual</span> Installment Plan</dt>
            <dd>{format.toCurrency(paymentPlan.s1.amount)} : {date.formatDate(paymentPlan.s1.dueDate)}</dd>
            <dd>{format.toCurrency(paymentPlan.s2.amount)} : {date.formatDate(paymentPlan.s2.dueDate)}</dd>
          </div>
        }
        {paymentPlan && paymentPlan.q1 && paymentPlan.q2 && paymentPlan.q3 && paymentPlan.q4 &&
          <div>
            <dt><span>Quarterly</span> Installment Plan</dt>
            <dd>{format.toCurrency(paymentPlan.q1.amount)} : {date.formatDate(paymentPlan.q1.dueDate)}</dd>
            <dd>{format.toCurrency(paymentPlan.q2.amount)} : {date.formatDate(paymentPlan.q2.dueDate)}</dd>
            <dd>{format.toCurrency(paymentPlan.q3.amount)} : {date.formatDate(paymentPlan.q3.dueDate)}</dd>
            <dd>{format.toCurrency(paymentPlan.q4.amount)} : {date.formatDate(paymentPlan.q4.dueDate)}</dd>
          </div>
        }
      </div>
    </dl>
  );
};

export default PaymentPlanView;
