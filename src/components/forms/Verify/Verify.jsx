import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import VerifyForm from './VerifyForm';

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


              billToType
              billTold
              billPlan
              eligibilty
              policyHolders{
                order
                entityType
                companyName
                firstName
                lastName
                primaryPhoneNumber
                secondaryPhoneNumber
                emailAddress
              }
              policyHolderMailingAddress{
                address1
                address2
                city
                state
                zip
              }
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
                yearBuilt
                floodZone
                residenceType
                constructionType
                territory
                physicalAddress {
                  address1
                  address2
                  city
                  state
                  zip
                  id
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
            address2
            city
            state
            zip
          }
        }
        ... on Address {
          address1
          address2
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


const mapStateToProps = (state) => {
  const selector = formValueSelector('Verify');
  const editConfirmAdditionalInterests = selector(state, 'editConfirmAdditionalInterests');
  const editConfirmPolicyHolder = selector(state, 'editConfirmPolicyHolder');
  const editMailingAddress = selector(state, 'editMailingAddress');
  const editProperty = selector(state, 'editProperty');
  const confirmProperyDetails = selector(state, 'confirmProperyDetails');
  const confirmQuoteDetails = selector(state, 'confirmQuoteDetails');
  const confirmPolicyHolderDetails = selector(state, 'confirmPolicyHolderDetails');
  const confirmAdditionalInterestsDetails = selector(state, 'confirmAdditionalInterestsDetails');

  const effectiveDate = selector(state, 'effectiveDate');

  return {
    initialValues: {
      policyHolderMailingAddress: {},
      additionalInterests: [],
      policyHolders: []
    },
    state,
    effectiveDate,
    editConfirmAdditionalInterests,
    editConfirmPolicyHolder,
    editProperty,
    editMailingAddress,
    confirmProperyDetails,
    confirmQuoteDetails,
    confirmPolicyHolderDetails,
    confirmAdditionalInterestsDetails
  };
};

export default compose(
  graphqlQuery,
  graphqlMutation,
  reduxForm({ form: 'Verify' }),
  connect(mapStateToProps)
)(VerifyForm);
