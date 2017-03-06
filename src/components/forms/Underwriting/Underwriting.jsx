import { reduxForm } from 'redux-form';
import localStorage from 'localStorage';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UnderwritingForm from './UnderwritingForm';

const graphqlQuery = graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
            details {
                name
                value
            }
            questions {
                hidden
                name
                validations
                question
                answerType
                description
                minValue
                maxValue
                defaultAnswer
                answers {
                    default
                    answer
                    image
                }
                conditional {
                    display {
                        type
                        operator
                        trigger
                        dependency
                        detail
                    }
                }
            }
            completedSteps
            type
            completedSteps
        }
    }`, { options: { variables: { workflowId: localStorage.getItem('newWorkflowId') } } });

const graphqlMutation = graphql(gql `
  mutation CompleteStep($input:CompleteStepInput) {
    completeStep(input:$input) {
      name
      link
      details {
        name
        value
      }
      data {
        ... on Quote {
          coverageLimits {
            dwelling {
              maxAmount
              minAmount
              amount
            }
          }
        }
        ... on Property {
          physicalAddress {
            address1
          }
        }
        ... on Address {
          address1
          city
          state
          zip
          id
        }
      }
      type
      questions {
        name
        question
        answerType
        description
        answers {
          answer
          image
        }
        conditional {
          display {
            type
            operator
            trigger
            dependency
            detail
          }
        }
      }
      completedSteps
    }
  }
`, { name: 'completeStep' });

export default compose(
  graphqlQuery,
  graphqlMutation,
  reduxForm({ form: 'Underwriting' }),
)(UnderwritingForm);
