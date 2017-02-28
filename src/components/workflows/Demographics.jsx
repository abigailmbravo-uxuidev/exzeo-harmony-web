import React, { PropTypes, Component } from 'react';
import { reduxForm, Form } from 'redux-form';
import localStorage from 'localStorage';
import moment from 'moment';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import FieldGenerator from '../form/FieldGenerator';
import Footer from '../common/Footer';

export class DemographicsForm extends Component {
  static propTypes = {
    data: PropTypes.any, // eslint-disable-line
    fieldValues: PropTypes.any, // eslint-disable-line
    initialValues: PropTypes.any, // eslint-disable-line
    completeStep: PropTypes.func,
    initialize: PropTypes.func,
    push: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  state = {
    questions: []
  }

  componentWillMount() {
    this.props.initialize(this.props.initialValues);
  }

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
        // newProps.data.steps &&
        this.props.data.steps.name !== newProps.data.steps.name
      )) {
      const { steps } = newProps.data;
      this.setState({ questions: steps.questions });
    }
  }

  handleOnSubmit = async (data) => {
    const workflowId = localStorage.getItem('newWorkflowId');

    try {
      const result = await this.props.completeStep({
        variables: {
          input: {
            workflowId,
            stepName: 'askAdditionalCustomerData',
            data
          }
        }
      });
      const activeLink = result.data.completeStep.link;
      this.props.push(`${activeLink}`);
    } catch (error) {
      // eslint-disable-next-line
      console.log('errors from graphql', error);
    }
  }

  render() {
    const { data, handleSubmit, fieldValues } = this.props;
    const { steps } = data;

    return (
      <div className="workflow-content">
        <section>
          <div className="fade-in">
            <Form
              className="fade-in"
              id="Demographics"
              onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="form-group survey-wrapper" role="group">
                {steps && steps.questions && steps.questions.map((question, index) =>
                  <FieldGenerator
                    data={this.state.quoteInfo}
                    question={question}
                    values={fieldValues}
                    key={index}
                  />
                )}
                <div className="form-group agentID" role="group">
                  <label htmlFor="agencyID">Agent</label>
                  <select name="agencyID">
                    <option value="60000">Adam Doe</option>
                    <option value="60001">Betsy Doe</option>
                    <option value="60002">Cathy Doe</option>
                    <option value="60003">Daniel Doe</option>
                    <option value="60004">Ethan Doe</option>
                    <option value="60005">Frank Doe</option>
                    <option value="60006">Gail Doe</option>
                    <option value="60007">Helen Doe</option>
                  </select>
                </div>
              </div>
              <div className="workflow-steps">
                <button
                  className="btn btn-primary"
                  type="submit"
                  form="Demographics"
                  disabled={this.props.submitting}
                >
                  next
                </button>
              </div>
              <Footer />
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

const graphqlQuery = graphql(gql `
query GetActiveStep($workflowId:ID!) {
  steps(id: $workflowId) {
    name
    questions {
      readOnlyValue
      defaultValueLocation
      order
      hidden
      name
      validations
      question
      answerType
      description
      defaultAnswer
      step
      answers {
        label
        default
        answer
        image
      }
    }
    completedSteps
    type
  }
}`, {
  options: {
    variables: {
      workflowId: localStorage.getItem('newWorkflowId')
    }
  }
});

const graphqlMutation = graphql(gql `
  mutation CompleteStep($input:CompleteStepInput) {
      completeStep(input:$input) {
          name
          icon
          type
          link
      }
  }
`, { name: 'completeStep' });

export default compose(
  graphqlQuery,
  graphqlMutation,
  reduxForm({ form: 'Demographics' }),
  connect(
    state => ({
      initialValues: {
        effectiveDate: moment().add(5, 'days').format('YYYY-MM-DD')
      },
      fieldValues: _.get(state.form, 'Demographics.values', {})
    })
  )
)(DemographicsForm);
