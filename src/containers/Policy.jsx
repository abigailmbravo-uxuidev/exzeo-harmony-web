import React from 'react';

import PolicyWorkflowConnect from '../components/PolicyWorkflow/PolicyWorkflow';
import BaseConnect from './Base';

const Policy = props => <BaseConnect {...props} ><div className="workflow" role="article"><PolicyWorkflowConnect /></div></BaseConnect>;

export default Policy;
