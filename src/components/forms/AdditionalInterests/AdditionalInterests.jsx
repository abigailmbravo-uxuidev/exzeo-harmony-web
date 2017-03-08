import { reduxForm } from 'redux-form';
import localStorage from 'localStorage';
import moment from 'moment';
import _ from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AdditionalInterestsForm from './AdditionalInterestsForm';

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
  reduxForm({ form: 'AdditionalInterests' }),
  connect(
    state => ({
      initialValues: {
        effectiveDate: moment().add(5, 'days').format('YYYY-MM-DD')
      },
      fieldValues: _.get(state.form, 'AdditionalInterests.values', {})
    })
  )
)(AdditionalInterestsForm);
