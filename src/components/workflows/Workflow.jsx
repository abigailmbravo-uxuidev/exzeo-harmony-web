import React, {Component, PropTypes} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Demographics from '../workflows/Demographics';
import Customize from '../workflows/CustomizeQuote_';
import Share from '../workflows/Share';
import UWQuestions from '../workflows/UWQuestions';
import Billing from '../workflows/Billing';
import AdditionalInterestsForm from '../workflows/AdditionalInterestsForm';
import MailingAddressForm from '../common/MailingAddress/MailingAddressForm';
import Verify from '../common/verify/Verify';
import _ from 'lodash';

const WorkflowHeader = (d) => {
  console.log(d);
  return (
        <ul className="workflow-header">
          <div className="rule"></div>
          {d.steps
            ? d.steps.map((step, index) => {
            if (step.type !== 'Search' && step.type !== 'Error') {
              return (
                <li key={index}>
                  <Link to={`/workflow/${step.link}`}>
                    <i className={`fa ${step.name}`}/>
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


const WorkflowFooter = ({...s}) => {
  let prev = null;
  let next = null;
  if(s.steps){
    const index = s.steps.findIndex(step => step.link === s.activeStep);
    if(index > 0)
      prev = s.steps[(index - 1)];
    if(index < s.steps.length)
      next = s.steps[(index + 1)];
  }
  return (
      <div className="footer">
          <ul>
            {
              prev ? (<Link to={{ pathname: '/workflow/' + prev.link}} className="prev">{prev.label}</Link>) : null
            }
            {
              next ? (<Link className="next" to={'/workflow/' + next.link}>{next.label}</Link>) : null
            }
          </ul>
    </div>
  )
}


const WorkflowDetails = () => (
        <div className="detailHeader">
          <section id="quoteDetails" className="quoteDetails">
            <dl>
              <div>
                <dt>Quote number</dt>
                <dd>TTIC-HO3-<span>12345</span>
                </dd>
              </div>
            </dl>
          </section>
          <section id="propertyDetails" className="propertyDetails">
            <dl>
              <div>
                <dt>Address</dt>
                <dd>123 Main Street</dd>
                <dd>Fort Lauderdale, FL 12345</dd>
              </div>
            </dl>
          </section>
          <section id="propertyDetails" className="propertyDetails">
            <dl>
              <div>
                <dt>Year built</dt>
                <dd>2000</dd>
              </div>
            </dl>
          </section>
          <section id="coverageDetails" className="coverageDetails">
            <dl>
              <div>
                <dt>Coverage A</dt>
                <dd>$100,000</dd>
              </div>
            </dl>
            {/*
            <dl>
              <div>
                <dt>Coverage B</dt>
                <dd>$100,000</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Coverage C</dt>
                <dd>$50,000</dd>
              </div>
            </dl>
            */}
          </section>
          <section id="premium" className="premium">
            <dl>
              <div>
                <dt>Annual premium</dt>
                <dd>$10,000</dd>
              </div>
            </dl>
          </section>
        </div>
)

class Workflow extends Component {

  static propTypes = {
    startWorkflow: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    workflow: {
      steps: []
    },
    completedSteps: [],
    activeStep: "billing",
  }
  componentWillMount = () => {
    let steps = [
      {
        name: "askAdditionalCustomerData",
        label: "Demographics",
        link: "demographics",
        order: 1
      }, {
        name: "askUWAnswers",
        label: "UnderWriting Q&A",
        order: 2,
        link: "underwriting"
      }, {
        name: "customizeDefaultQuote",
        label: "Customize Quote",
        order: 3,
        link: "customize"
      }, {
        name: "shareIt",
        label: "Share Quote",
        order: 4,
        link: "share"
      }, {
        name: "billingInfo",
        label: "Billing Info",
        order: 5,
        link: "billing"
      }, {
        name: "verifyWrite",
        label: "Verify & Write policy",
        order: 6,
        link: "verify"
      }
    ];
    const { workflow } = this.state;
    // if (!workflow.id) {
    //   this.props.startWorkflow({ variables: { input: { name: 'quote', product: '', state: '' } } })
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
  updateCompletedSteps = (completedSteps) => {
    this.setState({completedSteps});
  }

  handleOnSubmit = (...d) => {
    //this.context.router.transitionTo('/workflow/underwriting');
    //let steps = this.state.workflow.steps;

    //<Redirect to="/workflow/underwriting" />
  }

  handleChange = (event) => {
    //let steps = this.state.workflow.steps;

    //<Redirect to="/workflow/underwriting" />
  }
  render() {
    const {workflow, activeStep} = this.state;
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <WorkflowDetails />
          <Router>
            <div className="route">
              <WorkflowHeader steps={workflow.steps}/>
              <Route path="/quote/demographics" component={Demographics} />
              <Route path="/quote/underwriting" component={UWQuestions}/>
              <Route path="/quote/customize" component={Customize}/>
              <Route path="/quote/share" component={Share}/>
              <Route path="/workflow/AdditionalInterests" component={AdditionalInterestsForm}/>
              <Route path="/workflow/MailingAddress" component={MailingAddressForm}/>
              <Route path="/workflow/billing" component={Billing}/>
              <Route path="/workflow/verify" component={Verify}/>
              <WorkflowFooter steps={workflow.steps} activeStep={activeStep} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
export default graphql(gql`
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
`, { name: 'startWorkflow' })(Workflow);
