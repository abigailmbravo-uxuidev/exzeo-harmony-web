import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as appStateActions from '../../actions/appStateActions';
import * as completedTasksActions from '../../actions/completedTasksActions';
import * as serviceActions from '../../actions/serviceActions';


export class PolicyWorkflowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {}
    };
  }

  componentWillReceiveProps(nextProps) {

  }


  render() {
    // const { policy } = this.props;
    // if (!policy || !policy.policyID) { // eslint-disable-line
    //   return <div className="detailHeader" />;
    // }

    return (
      <div>
        <div className="detailHeader">
        Policy Detail Header
        </div>
      </div>
    );
  }
}

PolicyWorkflowDetails.propTypes = {
};

const mapStateToProps = state => ({
  quote: state.service.quote,
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    completedTasksActions: bindActionCreators(completedTasksActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyWorkflowDetails);
