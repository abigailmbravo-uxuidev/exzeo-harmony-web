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

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

import CheckError from '../Error/CheckError';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import Underwriting from '../Underwriting/Underwriting';
import Search from '../Search/Search';
import WorkFlowDetails from './WorkflowDetails';
import Customize from '../Customize/Customize';
import Share from '../Share/Share';
import Assumptions from '../Assumptions/Assumptions';
import Error from '../Error/Error';
import PolicyHolder from '../PolicyHolder/PolicyHolder';
import AdditionalInterest from '../AdditionalInterests/AdditionalInterest';
import Mortgagee from '../AdditionalInterests/Mortgagee';
import Lienholder from '../AdditionalInterests/Lienholder';
import AdditionalInsured from '../AdditionalInterests/AdditionalInsured';
import BillPayer from '../AdditionalInterests/BillPayer';
import TaskRunner from './TaskRunner';
import Billing from '../Billing/Billing';
import Verify from '../Verify/Verify';
import ThankYou from '../ThankYou/ThankYou';

const workflowModelName = 'quoteModel';

const components = {
  search: <Search />,
  chooseAddress: <Search />,
  chooseQuote: <Search />,
  askToSearchAgain: <Search />,
  askAdditionalCustomerData: <CustomerInfo />,
  askUWAnswers: <Underwriting />,
  askToCustomizeDefaultQuote: <Customize />,
  UWDecision1EndError: <Error />,
  refreshOnUnderWritingReviewError: <Share />,
  sendEmailOrContinue: <Share />,
  showAssumptions: <Assumptions />,
  askAdditionalPolicyHolder: <PolicyHolder />,
  askMortgagee: <Mortgagee />,
  askLienholder: <Lienholder />,
  askAdditionalInterest: <AdditionalInterest />,
  askAdditionalInsured: <AdditionalInsured />,
  askBillPayer: <BillPayer />,
  showCustomizedQuoteAndContinue: <TaskRunner taskName={'showCustomizedQuoteAndContinue'} />,
  askAdditionalQuestions: <Billing />,
  askScheduleInspectionDates: <Verify />
};

class Workflow extends Component {
  state = {
    currentControl: <Search />,
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
            nextProps.actions.appStateActions.setAppState(nextProps.appState.modelName,
              nextProps.appState.instanceId, {
                quote: quoteData,
                updateWorkflowDetails: true,
                hideYoChildren: (activeTaskName === 'askAdditionalCustomerData' || activeTaskName === 'askUWAnswers')
              });
          }
        }
        const newComponent = components[activeTaskName];
        this.setState((previousState, props) => ({ ...props,
          currentControl: newComponent
        }));
      }
    }
    if (nextProps.tasks && nextProps.tasks[workflowModelName] &&
      nextProps.tasks[workflowModelName].data &&
      nextProps.tasks[workflowModelName].data.previousTask &&
      nextProps.tasks[workflowModelName].data.previousTask.name === 'notifyDocusignApp') {
      this.setState((previousState, props) => ({ ...props,
        currentControl: <ThankYou />
      }));
    }
  }

  render() {
    const activeStep = (this.props.tasks && this.props.tasks.activeTask) ? this.props.tasks.activeTask.name : '';
    return (
      <div className={`route ${activeStep}`}>
        <WorkFlowDetails />
        { this.state.currentControl }
        <CheckError redirectUrl={this.context.router.route.location.pathname} />
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
  }),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string
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
