import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabNavigation } from '@exzeo/core-ui/src/@Harmony/Navigation';

import { updateQuote } from '../../actions/quoteState.actions';

import { getNavLinks } from './constants/workflowNavigation';
import DetailHeader from './DetailHeader';

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

  render() {
    const { appState, quote, workflowState, handleRecalc, goToStep, isRecalc } = this.props;
    if (!quote || !quote.quoteNumber) return null;

    return (
      <div className="nav-and-header-wrapper">
        <DetailHeader
          activeTask={workflowState.activeTask}
          handleRecalc={handleRecalc}
          isLoading={appState.isLoading}
          isRecalc={isRecalc}
          quote={quote}
        />

        {!workflowState.isHardStop &&
          <TabNavigation
            navLinks={getNavLinks({
              goToStep,
              getClassName: this.getClassForStep,
              onKeyPress: this.onKeyPress,
            })} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quote: state.quoteState.quote,
  workflowState: state.quoteState.state,
});

export default connect(mapStateToProps, {
  updateQuote
})(WorkflowNavigation);
