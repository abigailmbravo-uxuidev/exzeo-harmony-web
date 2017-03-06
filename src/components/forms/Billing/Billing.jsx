import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import _ from 'lodash';
import BillingForm from './BillingForm';

const graphqlQuery = graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
            link
            details {
                name
                value
            }
            data {
              ... on Quote {
                property {
                  physicalAddress {
                    address1
                    city
                    state
                    zip
                  }
                }
              }
              ... on Property {
                physicalAddress {
                  address1
                  city
                  state
                  zip
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
                minValue
                maxValue
                defaultAnswer
                step
                answers {
                    label
                    default
                    answer
                    image
                }
                conditional {
                  slider {
                    minLocation
                    maxLocation
                  }
                  display {
                    type
                    operator
                    trigger
                    dependency
                    detail
                    parent
                  }
                  value {
                    type
                    parent
                    value
                  }
                  dependency {
                    type
                    parent
                  }
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
      link
      details {
        name
        value
      }
      data {
        ... on Quote {
          property {
            physicalAddress {
              address1
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
          value {
            type
            parent
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
  reduxForm({ form: 'Billing' }),
  connect(
    state => ({
      fieldValues: _.get(state.form, 'Billing.values', {})
    })
  )
)(BillingForm);
