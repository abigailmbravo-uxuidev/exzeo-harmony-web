/* eslint no-unused-vars :0 */
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import Demographics from '../workflows/Demographics';
import Search from '../search/Search';
import SearchResults from '../search/SearchResults';
import UWQuestions from '../workflows/UWQuestions_Form';
import Customize from '../forms/Customize/Customize';
import ThankYou from './ThankYou';
import ErrorPage from './ErrorPage';
import Verify from './verify/VerifyClass';
import WorkflowDetails from './WorkflowDetails';
import Share from './SharePage';
import Billing from './Billing';

const WorkflowHeader = (d) => {
  console.log(d);
  return (
    <ul className="workflow-header">
      <div className="rule" />
      {d.steps
            ? d.steps.map((step, index) => {
              if (step.type !== 'Search' && step.type !== 'Error') {
                return (
                  <li key={index}>
                    <Link to={`/workflow/${step.link}`}>
                      <i className={`fa ${step.name}`} />
                      <span>{step.label}</span>
                    </Link>
                  </li>
                );
              }
              return null;
            })
            : null
          }
    </ul>
  );
};


const WorkflowFooter = ({ ...s }) => {
  let prev = null;
  let next = null;
  if (s.steps) {
    const index = s.steps.findIndex(step => step.link === s.activeStep);
    if (index > 0) {
      prev = s.steps[(index - 1)];
    }
    if (index < s.steps.length) {
      next = s.steps[(index + 1)];
    }
  }
  return (
    <div className="footer">
      <ul>
        {
              prev ? (<Link to={{ pathname: `/workflow/${prev.link}` }} className="prev">{prev.label}</Link>) : null
            }
        {
              next ? (<Link className="next" to={`/workflow/${next.link}`}>{next.label}</Link>) : null
            }
      </ul>
    </div>
  );
};

class Workflow extends Component {

  static propTypes = {
    startWorkflow: PropTypes.func,
  }

  static contextTypes = {
    router: PropTypes.any,
  }

  state = {
    details: [],
    workflow: {
      steps: [],
    },
    completedSteps: [],
  }

  componentWillMount = () => {
    const { workflow } = this.state;
  }

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (this.props.data.steps && newProps.data.steps &&
        this.props.data.steps.details && newProps.data.steps.details &&
      !_.isEqual(this.props.data.steps.details, newProps.data.steps.details)) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
         newProps.data.steps &&
        (this.props.data.steps.name !== newProps.data.steps.name)
      )) {
      const { steps } = newProps.data;
      this.setState({ details: steps.details });
    }
  }

  updateCompletedSteps = (completedSteps) => {
    this.setState({ completedSteps });
  }

  handleOnSubmit = (...d) => {
    // this.context.router.transitionTo('/workflow/underwriting');
    // let steps = this.state.workflow.steps;

    // <Redirect to="/workflow/underwriting" />
  }

  handleChange = (event) => {
    // let steps = this.state.workflow.steps;

    // <Redirect to="/workflow/underwriting" />
  }
  render() {
    let activeStep = '';
    if (!this.props.data.loading && this.props.data.steps && this.props.data.steps.name) {
      activeStep = this.props.data.steps.name;
    }
    return (
      <div className="fade-in">
        <Router>
          <div className={`route ${activeStep}`}>
            <WorkflowDetails details={this.state.details || []} />
            <Route path="/quote/search" component={Search} />
            <Route exact path="/quote/search/:address" component={SearchResults} />
            <Route path="/quote/demographics" component={Demographics} />
            <Route path="/quote/underwriting" component={UWQuestions} />
            <Route path="/quote/customize" component={Customize} />
            <Route path="/quote/share" component={Share} />
            <Route path="/quote/billing" component={Billing} />
            <Route path="/quote/verify" component={Verify} />
            <Route path="/quote/thankyou" component={ThankYou} />
            <Route path="/quote/error" component={ErrorPage} />
          </div>
        </Router>
      </div>
    );
  }
}
export default (connect())(graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
            details {
                name
                value
            }
        }
    }`, {
      options: {
        variables: {
          workflowId: localStorage.getItem('newWorkflowId')
        }
      }
    })(graphql(gql`
  mutation StartWorkflow($input:WorkflowInput) {
    startWorkflow(input:$input) {
      id
      steps {
        name
        label
        icon
        type
      }
    }
  }
`, { name: 'startWorkflow' })(Workflow)));
