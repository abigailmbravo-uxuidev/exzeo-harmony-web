import React, { PropTypes } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Demographics from '../workflows/Demographics';
import Customize from '../workflows/CustomizeQuote';
import Share from '../workflows/Share';
import UWQuestions from '../workflows/UWQuestions';
import Billing from '../workflows/Billing';

// function getStatus(step, completedSteps) {
//   let status;
//   if (location.pathname.indexOf(step.name) > -1) {
//     status = 'selected';
//   } else {
//     completedSteps.forEach((c) => {
//       // console.log(step.name, ' ', c);
//       // console.log(c === step.name);
//       if (step.name === c) {
//         status = 'completed';
//       }
//     });
//   }
//   return status;
// }

const WorkflowHeader = (d) => {
  console.log(d);
  return (
    <Router>
      <div>
        <ul className="workflow-header">
          <div className="rule" />
          {
            d.steps ? d.steps.map((step, index) => {
              if (step.type !== 'Search' && step.type !== 'Error') {
                return (
                  <li key={index}>
                    <Link to={"/workflow/" + step.link}>
                      <i className={'fa ' + step.name} />
                      <span>{step.label}</span>
                    </Link>
                  </li>
                );
              }
              return null;
            }) : null
          }
      </ul>
      <div>
        <Route path="/workflow/demographics" component={Demographics}/>
        <Route path="/workflow/underwriting" component={UWQuestions}/>
        <Route path="/workflow/customize" component={Customize}/>
        <Route path="/workflow/share" component={Share}/>
        <Route path="/workflow/billing" component={Billing}/>
      </div>
    </div>
  </Router>
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
