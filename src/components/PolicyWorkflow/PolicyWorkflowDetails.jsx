import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { date } from '@exzeo/core-ui';

import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';

export class PolicyWorkflowDetails extends Component {
  render() {
    const { policy, summaryLedger } = this.props;

    return (
      <div className="detailHeader policy-header">
        <section id="policyholder" className="policyholder">
          <dl>
            <div>
              <dt>Policyholder</dt>
              <dd>{`${get(policy, 'policyHolders[0].firstName')} ${get(policy, 'policyHolders[0].lastName')}`}</dd>
              <dd>{normalizePhone(get(policy, 'policyHolders[0].primaryPhoneNumber'))}</dd>
            </div>
          </dl>
        </section>
        <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
          <dl>
            <div>
              <dt>Mailing Address</dt>
              <dd>{get(policy, 'policyHolderMailingAddress.address1')}</dd>
              <dd>{get(policy, 'policyHolderMailingAddress.address2')}</dd>
              <dd>{`${get(policy, 'policyHolderMailingAddress.city')}, ${get(policy, 'policyHolderMailingAddress.state')} ${get(policy, 'policyHolderMailingAddress.zip')}`}</dd>
            </div>
          </dl>
        </section>
        <section id="propertyAddress" className="propertyAddress">
          <dl>
            <div>
              <dt>Property Address</dt>
              <dd>{get(policy, 'property.physicalAddress.address1')}</dd>
              <dd>{get(policy, 'property.physicalAddress.address2')}</dd>
              <dd>{`${get(policy, 'property.physicalAddress.city')}, ${get(policy, 'property.physicalAddress.state')} ${get(policy, 'property.physicalAddress.zip')}`}</dd>
            </div>
          </dl>
        </section>
        <section id="propertyCounty" className="propertyCounty">
          <dl>
            <div>
              <dt>Property County</dt>
              <dd>{get(policy, 'property.physicalAddress.county')}</dd>
            </div>
          </dl>
        </section>
        <section id="policyNumber" className="policyNumber">
          <dl>
            <div>
              <dt>Policy Number</dt>
              <dd>{policy.policyNumber}</dd>
            </div>
          </dl>
        </section>
        <section id="policyEffectiveDate" className="policyEffectiveDate">
          <dl>
            <div>
              <dt>Effective Date</dt>
              <dd>{date.formatDate(policy.effectiveDate)}</dd>
            </div>
          </dl>
        </section>
        <section id="premium" className="premium">
          <dl>
            <div>
              <dt>Current Premium</dt>
              <dd>$ {summaryLedger ? normalizeNumbers(summaryLedger.currentPremium) : '-'}</dd>
            </div>
          </dl>
        </section>
      </div>
    );
  }
}

PolicyWorkflowDetails.propTypes = {
  policy: PropTypes.shape(),
  actions: PropTypes.shape(),
  policyState: PropTypes.shape(),
  summaryLedger: PropTypes.shape(),
  policyNumber: PropTypes.string

};


const mapStateToProps = state => ({
  policyState: state.policy,
  summaryLedger: state.service.getSummaryLedger,
  policy: state.service.latestPolicy
});

export default connect(mapStateToProps)(PolicyWorkflowDetails);
