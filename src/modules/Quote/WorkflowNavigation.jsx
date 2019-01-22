import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateQuote } from '../../actions/quoteState.actions';
import { setRecalc } from '../../actions/appStateActions';

import { STEP_NAMES } from './constants/choreographer';
import DetailHeader from './DetailHeader';
import { TabNavigation } from '@exzeo/core-ui/src/@Harmony/Navigation';


export class WorkflowNavigation extends Component {
  getClassForStep = (stepName) => {
    const { activeTask, completedTasks } = this.props.workflowState;

    if (activeTask === stepName) return 'active';

    return completedTasks.includes(stepName) ? 'selected' : 'disabled';
  };

  onKeyPress = (stepName, event) => {
    const { goToStep } = this.props;

    if (event && event.preventDefault) event.preventDefault();
    if (event && event.charCode === 13) {
      goToStep(stepName);
    }
  };

  getNavLinks = () => {
    const { goToStep } = this.props;

    return [{
      key: STEP_NAMES.askAdditionalCustomerData,
      iconId: 'fa fa-vcard',
      label: 'Policyholder',
      className: this.getClassForStep(STEP_NAMES.askAdditionalCustomerData),
      handleClick: () => goToStep(STEP_NAMES.askAdditionalCustomerData),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.askAdditionalCustomerData, e),
    }, {
      key: STEP_NAMES.askUWAnswers,
      iconId: 'fa fa-list-ol',
      label: 'Underwriting',
      className: this.getClassForStep(STEP_NAMES.askUWAnswers),
      handleClick: () => goToStep(STEP_NAMES.askUWAnswers),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.askUWAnswers, e),
    }, {
      key: STEP_NAMES.askToCustomizeDefaultQuote,
      iconId: 'fa fa-sliders',
      label: 'Customize',
      className: this.getClassForStep(STEP_NAMES.askToCustomizeDefaultQuote),
      handleClick: () => goToStep(STEP_NAMES.askToCustomizeDefaultQuote),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.askToCustomizeDefaultQuote, e),
    }, {
      key: STEP_NAMES.sendEmailOrContinue,
      iconId: 'fa fa-share-alt',
      label: 'Share',
      className: this.getClassForStep(STEP_NAMES.sendEmailOrContinue),
      handleClick: () => goToStep(STEP_NAMES.sendEmailOrContinue),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.sendEmailOrContinue, e),
    }, {
      key: STEP_NAMES.addAdditionalAIs,
      iconId: 'fa fa-user-plus',
      label: 'Additional Parties',
      className: this.getClassForStep(STEP_NAMES.addAdditionalAIs),
      handleClick: () => goToStep(STEP_NAMES.addAdditionalAIs),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.addAdditionalAIs, e),
    }, {
      key: STEP_NAMES.askAdditionalQuestions,
      iconId: 'fa fa-envelope',
      label: 'Mailing / Billing',
      className: this.getClassForStep(STEP_NAMES.askAdditionalQuestions),
      handleClick: () => goToStep(STEP_NAMES.askAdditionalQuestions),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.askAdditionalQuestions, e),
    }, {
      key: STEP_NAMES.editVerify,
      iconId: 'fa fa-check-square',
      label: 'Verify',
      className: this.getClassForStep(STEP_NAMES.editVerify),
      handleClick: () => goToStep(STEP_NAMES.editVerify),
      onKeyPress: (e) => this.onKeyPress(STEP_NAMES.editVerify, e),
    }]
  };

  render() {
    const { appState, quote, workflowState, handleRecalc, goToStep } = this.props;
    if (!quote || !quote.quoteNumber) return null;

    return (
      <div>
        <DetailHeader
          activeTask={workflowState.activeTask}
          handleRecalc={handleRecalc}
          isLoading={appState.isLoading}
          isRecalc={appState.isRecalc}
          quote={quote}
        />

        {!workflowState.isHardStop &&
          <TabNavigation navLinks={this.getNavLinks()} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appState: state.appState,
  quote: state.quoteState.quote,
  workflowState: state.quoteState.state,
});

export default connect(mapStateToProps, {
  updateQuote,
  setRecalc
})(WorkflowNavigation);
