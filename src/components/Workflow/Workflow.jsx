import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import CheckErrorConnect from '../Error/CheckError';
// import CustomerInfoConnect from '../CustomerInfo/CustomerInfo';
// import UnderwritingConnect from '../Underwriting/Underwriting';
import SearchConnect from '../Search/Search';
import WorkFlowDetailsConnect from './WorkflowDetails';
// import CustomizeConnect from '../Customize/Customize';
// import ShareConnect from '../Share/Share';
// import AssumptionsConnect from '../Assumptions/Assumptions';
import Error from '../Error/Error';
// import PolicyHolderConnect from '../PolicyHolder/PolicyHolder';
// import AddAdditionalInterestConnect from '../AdditionalInterests/AddAdditionalInterest';
// import TaskRunnerConnect from './TaskRunner';
// import BillingConnect from '../Billing/Billing';
// import VerifyConnect from '../Verify/Verify';
// import ThankYou from '../ThankYou/ThankYou';
// import MortgageeConnect from '../AdditionalInterests/Mortgagee';
// import PremiumFinanceConnect from '../AdditionalInterests/PremiumFinance';
// import AdditionalInsuredConnect from '../AdditionalInterests/AdditionalInsured';
// import AdditionalInterestConnect from '../AdditionalInterests/AdditionalInterest';
// import BillPayerConnect from '../AdditionalInterests/BillPayer';


// const workflowModelName = 'quoteModel';
// const workflowData = {
//   dsUrl: `${process.env.REACT_APP_API_URL}/ds`
// };

// const underwritingDecisionErrors = [
//   'UWDecision1EndError', 'UWDecision2EndError',
//   'UWDecision3EndError', 'UWDecision4EndError',
//   'UWDecision5EndError'
// ];

// const components = {
//   search: <SearchConnect />,
//   chooseAddress: <SearchConnect />,
//   chooseQuote: <SearchConnect />,
//   askToSearchAgain: <SearchConnect />,
//   askAdditionalCustomerData: <CustomerInfoConnect />,
//   askUWAnswers: <UnderwritingConnect />,
//   askToCustomizeDefaultQuote: <CustomizeConnect />,
//   UWDecision1EndError: <Error />,
//   refreshOnUnderWritingReviewError: <ShareConnect />,
//   sendEmailOrContinue: <ShareConnect />,
//   showAssumptions: <AssumptionsConnect />,
//   askAdditionalPolicyHolder: <PolicyHolderConnect />,
//   addAdditionalAIs: <AddAdditionalInterestConnect />,
//   askMortgagee: <MortgageeConnect />,
//   askPremiumFinance: <PremiumFinanceConnect />,
//   askAdditionalInsured: <AdditionalInsuredConnect />,
//   askAdditionalInterest: <AdditionalInterestConnect />,
//   askBillPayer: <BillPayerConnect />,
//   showCustomizedQuoteAndContinue: <TaskRunnerConnect taskName={'showCustomizedQuoteAndContinue'} />,
//   askAdditionalQuestions: <BillingConnect />,
//   askScheduleInspectionDates: <VerifyConnect />,
//   editVerify: <VerifyConnect />
// };

export class Workflow extends Component {
  // state = {
  //   currentControl: <SearchConnect />,
  //   quoteNumber: ''
  // }

  componentDidMount() {
    this.props.actions.serviceActions.clearPolicyResults();

    // TODO: Move the start workflow to the search
    // this.props.actions.cgActions.startWorkflow(workflowModelName, workflowData);
  }

  // componentWillReceiveProps(nextProps) {
  //   // if (this.props.appState.data && (this.props.appState.data.currentControl !== nextProps.appState.data.currentControl)) {
  //   //   if (nextProps.appState.data.currentControl) {
  //   //     this.setState((previousState, props) => ({
  //   //       ...props,
  //   //       currentControl: components[nextProps.appState.data.currentControl]
  //   //     }));
  //   //   }
  //   // }
  //   // if ((this.props.tasks[workflowModelName]) &&
  //   //   (nextProps.tasks[workflowModelName].data.activeTask &&
  //   //     this.props.tasks[workflowModelName].data.activeTask)) {
  //   //   const activeTaskName = nextProps.tasks[workflowModelName].data.activeTask.name;
  //   //   const oldActiveTaskName = this.props.tasks[workflowModelName].data.activeTask.name;
  //   //   if (activeTaskName !== oldActiveTaskName) {
  //   //     if (activeTaskName === 'askAdditionalCustomerData' ||
  //   //       activeTaskName === 'askUWAnswers' ||
  //   //       activeTaskName === 'askToCustomizeDefaultQuote') {
  //   //       const quoteData = _.find(nextProps.tasks[workflowModelName].data.model.variables, { name: 'quote' }).value.result;
  //   //       if (quoteData._id) { // eslint-disable-line
  //   //         nextProps.actions.appStateActions.setAppState(nextProps.appState.modelName, nextProps.appState.instanceId, {
  //   //           quote: quoteData,
  //   //           updateWorkflowDetails: true,
  //   //           hideYoChildren: (activeTaskName === 'askAdditionalCustomerData' || activeTaskName === 'askUWAnswers')
  //   //         });
  //   //       }
  //   //     }
  //   //     window.scrollTo(0, 0);
  //   //     const newComponent = components[activeTaskName];
  //   //     this.setState((previousState, props) => ({
  //   //       ...props,
  //   //       currentControl: newComponent
  //   //     }));
  //   //   }
  //   // }
  //   // if (nextProps.tasks && nextProps.tasks[workflowModelName] &&
  //   //   nextProps.tasks[workflowModelName].data &&
  //   //   nextProps.tasks[workflowModelName].data.previousTask) {
  //   //   const previousTaskName = nextProps.tasks[workflowModelName].data.previousTask.name;
  //   //   if (previousTaskName === 'notifyDocusignApp' || previousTaskName === 'updateQuoteStateDocusign' || previousTaskName === 'generateQuoteApplicationPDFs') {
  //   //     this.setState((previousState, props) => ({
  //   //       ...props,
  //   //       currentControl: <ThankYou />
  //   //     }));
  //   //   } else if (_.includes(underwritingDecisionErrors, previousTaskName)) {
  //   //     this.setState((previousState, props) => ({
  //   //       ...props,
  //   //       currentControl: <Error />
  //   //     }));
  //   //   }
  //   // }
  // }

  render() {
    // const activeStep = (this.props.tasks && this.props.tasks[workflowModelName] && this.props.tasks[workflowModelName].data &&
    //   this.props.tasks[workflowModelName].data.activeTask) ? this.props.tasks[workflowModelName].data.activeTask.name : '';
    const activeStep = '';
    return (
      <div className={`route ${activeStep}`}>
        <WorkFlowDetailsConnect />
        {this.props.children}
        <CheckErrorConnect redirectUrl={this.context.router ? this.context.router.route.location.pathname : ''} />
      </div>);
  }
}

Workflow.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
