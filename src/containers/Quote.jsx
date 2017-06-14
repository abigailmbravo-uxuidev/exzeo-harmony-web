import React from 'react';

import WorkflowConnect from '../components/Workflow/Workflow';
import BaseConnect from './Base';

const Quote = props => <BaseConnect {...props} ><div className="workflow" role="article"><WorkflowConnect /></div></BaseConnect>;

export default Quote;
