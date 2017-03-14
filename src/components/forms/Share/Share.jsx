import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import ShareForm from './ShareForm';

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
                companyCode
                state
                product
                quoteNumber
                effectiveDate
                endDate
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
      completedSteps
    }
  }
`, { name: 'completeStep' });


export default compose(
  graphqlQuery,
  graphqlMutation,
  reduxForm({ form: 'Share' }),
  connect()
)(ShareForm);
