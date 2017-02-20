/* eslint no-unused-vars :0 */
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Demographics from '../workflows/Demographics';
import Search from '../search/Search';
import SearchResults from '../search/SearchResults';
import UWQuestions from '../workflows/UWQuestions_Form';
import Customize from '../forms/Customize/Customize';
import ThankYou from './ThankYou';
import ErrorPage from './ErrorPage';
import WorkflowDetails from './WorkflowDetails';

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
    activeStep: 'billing',
  }
  componentWillMount = () => {
    const steps = [
      {
        name: 'askAdditionalCustomerData',
        label: 'Demographics',
        link: 'demographics',
        order: 1,
      }, {
        name: 'askUWAnswers',
        label: 'UnderWriting Q&A',
        order: 2,
        link: 'underwriting',
      }, {
        name: 'customizeDefaultQuote',
        label: 'Customize Quote',
        order: 3,
        link: 'customize',
      }, {
        name: 'shareIt',
        label: 'Share Quote',
        order: 4,
        link: 'share',
      }, {
        name: 'billingInfo',
        label: 'Billing Info',
        order: 5,
        link: 'billing',
      }, {
        name: 'verifyWrite',
        label: 'Verify & Write policy',
        order: 6,
        link: 'verify',
      },
    ];
    const { workflow } = this.state;
    // if (!workflow.id) {
    //   this.props.startWorkflow({ variables:
    // { input: { name: 'quote', product: '', state: '' } } })
    //     .then(({ data }) => {
    //       this.setState({
    //         workflow: {
    //           id: data.startWorkflow.id,
    //           steps,
    //         }
    //       });
    //       this.context.router.push('/workflow/demographics');
    //     })
    //     .catch(error => console.log(error));
    // } else {
    workflow.steps = steps;
    this.setState(workflow);
    // }
  }

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
         newProps.data.steps &&
        (this.props.data.steps.name !== newProps.data.steps.name)
      )) {
      const { steps } = newProps.data;

      console.log('steps.details', steps.details);
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

    // const details = [{
    //   name: 'Quote Number',
    //   value: '509011-102220-01',
    //   __typename: 'WorkflowDetail'
    // }, {
    //   name: 'Annual Premium',
    //   value: '11140',
    //   __typename: 'WorkflowDetail'
    // }, {
    //   name: 'Address',
    //   value: '19101 SW 56 ST',
    //   __typename: 'WorkflowDetail'
    // }, {
    //   name: 'Year Built',
    //   value: '1993',
    //   __typename: 'WorkflowDetail'
    // }, {
    //   name: 'Coverage A',
    //   value: '549000',
    //   __typename: 'WorkflowDetail'
    // }, {
    //   name: 'Coverage B',
    //   value: '54900',
    //   __typename: 'WorkflowDetail'
    // }, {
    //   name: 'Coverage C',
    //   value: '274500',
    //   __typename: 'WorkflowDetail'
    // }];

    const { workflow, activeStep } = this.state;
    return (
        <div className="fade-in">
          <WorkflowDetails details={this.state.details || []} />
          <Router>
            <div className="route">
              <Route path="/quote/search" component={Search} />
              <Route exact path="/quote/search/:address" component={SearchResults} />
              <Route path="/quote/demographics" component={Demographics} />
              <Route path="/quote/underwriting" component={UWQuestions} />
              <Route path="/quote/customize" component={Customize} />
              <Route path="/quote/thankyou" component={ThankYou} />
              <Route path="/quote/error" component={ErrorPage} />
              {/* <Route path="/quote/share" component={Share} />*/}
              {/* <Route path="/workflow/AdditionalInterests"
                  component={AdditionalInterestsForm} />*/}
              {/* <Route path="/workflow/MailingAddress" component={MailingAddressForm} />*/}
              {/* <Route path="/workflow/billing" component={Billing} />*/}
              {/* <Route path="/workflow/verify" component={Verify} />*/}
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
    }`, { options: { variables: { workflowId: localStorage.getItem('newWorkflowId') } } })(graphql(gql`
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
