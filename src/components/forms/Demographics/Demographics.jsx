import { reduxForm } from 'redux-form';
import localStorage from 'localStorage';
import moment from 'moment';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import DemographicsForm from './DemographicsForm';

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
