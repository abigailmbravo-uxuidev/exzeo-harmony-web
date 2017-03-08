/* eslint no-unused-vars :0 */
import localStorage from 'localStorage';
import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import Demographics from '../forms/Demographics/Demographics';
import Search from '../search/Search';
import SearchResults from '../search/SearchResults';
import Underwriting from '../forms/Underwriting/Underwriting';
import Customize from '../forms/Customize/Customize';
import Share from '../forms/Share/Share';
import Billing from '../forms/Billing/Billing';
import Verify from '../forms/Verify/Verify';
import ThankYou from './ThankYou';
import ErrorPage from './ErrorPage';
import WorkflowDetails from './WorkflowDetails';
import { getDetails, setDetails } from '../../actions/detailsActions';
import AdditionalInterests from '../forms/AdditionalInterests/AdditionalInterests';
import PolicyHolderAdditional from '../forms/policyHolder/PolicyHolderAdditional';

class Workflow extends Component {

  static propTypes = {
    startWorkflow: PropTypes.func, // eslint-disable-line
    dispatch: PropTypes.func,
    details: PropTypes.any, // eslint-disable-line
    data: PropTypes.any //eslint-disable-line
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    details: [],
    workflow: {
      steps: []
    },
    completedSteps: []
  }

  componentWillMount = () => {
    const { workflow } = this.state;
  }

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
         newProps.data.steps &&
        (this.props.data.steps.name !== newProps.data.steps.name)
      )) {
      const { steps } = newProps.data;
      this.props.dispatch(setDetails(steps.details));
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
    const details = this.props.details;

    return (
      <div className="fade-in">
        <Router>
          <div className={`route ${activeStep}`}>
            <WorkflowDetails details={details || []} />
            <Route path="/quote/search" component={Search} />
            <Route exact path="/quote/search/:address" component={SearchResults} />
            <Route path="/quote/demographics" component={Demographics} />
            <Route path="/quote/underwriting" component={Underwriting} />
            <Route path="/quote/customize" component={Customize} />
            <Route path="/quote/share" component={Share} />
            <Route path="/quote/additionalinterests" component={AdditionalInterests} />
            <Route path="/quote/additionalpolicyholder" component={PolicyHolderAdditional} />
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

const mapStateToProps = state => ({
  details: state.details.get('details')
});

export default (connect(mapStateToProps))(graphql(gql `
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
