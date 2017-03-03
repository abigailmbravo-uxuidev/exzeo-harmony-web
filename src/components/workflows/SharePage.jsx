/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form, reset } from 'redux-form';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import Footer from '../common/Footer';
import EmailPopup from '../common/EmailPopup';

class SharePage extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string,
    completeStep: PropTypes.func,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool // eslint-disable-line
  }

  static contextTypes = {
    router: PropTypes.any
  }
  // TODO: push up data props into state
  state = {
    quote: {},
    showEmailPopup: false
  }

  componentWillMount() {
  }

  // componentWillReceiveProps(newProps) {
  //   if ((!this.props.data.steps && newProps.data.steps) ||
  //     (!newProps.data.loading &&
  //       this.props.data.steps &&
  //       // newProps.data.steps &&
  //       this.props.data.steps.name !== newProps.data.steps.name
  //     )) {
  //     const { steps } = newProps.data;
  //
  //     const { state } = this;
  //       // Set up default values
  //     const quoteData = steps.data[0];
  //
  //     this.setState({ quote: quoteData });
  //
  //     console.log('this.state', quoteData);
  //   }
  // }

  buildSubmission = (stepName, data) => ({
    variables: {
      input: {
        workflowId: localStorage.getItem('newWorkflowId'),
        stepName,
        data
      }
    }
  });

  noShareSubmit = () => {
    if (event && event.preventDefault) { event.preventDefault(); }

    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'sendEmailOrContinue',
          data: { shouldSendEmail: 'No' }
        }
      }
    }).then((updatedShouldGeneratePdfAndEmail) => {
      console.log('UPDATED MODEL : ', updatedShouldGeneratePdfAndEmail);
      const activeLink = updatedShouldGeneratePdfAndEmail.data.completeStep.link;
      this.context.router.push(`${activeLink}`);
    }).catch((error) => {
        // this.context.router.transitionTo('/error');
        console.log('errors from graphql', error); // eslint-disable-line
      this.context.router.push('error');
    });
  }

  shareQuoteSubmit = async (event) => {
    if (event && event.preventDefault) { event.preventDefault(); }

    try {
      const state = this.state;
      state.submitting = true;
      this.setState(state);

      await this.props.completeStep({
        variables: {
          input: {
            workflowId: localStorage.getItem('newWorkflowId'),
            stepName: 'sendEmailOrContinue',
            data: { shouldSendEmail: 'Yes' }
          }
        }
      });

      await this.props.completeStep({
        variables: {
          input: {
            workflowId: localStorage.getItem('newWorkflowId'),
            stepName: 'askEmail',
            data: event
          }
        }
      });

      this.closeShareSubmit();
    } catch (error) {
      // this.context.router.transitionTo('/error');
      console.log('errors from graphql', error); // eslint-disable-line
      this.context.router.push('error');
    }
  }

  closeShareSubmit = () => {
    this.state.showEmailPopup = false;
    this.setState(this.state);
    this.props.dispatch(reset('ShareEmail'));
  }

  shareQuote = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.state.showEmailPopup = true;

    this.setState(this.state);
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.noShareSubmit();
  }

  buildSubmission = (stepName, data) => ({
    variables: {
      input: {
        workflowId: localStorage.getItem('newWorkflowId'),
        stepName,
        data
      }
    }
  });

  render() {
    const { styleName, handleSubmit } = this.props;

    // let quote = null;
    // if (this.props.data && this.props.data.steps) {
    //   console.log('the quote -----------------', this.props.data.steps.data[0]);
    //   quote = this.props.data.steps.data[0];
    // }
    //
    // if (quoteTest) {
    //   quote = quoteTest;
    // }

    return (
      <div className="workflow-content">
        <section className="section-share">
          <div className="fade-in">
            <Form className={`fade-in ${styleName || ''}`} id="SharePage" onSubmit={handleSubmit(this.handleOnSubmit)} noValidate>
              <div className="form-group detail-wrapper">
                <section className="section-instructions">
                  <h3 className="section-group-header"><i className="fa fa-share-alt" /> Share</h3>
                  <p>To SHARE this quote as a PDF via email, click the <a className="btn-link" href="">SHARE</a> button</p>
                </section>
                <section className="section-instructions">
                  <h3 className="section-group-header"><i className="fa fa-arrow-circle-right" /> Continue</h3>
                  <p>To CONTINUE the quote process, you will need the following</p>
                  <ul>
                    <li>Mortgage information</li>
                    <li>Name and email address of additional owners</li>
                    <li>Name and address of any other additional insured to add to this policy</li>
                  </ul>
                  <p>When you are prepared to move forward, click the <a className="btn-link" href="">NEXT</a> button</p>
                </section>
                <section className="section-instructions">
                  <h3 className="section-group-header"><i className="fa fa-quote-left" /> New Quote</h3>
                  <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <a className="btn-link" href="/"><i className="fa fa-th-large" /> Dasboard</a> tab</p>
                </section>
              </div>
              <div className="workflow-steps">
                <button className="btn btn-secondary" type="button" onClick={this.shareQuote}>share</button>
                <button className="btn btn-primary" type="submit">next</button>
              </div>
            </Form>
          </div>  
        </section>
        <Footer />
        <EmailPopup
          state={this.state}
          showEmailPopup={this.state.showEmailPopup}
          primaryButtonHandler={this.shareQuoteSubmit}
          secondaryButtonHandler={this.closeShareSubmit}
        />
      </div>
    );
  }
}

SharePage = reduxForm({
  form: 'SharePage' // a unique identifier for this form
})(SharePage);

SharePage = connect()(graphql(gql `
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
    })(graphql(gql `
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
    `, { name: 'completeStep' })(SharePage)));

export default SharePage;
