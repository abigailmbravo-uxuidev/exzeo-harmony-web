import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import PolicyWorkFlowDetailsConnect from './PolicyWorkflowDetails';


export class PolicyWorkflow extends Component {

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { children } = this.props;
    console.log(this.props);
    return (
      <div className={'route '}>
        <PolicyWorkFlowDetailsConnect />
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <nav className="nav-tabs">
                <button className="btn btn-tab active"><i className="fa fa-file-text-o" />Documents</button>
                <button className="btn btn-tab"><i className="fa fa-circle" />Another Tab</button>
              </nav>
              {children}
            </div>
          </div>
        </div>
      </div>);
  }
}

PolicyWorkflow.contextTypes = {
  router: PropTypes.object
};

PolicyWorkflow.propTypes = {
  selectedPolicy: PropTypes.shape(),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyState: state.policyState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch)
   // policyStateActions: bindActionCreators(policyStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyWorkflow);
