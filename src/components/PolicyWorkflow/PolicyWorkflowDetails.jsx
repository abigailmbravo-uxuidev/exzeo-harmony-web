import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';

export class PolicyWorkflowDetails extends Component {

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.policyState.update && nextProps.policyState.policyNumber) {
      this.props.actions.serviceActions.getLatestPolicy(nextProps.policyState.policyNumber);
      this.props.actions.policyStateActions.updatePolicy(false, nextProps.policyState.policyNumber);
    }
    if (!_.isEqual(this.props.policy, nextProps.policy) && nextProps.policy.policyNumber) {
      this.props.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
    }
  }
  render() {
    const { policy, summaryLedger } = this.props;
    if (!policy || !policy.policyID) {
      return (<div className="detailHeader" />);
    }
    return (<div className="detailHeader policy-header">
      <section id="policyDetails" className="policyDetails">
        <dl>
          <div>
            <dt>Policy Details</dt>
            <dd>{_.get(policy, 'policyNumber')}</dd>
            <dd>{_.get(policy, 'product') === 'HO3' ? `${_.get(policy, 'product')} Homeowners` : _.get(policy, 'product')}</dd>
            <dd>{`${_.get(policy, 'status')} / ${_.get(summaryLedger, 'status.displayText')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="policyholder" className="policyholder">
        <dl>
          <div>
            <dt>Policyholder</dt>
            <dd>{`${_.get(policy, 'policyHolders[0].firstName')} ${_.get(policy, 'policyHolders[0].lastName')}`}</dd>
            <dd>{normalizePhone(_.get(policy, 'policyHolders[0].primaryPhoneNumber'))}</dd>
          </div>
        </dl>
      </section>
      <section id="policyHolderMailingAddress" className="policyHolderMailingAddress">
        <dl>
          <div>
            <dt>Mailing Address</dt>
            <dd>{_.get(policy, 'policyHolderMailingAddress.address1')}</dd>
            <dd>{_.get(policy, 'policyHolderMailingAddress.address2')}</dd>
            <dd>{`${_.get(policy, 'policyHolderMailingAddress.city')}, ${_.get(policy, 'policyHolderMailingAddress.state')} ${_.get(policy, 'policyHolderMailingAddress.zip')}`}</dd>
          </div>
        </dl>
      </section>
      <section id="propertyAddress" className="propertyAddress">
        <dl>
          <div>
            <dt>Property Address</dt>
            <dd>{_.get(policy, 'property.physicalAddress.address1')}</dd>
            <dd>{_.get(policy, 'property.physicalAddress.address2')}</dd>
            <dd>{`${_.get(policy, 'property.physicalAddress.city')}, ${_.get(policy, 'property.physicalAddress.state')} ${_.get(policy, 'property.physicalAddress.zip')}`}</dd>
          </div>
        </dl>
      </section>
      <div className="policy-sub-header">
        <section id="propertyCounty" className="propertyCounty">
          <dl>
            <div>
              <dt>Property County</dt>
              <dd>{_.get(policy, 'property.physicalAddress.county')}</dd>
            </div>
          </dl>
        </section>
        <section id="territory" className="territory">
          <dl>
            <div>
              <dt>Territory</dt>
              <dd>{_.get(policy, 'property.territory')}</dd>
            </div>
          </dl>
        </section>
        <section id="sourceNumber" className="sourceNumber">
          <dl>
            <div>
              <dt>Source Number</dt>
              <dd>{_.get(policy, 'sourceNumber')}</dd>
            </div>
          </dl>
        </section>
        <section id="policyEffectiveDate" className="policyEffectiveDate">
          <dl>
            <div>
              <dt>Effective Date</dt>
              <dd>{moment.utc(_.get(policy, 'effectiveDate')).format('MM/DD/YYYY')}</dd>
            </div>
          </dl>
        </section>
        <section id="cancellationDate" className="cancellationDate">
          <dl>
            <div>
              <dt>Cancellation Date</dt>
              <dd>{_.get(policy, 'cancelDate') ? moment.utc(_.get(policy, 'cancelDate')).format('MM/DD/YYYY') : '' }</dd>
            </div>
          </dl>
        </section>
      </div>
      <section id="premium" className="premium">
        <dl>
          <div>
            <dt>Current Premium</dt>
            <dd>$ {summaryLedger ? normalizeNumbers(summaryLedger.currentPremium) : '-'}</dd>
          </div>
        </dl>
      </section>

    </div>);
  }

}

PolicyWorkflowDetails.propTypes = {
  policy: PropTypes.shape(),
  actions: PropTypes.shape(),
  policyState: PropTypes.shape(),
  summaryLedger: PropTypes.shape()
};


const mapStateToProps = state => ({
  policyState: state.policy,
  tasks: state.cg,
  appState: state.appState,
  summaryLedger: state.service.getSummaryLedger,
  policy: state.service.latestPolicy
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyWorkflowDetails);
