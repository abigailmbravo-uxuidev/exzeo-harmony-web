import React from 'react';
import PropTypes from 'prop-types';

import WorkflowConnect from '../components/Workflow/Workflow';
import BaseConnect from './Base';

const Quote = props => <BaseConnect {...props} ><div className="workflow" role="article"><WorkflowConnect>{props.children}</WorkflowConnect></div></BaseConnect>;

Quote.propTypes = {
  children: PropTypes.shape()
};

export default Quote;
