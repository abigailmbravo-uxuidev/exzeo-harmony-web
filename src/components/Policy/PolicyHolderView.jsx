import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import * as policyStateActions from '../../actions/policyStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as errorActions from '../../actions/errorActions';
import AgentCard from '../Common/AgentCard';
import Loader from '../Common/Loader';
import PolicyTabs from '../Common/PolicyTabs';
import PolicyHolderCard from '../Common/PolicyHolderCard';

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
    const { policy, policyNumber, agents } = this.props;
    if (!policy || !policy.policyID) {
      return (<Loader />);
    }
    const { policyHolderMailingAddress } = policy;
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
                    {policy.policyHolders &&
                     policy.policyHolders.map((policyHolder, index) => (
                       <PolicyHolderCard policyHolder={policyHolder} index={index} id={policyHolder._id} policyHolderMailingAddress={policyHolderMailingAddress} policyNumber={policyNumber} />
                     ))}
                  </div>
                </section>
              </div>
              {/* End Policyholders */}
              {/* Start Agent */}
              <div className="detail-group policyholder-details">
                <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Agent</h3>
                <section className="display-element">
                  <div className="contact-card-wrapper">
                    {(agents && agents.filter(a => a.agentCode === policy.agentCode).map((agent, index) =>
                      <AgentCard agent={agent} index={agent.agentCode} />
                    ))}
                  </div>
                </section>
              </div>
              {/* End Agent */}
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
  policy: state.service.latestPolicy,
  agents: state.service.agents
});

const mapDispatchToProps = dispatch => ({
  actions: {
    errorActions: bindActionCreators(errorActions, dispatch),
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyHolderView);
