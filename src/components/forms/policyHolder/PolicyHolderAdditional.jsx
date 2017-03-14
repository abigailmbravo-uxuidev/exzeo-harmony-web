import { reduxForm } from 'redux-form';
import localStorage from 'localStorage';
import moment from 'moment';
import _ from 'lodash';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PolicyHolderAdditionalForm from './PolicyHolderAdditionalForm';

const graphqlQuery = graphql(gql `
  query GetActiveStep($workflowId:ID!) {
    steps(id: $workflowId) {
      name
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
  reduxForm({ form: 'PolicyHolderAdditional' }),
  connect()
)(PolicyHolderAdditionalForm);
