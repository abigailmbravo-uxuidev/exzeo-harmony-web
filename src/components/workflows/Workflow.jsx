import React, {Component, PropTypes} from 'react';
//import WorkflowStep from './WorkflowStep';
import WorkflowHeader from '../workflows/WorkflowHeader';

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
    completedSteps: []
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
    this.setState({workflow: {
        steps
      }});
  }
  updateCompletedSteps = (completedSteps) => {
    this.setState({completedSteps});
  }
  render() {
    const {workflow} = this.state;
    console.log(workflow)
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <WorkflowDetails />
          <WorkflowHeader steps={workflow.steps} completedSteps={this.state.completedSteps}/>
        </div>
      </div>
    );
  }
}

export default Workflow;
