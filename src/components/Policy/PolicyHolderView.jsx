import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as policyStateActions from '../../actions/policyStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as errorActions from '../../actions/errorActions';
import Downloader from '../Common/Downloader';
import Loader from '../Common/Loader';
import PolicyTabs from '../Common/PolicyTabs';
import normalizePhone from '../Form/normalizePhone';

export const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
export const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;

export class PolicyHolderView extends Component {

  componentDidMount() {
    const { policyNumber } = this.props;
    this.props.actions.serviceActions.getSummaryLedger(policyNumber);
    this.props.actions.serviceActions.getLatestPolicy(policyNumber).then((policy) => {
      this.props.actions.serviceActions.getAgentsByAgency(policy.companyCode, policy.state, policy.agencyCode);
    });
  }

  render() {
    const { policy, policyNumber } = this.props;
    if (!policy || !policy.policyID) {
      return (<Loader />);
    }

    return (
      <React.Fragment>
        <PolicyTabs activeTab="policyHolder" policyNumber={policyNumber} />
        <div className="route-content verify">
          <div className="scroll">
            <div className="detail-wrapper">
              {/* Start Policyholders */}
              <div className="detail-group policyholder-details">
                <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholders</h3>
                <section className="display-element">
                  <div className="contact-card-wrapper">
                    {(policy.policyHolders && policy.policyHolders.length > 0) ?
                     policy.policyHolders.map((policyHolder, index) => (_.trim(policyHolder.firstName).length > 0 &&
                     <div className="contact-card" key={`ph${index}`}>
                       <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                       <dl>
                         <div className="contact-name">
                           <dt>Name</dt>
                           <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                         </div>
                         <div className="contact-phone">
                           <dt>Phone Number</dt>
                           <dd>{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
                         </div>
                         <div className="contact-email">
                           <dt>Email</dt>
                           <dd>{policyHolder.emailAddress}</dd>
                         </div>
                       </dl>
                     </div>)) : null}
                  </div>
                </section>
              </div>
              {/* End Policyholders */}
              {/* Start Agents */}
              <div className="detail-group policyholder-details">
                <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Agent</h3>
                <section className="display-element">
                  <div className="contact-card-wrapper">
                    {(policy.policyHolders && policy.policyHolders.length > 0) ?
                     policy.policyHolders.map((policyHolder, index) => (_.trim(policyHolder.firstName).length > 0 &&
                     <div className="contact-card" key={`ph${index}`}>
                       <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                       <dl>
                         <div className="contact-name">
                           <dt>Name</dt>
                           <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                         </div>
                         <div className="contact-phone">
                           <dt>Phone Number</dt>
                           <dd>{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
                         </div>
                         <div className="contact-email">
                           <dt>Email</dt>
                           <dd>{policyHolder.emailAddress}</dd>
                         </div>
                       </dl>
                     </div>)) : null}
                  </div>
                </section>
              </div>
              {/* End Agents */}
            </div>
          </div>
        </div>
      </React.Fragment>);
  }
}

PolicyHolderView.propTypes = {
  policy: PropTypes.shape(),
  actions: PropTypes.shape(),
  policyNumber: PropTypes.string
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policy: state.service.latestPolicy
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch),
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyHolderView);
