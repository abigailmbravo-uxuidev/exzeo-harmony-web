import React, { PropTypes } from 'react';

const WorkflowHeader = ({ steps, updateStep }) => (
  <ul className="workflow-header">
          <div className="rule"></div>
    {
      steps.map((step, index) => (
        <li key={index}>
          <a className={status} tabIndex={index} onClick={() => { updateStep(index); }}>
            <i className={`fa ${step.icon}`} />
            <span>{step.name}</span>
          </a>
        </li>
      ))
    }
  </ul>
);

WorkflowHeader.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    active: PropTypes.bool,
    complete: PropTypes.bool,
  })),
  updateStep: PropTypes.func,
};

export default WorkflowHeader;
