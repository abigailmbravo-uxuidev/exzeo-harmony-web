import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PolicyTabs from '../Common/PolicyTabs';
import PaymentHistoryTable from './PaymentHistoryTable';

export const Billing = ({ policy, policyNumber, billing }) => {
  let paymentDue;
  if(billing) {
    if (billing.billToType === 'Additional Interest') {
      const ai = policy.additionalInterests.find(p => billing.billToId === p._id);
      billing.billToName = `${ai.type}: ${ai.name1} ${ai.name2}`;
    } else {
      const ph = policy.policyHolders.find(p => billing.billToId === p._id);
      billing.billToName = `Policyholder: ${ph.firstName} ${ph.lastName}`;
    }

    paymentDue = (billing.invoiceDueDate) 
    ? moment.utc(billing.invoiceDueDate).format('MM/DD/YYYY') 
    : '-';
  }

  return (
    <React.Fragment>
      <PolicyTabs activeTab="billing" policyNumber={policyNumber} />
      { billing && 
        <div className="route-content">
          <div className="detail-group policy-details">
          <section className="display-element premium left">
            <h3 className="section-group-header"><i className="fa fa-area-chart" /> Premium</h3>
            <dl>
              <div data-test="currentPremium">
                <dt>Current Premium</dt>
                <dd>$ {billing.currentPremium.toLocaleString('en', { minimumFractionDigits: 2 })}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="initialPremium">
                <dt>Initial Premium</dt>
                <dd>$ {billing.initialPremium.toLocaleString('en', { minimumFractionDigits: 2 })}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="balanceDue">
                <dt>Balance Due</dt>
                <dd>$ {parseFloat(billing.balance.$numberDecimal).toLocaleString('en', { minimumFractionDigits: 2 })}</dd>
              </div>
            </dl>
          </section>
          <section className="display-element billing-information right">
            <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
            <dl>
              <div data-test="nextPayment">
                <dt>Next Payment</dt>
                <dd>$ {parseFloat(billing.noticeAmountDue.$numberDecimal).toLocaleString('en', { minimumFractionDigits: 2 })}</dd>
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
                <dd>{billing.billPlan}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="billTo">
                <dt>Bill To</dt>
                <dd>{billing.billToName}</dd>
              </div>
            </dl>
          </section>
          <section className="display-element payments">
            <h3 className="section-group-header"><i className="fa fa-credit-card" /> Payments</h3>
            <div className="">
              <PaymentHistoryTable paymentHistory={billing.payments} />
            </div>
            <div className="payments-received">
              <h4>Payments Received: $ {billing.cashReceived.$numberDecimal}</h4>
            </div>
          </section>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

Billing.contextTypes = {
  router: PropTypes.object
};

Billing.propTypes = {
  billing: PropTypes.shape(),
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

export default Billing;
