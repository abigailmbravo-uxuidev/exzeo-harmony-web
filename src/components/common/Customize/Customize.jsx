import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Customize extends Component {
  static propTypes = {
    // workflowId: PropTypes.string,
    completeStep: PropTypes.func,
  }
  static contextTypes = {
    router: PropTypes.any,
  }
  submit = async () => {
    console.log('SUBMITTING');
    const buildSubmission = (stepName, data) => ({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'), // plugin workflow id or uncomment next line
          // workflowId: localStorage.getItem('newWorkflowId'),
          stepName,
          data,
        },
      },
    });
    try {
      let data;
      data = await this.props.completeStep(buildSubmission('askToCustomizeDefaultQuote', [{
        key: 'shouldCustomizeQuote',
        value: 'No',
      }]));
      console.log('ask to customize defuault quote submit', data);
      data = await this.props.completeStep(buildSubmission('showCustomizedQuoteAndContinue', []));
      console.log('show customize quote and cont submit', data);
      data = await this.props.completeStep(buildSubmission('saveAndSendEmail', [{
        key: 'shouldGeneratePdfAndEmail',
        value: 'No',
      }]));
      console.log('should generate pdf and email submit', data);
      data = await this.props.completeStep(buildSubmission('askAdditionalQuestions', []));
      console.log('ask additional questions submit', data);
      data = await this.props.completeStep(buildSubmission('askScheduleInspectionDates', []));
      console.log('Last data');
      this.context.router.push('thankyou');
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="workflow-steps">
        <button
          className="btn btn-primary"
          onClick={this.submit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default (graphql(gql `
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input) {
      name
      completedSteps
    }
  }
`, { name: 'completeStep' })(Customize));
