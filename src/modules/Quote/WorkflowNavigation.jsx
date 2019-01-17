import React, { Component } from 'react';
import { connect } from 'react-redux';

import { goToStep } from '../../utilities/navigation';
import { updateQuote } from '../../actions/quoteState.actions';
import { setRecalc } from '../../actions/appStateActions';

import DetailHeader from './DetailHeader';

export class WorkflowNavigation extends Component {
  getClassForStep = (stepName) => {
    const { activeTask, completedTasks } = this.props.workflowState;

    if (activeTask === stepName) return 'active';

    return completedTasks.includes(stepName) ? 'selected' : 'disabled';
  };

  onKeyPress = (event, props, stepName) => {
  if (event && event.preventDefault) event.preventDefault();
  if (event && event.charCode === 13) {
    goToStep(this.props, stepName);
  }
};

  render() {
    const { appState, quote, workflowState, handleRecalc } = this.props;
    if (!quote || !quote.quoteNumber) return null;

    return (
      <div>
        <DetailHeader
          activeTask={workflowState.activeTask}
          handleRecalc={handleRecalc}
          isLoading={appState.isLoading}
          quote={quote}
        />

        {!workflowState.isHardStop &&
          <ul className="workflow-header">
            <div className="rule" />
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'askAdditionalCustomerData')} onClick={() => goToStep(this.props, 'askAdditionalCustomerData')} className={this.getClassForStep('askAdditionalCustomerData', this.props)}><i className={'fa fa-vcard'} /><span>Policyholder</span></a></li>
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'askUWAnswers')} onClick={() => goToStep(this.props, 'askUWAnswers')} className={this.getClassForStep('askUWAnswers', this.props)}><i className={'fa fa-list-ol'} /><span>Underwriting</span></a></li>
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'askToCustomizeDefaultQuote')} onClick={() => goToStep(this.props, 'askToCustomizeDefaultQuote')} className={this.getClassForStep('askToCustomizeDefaultQuote', this.props)}><i className={'fa fa-sliders'} /><span>Customize</span></a></li>
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'sendEmailOrContinue')} onClick={() => goToStep(this.props, 'sendEmailOrContinue')} className={this.getClassForStep('sendEmailOrContinue', this.props)}><i className={'fa fa-share-alt'} /><span>Share</span></a></li>
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'addAdditionalAIs')} onClick={() => goToStep(this.props, 'addAdditionalAIs')} className={this.getClassForStep('addAdditionalAIs', this.props)}><i className={'fa fa-user-plus'} /><span>Additional Parties</span></a></li>
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'askAdditionalQuestions')} onClick={() => goToStep(this.props, 'askAdditionalQuestions')} className={this.getClassForStep('askAdditionalQuestions', this.props)}><i className={'fa fa-envelope'} /><span>Mailing / Billing</span></a></li>
            <li><a tabIndex="0" onKeyPress={event => this.onKeyPress(event, this.props, 'editVerify')} onClick={() => goToStep(this.props, 'editVerify')} className={this.getClassForStep('editVerify', this.props)}><i className={'fa fa-check-square'} /><span>Verify</span></a></li>
          </ul>
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
