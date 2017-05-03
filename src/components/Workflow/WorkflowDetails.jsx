import React, {
  Component,
  PropTypes
} from 'react';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as completedTasksActions from '../../actions/completedTasksActions';

const workflowDetailsModelName = 'quoteModelGetQuote';

const getQuoteFromModel = (state, props) => {
  const startModelData = {
    _id: (state.quote._id) ? state.quote._id : props.appState.data.quote._id // eslint-disable-line
  };
  props.actions.cgActions.startWorkflow(workflowDetailsModelName, startModelData, false)
    .then(() => {
      props.actions.appStateActions.setAppState(props.appState.modelName,
        props.appState.instanceId, {
          ...props.appState.data,
          updateWorkflowDetails: false
        });
    });
};

const goToStep = (props, taskName) => {
  // don't allow submission until the other step is completed
  if (props.appState.data.submitting) return;

  const currentData = props.tasks && props.tasks[props.workflowModelName].data ? props.tasks[props.workflowModelName].data : {};

  if ((currentData && currentData.activeTask && currentData.activeTask.name !== taskName) &&
      (currentData && currentData.model && (_.includes(currentData.model.completedTasks, taskName) || _.includes(props.completedTasks, taskName)))) {
    props.actions.appStateActions.setAppState(props.appState.modelName, currentData.modelInstanceId, { ...props.appState.data, submitting: true });
   // props.actions.completedTasksActions.dispatchCompletedTasks(_.union(currentData.model.completedTasks, props.completedTasks));
    props.actions.cgActions.moveToTask(props.appState.modelName, props.appState.instanceId, taskName, _.union(currentData.model.completedTasks, props.completedTasks));
  }
};

export class WorkflowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appState !== this.props.appState) {
      if ((nextProps.appState.data.quote || this.state.quote._id) && nextProps.appState.data.updateWorkflowDetails) { // eslint-disable-line
        getQuoteFromModel(this.state, nextProps);
      }
    }
    if (nextProps.tasks[workflowDetailsModelName] !== this.props.tasks[workflowDetailsModelName]) {
      if (nextProps.tasks[workflowDetailsModelName] &&
        nextProps.tasks[workflowDetailsModelName].data.previousTask &&
        nextProps.tasks[workflowDetailsModelName].data.previousTask.name === 'quote') {
        const quote = nextProps.tasks[workflowDetailsModelName].data.previousTask.value.result;
        if (nextProps.appState.data.hideYoChildren) {
          delete quote.coverageLimits;
          delete quote.quoteNumber;
        }
        this.setState((prevProps, newProps) => ({ ...newProps,
          quote
        }));
      }
    }
  }

  getClassForStep = (stepName) => {
    let className = '';
    const currentData = this.props.tasks && this.props.tasks[this.props.workflowModelName].data ? this.props.tasks[this.props.workflowModelName].data : {};
    if (currentData && currentData.activeTask && currentData.activeTask.name === stepName) {
      className = 'active';
    } else if (currentData && currentData.model && (_.includes(currentData.model.completedTasks, stepName) || _.includes(this.props.completedTasks, stepName))) {
      className = 'selected';
    } else if (currentData && currentData.model && !_.includes(currentData.model.completedTasks, stepName) && !_.includes(this.props.completedTasks, stepName)) {
      className = 'disabled';
    }
    return className;
  };


  render() {
    if (!this.state.quote._id) { // eslint-disable-line
      return <div className="detailHeader" />;
    }
    return (
      <div>
        <div className="detailHeader">
          <section id="quoteDetails" className="quoteDetails">
            <dl>
              <div>
                <dt className="fade">Quote Number</dt>
                <dd className="fade">{(this.state.quote.quoteNumber ? this.state.quote.quoteNumber : '-')}</dd>
              </div>
            </dl>
          </section>
          <section id="propertyDetails" className="propertyDetails">
            <dl>
              <div>
                <dt>Address</dt>
                <dd className="fade">{this.state.quote.property.physicalAddress.address1}</dd>
                <dd className="fade">{this.state.quote.property.physicalAddress.address2}</dd>
                <dd className="fade">
                  {this.state.quote.property.physicalAddress.city},&nbsp;
                {this.state.quote.property.physicalAddress.state}&nbsp;
                  {this.state.quote.property.physicalAddress.zip}
                </dd>
              </div>
            </dl>
          </section>
          <section id="yearBuilt" className="yearBuilt">
            <dl>
              <div>
                <dt className="fade">Year Built</dt>
                <dd className="fade">{this.state.quote.property.yearBuilt}</dd>
              </div>
            </dl>
          </section>
          <section id="coverageDetails" className="coverageDetails">
            <dl>
              <div>
                <dt className="fade">Coverage A</dt>
                <dd className="fade">
                $ {this.state.quote.coverageLimits && !this.props.appState.data.recalc && !this.props.appState.data.updateWorkflowDetails ?
                this.state.quote.coverageLimits.dwelling.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'}
                </dd>
              </div>
            </dl>
          </section>
          <section id="premium" className="premium">
            <dl>
              <div>
                <dt className="fade">Premium</dt>
                <dd className="fade">
                $ {this.state.quote.rating && !this.props.appState.data.recalc && !this.props.appState.data.updateWorkflowDetails ?
                this.state.quote.rating.totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '--'}
                </dd>
              </div>
            </dl>
          </section>
        </div>
        { this.props.tasks && this.props.tasks[this.props.workflowModelName].data && this.props.tasks[this.props.workflowModelName].data.activeTask &&
          <ul className="workflow-header">
            <div className="rule" />
            <li><a onClick={() => goToStep(this.props, 'askAdditionalCustomerData')} className={this.getClassForStep('askAdditionalCustomerData')}><i className={'fa fa-vcard'} /><span>Policyholder</span></a></li>
            <li><a onClick={() => goToStep(this.props, 'askUWAnswers')} className={this.getClassForStep('askUWAnswers')}><i className={'fa fa-list-ol'} /><span>Underwriting</span></a></li>
            <li><a onClick={() => goToStep(this.props, 'askToCustomizeDefaultQuote')} className={this.getClassForStep('askToCustomizeDefaultQuote')}><i className={'fa fa-sliders'} /><span>Customize</span></a></li>
            <li><a onClick={() => goToStep(this.props, 'sendEmailOrContinue')} className={this.getClassForStep('sendEmailOrContinue')}><i className={'fa fa-share-alt'} /><span>Share</span></a></li>
            <li><a onClick={() => goToStep(this.props, 'addAdditionalAIs')} className={this.getClassForStep('addAdditionalAIs')}><i className={'fa fa-user-plus'} /><span>Additional Parties</span></a></li>
            <li><a onClick={() => goToStep(this.props, 'askAdditionalQuestions')} className={this.getClassForStep('askAdditionalQuestions')}><i className={'fa fa-envelope'} /><span>Mailing / Billing</span></a></li>
            <li><a onClick={() => goToStep(this.props, 'askScheduleInspectionDates')} className={this.getClassForStep('askScheduleInspectionDates')}><i className={'fa fa-check-square'} /><span>Verify</span></a></li>
          </ul>
      }
      </div>
    );
  }
}

WorkflowDetails.propTypes = {
  completedTasks: PropTypes.any, // eslint-disable-line
  actions: PropTypes.shape(),
  workflowModelName: PropTypes.string,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateWorkflowDetails: PropTypes.boolean,
      hideYoChildren: PropTypes.boolean,
      recalc: PropTypes.boolean
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    completedTasksActions: bindActionCreators(completedTasksActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDetails);
