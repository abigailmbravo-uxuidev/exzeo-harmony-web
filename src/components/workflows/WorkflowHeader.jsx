import React, { PropTypes } from 'react';

function getStatus(step, completedSteps) {
  let status;
  if (location.pathname.indexOf(step.name) > -1) {
    status = 'selected';
  } else {
    completedSteps.forEach((c) => {
      console.log(step.name, ' ', c);
      console.log(c === step.name);
      if (step.name === c) {
        status = 'active';
      }
    });
  }
  return status;
}

const WorkflowHeader = (d, f) => {
  // console.log(d);
  return (
    <ul className="workflow-header">
      <div className="rule" />
      {
        d.steps ? d.steps.map((step, index) => {
          return (
            <li key={index}>
              <a className={getStatus(step, d.completedSteps)} tabIndex={index} onClick={() => { d.updateStep(index); }}>
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
