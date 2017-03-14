import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import localStorage from 'localStorage';
import _ from 'lodash';
import CustomizeForm from './CustomizeForm';

const mapStateToProps = state => ({
  details: state.details.get('details'),
  fieldValues: _.get(state.form, 'Customize.values', {})
});

const graphqlQuery = graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
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
                    format
                  }
                  otherStructures {
                    amount
                    format
                  }
                  personalProperty {
                    amount
                    format
                  }
                  lossOfUse {
                    amount
                    format
                  }
                  personalLiability {
                    amount
                    format
                  }
                  medicalPayments {
                    amount
                    format
                  }
                  ordinanceOrLaw {
                    amount
                    format
                  }
                  moldProperty {
                    amount
                    format
                  }
                  moldLiability {
                    amount
                    format
                  }
                }
                coverageOptions {
                  personalPropertyReplacementCostCoverage: personalPropertyReplacementCost {
                    answer
                  }
                  sinkholePerilCoverage {
                    answer
                  }
                  propertyIncidentalOccupanciesMainDwelling {
                    answer
                  }
                  propertyIncidentalOccupanciesOtherStructures {
                    answer
                  }
                  liabilityIncidentalOccupancies {
                    answer
                  }
                }
                deductibles {
                  hurricane {
                    amount
                    format
                  }
                  sinkhole {
                    amount
                    format
                  }
                  allOtherPerils {
                    amount
                    format
                  }
                }
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
            completedSteps
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
          coverageLimits {
            dwelling {
              maxAmount
              minAmount
              amount
              format
            }
            otherStructures {
              amount
              format
            }
            personalProperty {
              amount
              format
            }
            lossOfUse {
              amount
              format
            }
            personalLiability {
              amount
              format
            }
            medicalPayments {
              amount
              format
            }
            ordinanceOrLaw {
              amount
              format
            }
            moldProperty {
              amount
              format
            }
            moldLiability {
              amount
              format
            }
          }
          coverageOptions {
            personalPropertyReplacementCost {
              answer
            }
            sinkholePerilCoverage {
              answer
            }
            propertyIncidentalOccupanciesMainDwelling {
              answer
            }
            propertyIncidentalOccupanciesOtherStructures {
              answer
            }
            liabilityIncidentalOccupancies {
              answer
            }
          }
          deductibles {
            hurricane {
              amount
              format
            }
            sinkhole {
              amount
              format
            }
            allOtherPerils {
              amount
              format
            }
          }
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
  reduxForm({ form: 'Customize' }),
  connect(mapStateToProps)
)(CustomizeForm);
