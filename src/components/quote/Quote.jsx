import React from 'react';
import Workflow from '../workflows/Workflow';
import steps from './quoteSteps';

const Quote = () => {
  return (
    <Workflow steps={steps} />
  );
};

export default Quote;
