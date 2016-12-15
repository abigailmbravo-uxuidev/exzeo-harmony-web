import React, { PropTypes } from 'react';

const WorkflowHeader = (d, f) => {
  return (
    <ul className="workflow-header">
      <div className="rule" />
      {
        d.steps ? d.steps.map((step, index) => {
          let status;
          if (location.pathname.indexOf(step.name) > -1) {
            status = 'active';
          }
          return (
            <li key={index}>
              <a className={status || 'disabled'} tabIndex={index} onClick={() => { d.updateStep(index); }}>
                <i className={`fa ${step.icon || 'fa-circle'}`} />
                <span>{step.name}</span>
              </a>
            </li>
          )
        }) : null
      }
    </ul>
  );
};

WorkflowHeader.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    active: PropTypes.bool,
    complete: PropTypes.bool,
  })),
  updateStep: PropTypes.func,
};

WorkflowHeader.contextTypes = {
  location: PropTypes.any,
};

export default WorkflowHeader;
