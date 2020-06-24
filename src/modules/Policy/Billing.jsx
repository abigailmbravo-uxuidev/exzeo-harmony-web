import React from 'react';
import Title from '@exzeo/core-ui/src/@Harmony/Gandalf/@components/Title';
import { date } from '@exzeo/core-ui/src';

const formatBillingInformation = initialValues => {
  const { summaryLedger, additionalInterests, policyHolders } = initialValues;
  let billToName = '';

  if (summaryLedger.billToType === 'Additional Interest') {
    const ai = additionalInterests.find(p => initialValues.billToId === p._id);
    billToName = `${ai.type}: ${ai.name1} ${ai.name2}`;
  } else {
    const ph = policyHolders.find(p => initialValues.billToId === p._id);
    billToName = `Policyholder: ${ph.firstName} ${ph.lastName}`;
  }

  return {
    billToName,
    paymentDue: summaryLedger.invoiceDueDate
      ? date.formatDate(summaryLedger.invoiceDueDate, 'MM/DD/YYYY')
      : '-',
    nextPayment: parseFloat(summaryLedger.noticeAmountDue).toLocaleString(
      'en',
      {
        minimumFractionDigits: 2
      }
    )
  };
};

const Billing = ({ initialValues }) => {
  const { billToName, paymentDue, nextPayment } = formatBillingInformation(
    initialValues
  );

  return (
    <React.Fragment>
      <Title config={{ icon: 'fa fa-dollar', text: 'Billing Information' }} />
      <dl>
        <div data-test="nextPayment">
          <dt>Next Payment</dt>
          <dd>{nextPayment !== 'NaN' ? `$ ${nextPayment}` : '-'}</dd>
        </div>
      </dl>
      <dl>
        <div data-test="paymentDue">
          <dt>Payment Due</dt>
          <dd>{paymentDue}</dd>
        </div>
      </dl>
      <dl>
        <div data-test="billPlan">
          <dt>Bill Plan</dt>
          <dd>{initialValues.billPlan}</dd>
        </div>
      </dl>
      <dl>
        <div data-test="billTo">
          <dt>Bill To</dt>
          <dd>{billToName}</dd>
        </div>
      </dl>
    </React.Fragment>
  );
};

export default Billing;
