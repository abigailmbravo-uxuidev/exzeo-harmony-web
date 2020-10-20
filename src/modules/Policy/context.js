import React, { useContext } from 'react';

export const PolicyWorkflowContext = React.createContext();

export function PolicyWorkflowProvider({ children, getPolicy }) {
  return (
    <PolicyWorkflowContext.Provider value={{ getPolicy }} children={children} />
  );
}

export function usePolicyWorkflow() {
  const context = useContext(PolicyWorkflowContext);
  if (context === undefined) {
    throw new Error(
      `usePolicyWorkflow must be used within a PolicyWorkflowProvider`
    );
  }
  return context;
}
