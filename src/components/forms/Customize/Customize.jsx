import React, { Component, PropTypes } from 'react';
import { reduxForm, Form, reset, change } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import localStorage from 'localStorage';
import _ from 'lodash';
import Footer from '../../common/Footer';
import DependentQuestion from '../../question/DependentQuestion';
import { setDetails } from '../../../actions/detailsActions';

let defaultState;
let defaultQuestions;
let defaultDetails;

class Customize extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.any, // eslint-disable-line
    details: PropTypes.any, // eslint-disable-line
    completeStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    styleName: PropTypes.string
  }


  static contextTypes = {
    router: PropTypes.any
  }
  // TODO: push up data props into state
  state = {
    updated: false
  }

  componentWillMount() {
  }


  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
    (!newProps.data.loading &&
      this.props.data.steps &&
      // newProps.data.steps &&
      this.props.data.steps.name !== newProps.data.steps.name
    )) {
      // console.log('REFETCHED DATA FROM RECEIVE PROPS', newProps.data);
      const { steps } = newProps.data;
      const { state } = this;
      // Set up default values
      const questions = steps.questions;
      const realQuote = steps.data[0];

      defaultQuestions = _.cloneDeep(questions);

      defaultDetails = _.cloneDeep(steps.details);

      console.log('STATE AFTER CONVERIONS: ', realQuote);

      questions.forEach((question) => {
        if (question.readOnlyValue) {
          state[question.name] = question.readOnlyValue;
        } else if (question.defaultValueLocation) {
          const val = _.get(realQuote, question.defaultValueLocation);
          state[question.name] = val;
          this.props.dispatch(change('Customize', question.name, _.get(realQuote, question.defaultValueLocation)));
        } else {
          state[question.name] = '';
        }
      });


      state.quoteInfo = realQuote;

      // Go through and check if percent or currency is provided as initial
      questions.forEach((question) => {
        if (question.conditional && question.conditional.dependency &&
          question.answers && question.answers.length > 0) {
          const exists = question.answers.find(a => a.answer == state[question.name]); // eslint-disable-line
          if (!exists) {
            const { dependency } = question.conditional;
            const parentValue = _.get(state, dependency.parent);

            const stateValue = state[question.name];
            // const calculatedValue = parentValue / 100;
            const newValue = question.answers.find(a =>
              (dependency.type === 'percent' ? (parentValue * a.answer) / 100 : parentValue * a.answer) === stateValue);
            if (newValue) {
              state[question.name] = newValue.answer;
            }
          }
        }
      });

      defaultState = _.cloneDeep(state);
      this.setState(state);
    }
  }

  handleChange = (event) => {
    const details = this.props.data.steps.details;

    const premiumIndex = _.indexOf(details, _.find(details, { name: 'Annual Premium' }));
    details.splice(premiumIndex, 1, { name: 'Annual Premium', value: '-' });

    const coverageAIndex = _.indexOf(details, _.find(details, { name: 'Coverage A' }));
    details.splice(coverageAIndex, 1, { name: 'Coverage A', value: '-' });

    this.props.dispatch(setDetails(details));


    const { state } = this;
    state[event.target.name] = event.target.value;
    state.updated = true;
    this.setState(state);
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    const { state } = this;
    if (state.updated) {
      // Do two mutations
      state.updated = false;
      this.setState(state);
    }

    this.props.completeStep(this.buildSubmission(
      'askToCustomizeDefaultQuote',
     { shouldCustomizeQuote: 'No' }
   )).then((updatedModel) => {
     const activeLink = updatedModel.data.completeStep.link;
     this.context.router.push(`${activeLink}`);
   }).catch((error) => {
      // this.context.router.transitionTo('/error');
      console.log('errors from graphql', error); // eslint-disable-line
   });
  }

  resetState = () => {
    this.props.dispatch(reset('Customize'));
    this.props.dispatch(setDetails(defaultDetails));

    this.props.data.steps.questions = [];
    const self = this;
    setTimeout(() => {
      self.props.data.steps.questions = defaultQuestions;

      self.setState(defaultState);
    }, 1);

    this.setState(defaultState);
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

  convertQuoteStringsToNumber(quote) {
    for (const obj in quote) {
      if (_.isString(quote[obj])) {
        quote[obj] = (Number(quote[obj]) ? Number(quote[obj]) : quote[obj]);
      }
    }
    return quote;
  }

  recalculateQuote = async () => {
    const { completeStep } = this.props;

    const updatedQuote = this.convertQuoteStringsToNumber(this.state);
    const updatedQuoteResult = {
      dwellingAmount: updatedQuote.dwellingAmount,
      otherStructuresAmount: ((updatedQuote.otherStructuresAmount / 100) * updatedQuote.dwellingAmount),
      personalPropertyAmount: ((updatedQuote.personalPropertyAmount / 100) * updatedQuote.dwellingAmount),
      personalPropertyReplacementCostCoverage: (updatedQuote.personalPropertyReplacementCostCoverage || false)
    };

    try {
      let data = await completeStep(this.buildSubmission('askToCustomizeDefaultQuote', { shouldCustomizeQuote: 'Yes' }));
      // console.log('THIS IS shouldCustomizeQuote', data, updatedQuote);

      data = await completeStep(this.buildSubmission('customizeDefaultQuote', updatedQuoteResult));
      // console.log('THIS IS customizeDefaultQuote', data);
      data = await this.props.data.refetch();

      this.props.dispatch(setDetails(data.data.steps.details));

      this.state.updated = false;
      this.setState(this.state);
      // console.log('REFETCHED DATA', data);
      // location.reload();
    } catch (error) {
      console.log('Error: ', error); // eslint-disable-line
      this.context.router.push('error');
    }
  }

  save = async () => {
    const { completeStep } = this.props;
    try {
      let data = await completeStep(this.buildSubmission('askToCustomizeDefaultQuote', { shouldCustomizeQuote: 'No' }));
      console.log('ask to customize no', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('showCustomizedQuoteAndContinue', {}));
      console.log('show customize', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('saveAndSendEmail',
        { shouldGeneratePdfAndEmail: 'No' },
      ));
      console.log('save and send email', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('askAdditionalQuestions', {}));
      console.log('ask additional questions', data); // eslint-disable-line

      data = await completeStep(this.buildSubmission('askScheduleInspectionDates', {}));
      console.log('ask to inspection', data); // eslint-disable-line

      this.context.router.push('thankyou');
    } catch (error) {
      console.log('Error: ', error); // eslint-disable-line
      this.context.router.push('error');
    }
  }

  submit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.state.updated ? this.update() : this.handleOnSubmit();
  }

  render() {
    const {
      styleName,
      handleSubmit
    } = this.props;
    let questions = [];

    if (this.props.data && this.props.data.steps) {
      questions = _.sortBy(this.props.data.steps.questions, ['order']);
    }
    return (
      <div className="workflow-content">
        <section className="">
          <div className="fade-in">
            <Form
              className={`fade-in ${styleName || ''}`}
              id="Customize"
              onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="form-group survey-wrapper" role="group">
                {questions && questions.map((question, index) => (
                  <DependentQuestion
                    data={this.state.quoteInfo}
                    question={question}
                    answers={this.state}
                    handleChange={this.handleChange}
                    key={index}
                  />
                ))}

              </div>
              <div className="workflow-steps">
                {this.state.updated && <button
                  className="btn btn-secondary"
                  onClick={this.resetState}
                  type="button"
                > Reset </button>
                }
                {this.state.updated && <button
                  className="btn btn-primary"
                  onClick={this.recalculateQuote}
                  type="button"
                > Recalculate </button>
                }
                {!this.state.updated && <button
                  className="btn btn-primary"
                  type="submit"
                  form="Customize"
                  disabled={this.state.updated}
                > Next </button>
                }
              </div>
              <Footer />
            </Form>
          </div>
        </section>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  details: state.details.get('details')
});

const CustomizeQuote = reduxForm({
  form: 'Customize',
})(Customize);

// const selector = formValueSelector('Customize'); // <-- same as form name

export default (connect(mapStateToProps))(graphql(gql `
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
          workflowId: localStorage.getItem('newWorkflowId'),
        },
      },
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
    `, { name: 'completeStep' })(CustomizeQuote)));
