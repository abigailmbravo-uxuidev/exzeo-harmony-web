import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '@exzeo/core-ui';
import PolicyTabs from '../Common/PolicyTabs';

const { numbers } = normalize;

export const Billing = ({ policy, policyNumber, billing }) => {
  const { property, rating } = policy;
  return (
    <React.Fragment>
      <PolicyTabs activeTab="property" policyNumber={policyNumber} />
      <div className="route-content">
        <div className="detail-group property-details">
          <section className="display-element home-and-location" >
            <h3 className="section-group-header"><i className="fa fa-area-chart" /> Premium</h3>
            <div className="left">
              <dl>
                <div data-test="currentPremium">
                  <dt>Current Premium</dt>
                  <dd>{billing.currentPremium}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="initialPremium">
                  <dt>Initial Premium</dt>
                  <dd>{billing.initialPremium}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="balanceDue">
                  <dt>Balance Due</dt>
                  <dd>{billing.balance.$numberDecimal}}</dd>
                </div>
              </dl>
            </div>
          </section>
          <section className="display-element home-and-location">
            <h3 className="section-group-header"><i className="fa fa-dollar" /> Billing Information</h3>
            <div className="left">
              <dl>
                <div data-test="nextPayment">
                  <dt>Next Payment</dt>
                  <dd>{billing.noticeAmountDue.$numberDecimal}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="paymentDue">
                  <dt>Payment Due</dt>
                  <dd>{billing.invoiceDueDate}</dd>
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
                  <dd>{}</dd>
                </div>
              </dl>
            </div>
          </section>
          <section className="display-element home-and-location">
            <h3 className="section-group-header"><i className="fa fa-credit-card" /> Payments</h3>
            <div className="left">
              
            </div>
          </section>
        </div>
      </div>
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
