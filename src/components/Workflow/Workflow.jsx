import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { clearPolicyResults } from '../../actions/serviceActions';
import CheckErrorConnect from '../Error/CheckError';
import WorkFlowDetailsConnect from './WorkflowDetails';
import Loader from '../Common/Loader';

export class Workflow extends Component {
  componentDidMount() {
    // this.props.clearPolicyResults();
  }
  render() {
    const { match, history, isLoading } = this.props;
    const activeStep = '';
    return (
      <div className={`route ${activeStep}`}>
        {isLoading && <Loader />}
        <WorkFlowDetailsConnect match={match} history={history} />
        {this.props.children}
        <CheckErrorConnect redirectUrl={this.context.router ? this.context.router.route.location.pathname : ''} />
      </div>);
  }
}

Workflow.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading
});

export default connect(mapStateToProps, { clearPolicyResults })(Workflow);
