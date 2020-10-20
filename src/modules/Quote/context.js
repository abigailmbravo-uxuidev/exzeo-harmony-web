import React, { useContext } from 'react';
import {
  PAGE_ROUTING,
  ROUTE_TO_STEP_NAME
} from './constants/workflowNavigation';

export const QuoteWorkflowContext = React.createContext();

export function QuoteWorkflowProvider({
  children,
  formInstance,
  getQuote,
  handleSubmit,
  history,
  isLoading,
  step
}) {
  const goToStep = (goTo, override) => {
    const stepNumber = PAGE_ROUTING[step];

    if ((isLoading || goTo >= stepNumber) && !override) return;

    formInstance.reset();
    history.replace(ROUTE_TO_STEP_NAME[goTo]);
  };

  return (
    <QuoteWorkflowContext.Provider
      value={{ goToStep, handleSubmit, getQuote }}
      children={children}
    />
  );
}

export function useQuoteWorkflow() {
  const context = useContext(QuoteWorkflowContext);
  if (context === undefined) {
    throw new Error(
      `useQuoteWorkflow must be used within a QuoteWorkflowProvider`
    );
  }

  return context;
}
