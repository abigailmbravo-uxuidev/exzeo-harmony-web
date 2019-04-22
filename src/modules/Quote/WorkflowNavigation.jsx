import React, { Component } from 'react';
import { TabNavigation } from '@exzeo/core-ui/src/@Harmony/Navigation';

import { getNavLinks } from './constants/workflowNavigation';
import DetailHeader from './DetailHeader';

export class WorkflowNavigation extends Component {
  getClassForStep = (step) => {
    const { currentStep} = this.props;
    if (currentStep === step) return 'active';

    return step < currentStep ? 'selected' : 'disabled';
  };

  onKeyPress = (step, event) => {
    const { goToStep } = this.props;

    if (event && event.preventDefault) event.preventDefault();
    if (event && event.charCode === 13) {
      goToStep(step);
    }
  };

  render() {
    const { quote, currentStep, handleRecalc, goToStep, isRecalc, isLoading, showNavigationTabs } = this.props;
    if (!quote || !quote.quoteNumber) return null;

    return (
      <div className="nav-and-header-wrapper">
        <DetailHeader
          activeTask={currentStep}
          handleRecalc={handleRecalc}
          isLoading={isLoading}
          isRecalc={isRecalc}
          quote={quote}
        />

        {showNavigationTabs &&
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

export default WorkflowNavigation;
