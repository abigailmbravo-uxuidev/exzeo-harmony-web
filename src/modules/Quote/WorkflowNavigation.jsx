import React from 'react';
import {
  TabNavigation,
  DetailsHeader,
  Banner
} from '@exzeo/core-ui/src/@Harmony';

import { getNavLinks, STEP_NAMES } from './constants/workflowNavigation';
import { useQuoteWorkflow } from './context';

const WorkflowNavigation = ({
  quote,
  header,
  headerDetails,
  currentStep,
  handleRecalc,
  isRecalc,
  isLoading,
  showNavigationTabs
}) => {
  const { goToStep } = useQuoteWorkflow();

  const getClassForStep = step => {
    if (currentStep === step) return 'active';

    return step < currentStep ? 'selected' : 'disabled';
  };

  const onKeyPress = (step, event) => {
    if (event && event.preventDefault) event.preventDefault();
    if (event && event.charCode === 13) {
      goToStep(step);
    }
  };

  if (!quote || !quote.quoteNumber) return null;

  return (
    <div className="nav-and-header-wrapper">
      {header.banner && <Banner content={header.banner} />}
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
            getClassName: getClassForStep,
            onKeyPress: onKeyPress
          })}
        />
      )}
    </div>
  );
};

export default WorkflowNavigation;
