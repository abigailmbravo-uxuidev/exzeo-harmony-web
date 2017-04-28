import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

import CheckErrorConnect from '../Error/CheckError';
import CustomerInfoConnect from '../CustomerInfo/CustomerInfo';
import UnderwritingConnect from '../Underwriting/Underwriting';
import SearchConnect from '../Search/Search';
import WorkFlowDetailsConnect from './WorkflowDetails';
import CustomizeConnect from '../Customize/Customize';
import ShareConnect from '../Share/Share';
import AssumptionsConnect from '../Assumptions/Assumptions';
import Error from '../Error/Error';
import PolicyHolderConnect from '../PolicyHolder/PolicyHolder';
import AddAdditionalInterestConnect from '../AdditionalInterests/AddAdditionalInterest';
import TaskRunnerConnect from './TaskRunner';
import BillingConnect from '../Billing/Billing';
import VerifyConnect from '../Verify/Verify';
import ThankYou from '../ThankYou/ThankYou';
import MortgageeConnect from '../AdditionalInterests/Mortgagee';
import LienholderConnect from '../AdditionalInterests/Lienholder';
import AdditionalInsuredConnect from '../AdditionalInterests/AdditionalInsured';
import AdditionalInterestConnect from '../AdditionalInterests/AdditionalInterest';
import BillPayerConnect from '../AdditionalInterests/BillPayer';


const workflowModelName = 'quoteModel';

const underwritingDecisionErrors = [
  'UWDecision1EndError', 'UWDecision2EndError',
  'UWDecision3EndError', 'UWDecision4EndError',
  'UWDecision5EndError'
];

const components = {
  search: <SearchConnect />,
  chooseAddress: <SearchConnect />,
  chooseQuote: <SearchConnect />,
  askToSearchAgain: <SearchConnect />,
  askAdditionalCustomerData: <CustomerInfoConnect />,
  askUWAnswers: <UnderwritingConnect />,
  askToCustomizeDefaultQuote: <CustomizeConnect />,
  UWDecision1EndError: <Error />,
  refreshOnUnderWritingReviewError: <ShareConnect />,
  sendEmailOrContinue: <ShareConnect />,
  showAssumptions: <AssumptionsConnect />,
  askAdditionalPolicyHolder: <PolicyHolderConnect />,
  addAdditionalAIs: <AddAdditionalInterestConnect />,
  askMortgagee: <MortgageeConnect />,
  askLienholder: <LienholderConnect />,
  askAdditionalInsured: <AdditionalInsuredConnect />,
  askAdditionalInterest: <AdditionalInterestConnect />,
  askBillPayer: <BillPayerConnect />,
  showCustomizedQuoteAndContinue: <TaskRunnerConnect taskName={'showCustomizedQuoteAndContinue'} />,
  askAdditionalQuestions: <BillingConnect />,
  askScheduleInspectionDates: <VerifyConnect />
};

export class Workflow extends Component {
  state = {
    currentControl: <SearchConnect />,
    quoteNumber: ''
  }

  componentDidMount() {
    this.props.actions.cgActions.startWorkflow(workflowModelName, {});
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.tasks[workflowModelName]) &&
      (nextProps.tasks[workflowModelName].data.activeTask &&
      this.props.tasks[workflowModelName].data.activeTask)) {
      const activeTaskName = nextProps.tasks[workflowModelName].data.activeTask.name;
      const oldActiveTaskName = this.props.tasks[workflowModelName].data.activeTask.name;
      if (activeTaskName !== oldActiveTaskName) {
        if (activeTaskName === 'askAdditionalCustomerData' ||
          activeTaskName === 'askUWAnswers' ||
          activeTaskName === 'askToCustomizeDefaultQuote') {
          const quoteData = nextProps.tasks[workflowModelName].data.previousTask.value.result;
          if (quoteData._id) { // eslint-disable-line
            console.log('dispatching workflow details', quoteData._id); // eslint-disable-line
            nextProps.actions.appStateActions.setAppState(nextProps.appState.modelName, nextProps.appState.instanceId, {
              quote: quoteData,
              updateWorkflowDetails: true,
              hideYoChildren: (activeTaskName === 'askAdditionalCustomerData' || activeTaskName === 'askUWAnswers')
            });
          }
        }

        console.log('active task name: ', activeTaskName);

        const newComponent = components[activeTaskName];
        this.setState((previousState, props) => ({
          ...props,
          currentControl: newComponent
        }));
      }
    }
    if (nextProps.tasks && nextProps.tasks[workflowModelName] &&
      nextProps.tasks[workflowModelName].data &&
      nextProps.tasks[workflowModelName].data.previousTask) {
      const previousTaskName = nextProps.tasks[workflowModelName].data.previousTask.name;
      if (previousTaskName === 'notifyDocusignApp' || previousTaskName === 'updateQuoteStateDocusign') {
        this.setState((previousState, props) => ({
          ...props,
          currentControl: <ThankYou />
        }));
      } else if (_.includes(underwritingDecisionErrors, previousTaskName)) {
        this.setState((previousState, props) => ({
          ...props,
          currentControl: <Error />
        }));
      }
    }
  }

  render() {
    const activeStep = (this.props.tasks && this.props.tasks.activeTask) ? this.props.tasks.activeTask.name : '';
    return (
      <div className={`route ${activeStep}`}>
        <WorkFlowDetailsConnect workflowModelName={workflowModelName} />
        { this.state.currentControl }
        <CheckErrorConnect redirectUrl={this.context.router.route.location.pathname} />
      </div>);
  }
}

Workflow.contextTypes = {
  router: PropTypes.object
};

Workflow.propTypes = {
  actions: PropTypes.shape({
    cgActions: PropTypes.shape({
      startWorkflow: PropTypes.func,
      activeTasks: PropTypes.func,
      completeTask: PropTypes.func
    }),
    appStateActions: PropTypes.shape({
      setAppState: PropTypes.func,
      setAppStateError: PropTypes.func
    })
  }),
  tasks: PropTypes.shape({
    activeTask: PropTypes.object
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
