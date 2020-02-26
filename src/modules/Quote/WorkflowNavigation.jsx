import React, { Component } from 'react';
import { TabNavigation, DetailsHeader } from '@exzeo/core-ui/src/@Harmony';

import { getNavLinks, STEP_NAMES } from './constants/workflowNavigation';
import WorkflowBanner from '../../components/WorkflowBanner';

export class WorkflowNavigation extends Component {
  getClassForStep = step => {
    const { currentStep } = this.props;
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
    const {
      quote,
      header,
      headerDetails,
      currentStep,
      handleRecalc,
      goToStep,
      isRecalc,
      isLoading,
      showNavigationTabs
    } = this.props;

    if (!quote || !quote.quoteNumber) return null;

    return (
      <div className="nav-and-header-wrapper">
        {header.banner && <WorkflowBanner content={header.banner} />}
        <DetailsHeader
          context="quote"
          handleRecalc={handleRecalc}
          detailsFields={header}
          headerDetails={headerDetails}
          isLoading={isLoading}
          isRecalc={isRecalc}
          currentStep={currentStep}
          duration={
            process.env.NODE_ENV === 'production' &&
            currentStep === STEP_NAMES.askToCustomizeDefaultQuote
              ? 1.5
              : 0.25
          }
        />

        {showNavigationTabs && (
          <TabNavigation
            navLinks={getNavLinks({
              goToStep,
              getClassName: this.getClassForStep,
              onKeyPress: this.onKeyPress
            })}
          />
        )}
      </div>
    );
  }
}

export default WorkflowNavigation;
