import React, { Component, PropTypes } from 'react';
import { Form } from 'redux-form';
import localStorage from 'localStorage';
import _ from 'lodash';
import FieldGenerator from '../../form/FieldGenerator';
import Footer from '../../common/Footer';
import { setDetails } from '../../../actions/detailsActions';

/* eslint-disable */
function convertQuoteStringsToNumber(quote) {
  for (const obj in quote) {
    if (_.isString(quote[obj])) {
      quote[obj] = (Number(quote[obj]) ? Number(quote[obj]) : quote[obj]);
    }
  }
  return quote;
};
/* eslint-enable */

class CustomizeForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.any, // eslint-disable-line
    details: PropTypes.any, // eslint-disable-line
    fieldValues: PropTypes.any, // eslint-disable-line
    completeStep: PropTypes.func,
    handleSubmit: PropTypes.func,
    initialized: PropTypes.bool,
    initialize: PropTypes.func,
    reset: PropTypes.func,
    push: PropTypes.func
  }

  state = {
    updated: false,
    submitting: false,
    defaultDetails: [],
    questions: {},
    values: {}
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

      questions.forEach((question) => {
        if (question.readOnlyValue) {
          state.values[question.name] = question.readOnlyValue;
        } else if (question.defaultValueLocation) {
          const val = _.get(realQuote, question.defaultValueLocation);
          state.values[question.name] = val;
        } else {
          state.values[question.name] = '';
        }
      });

      state.questions = questions;
      state.quoteInfo = realQuote;
      state.defaultDetails = _.cloneDeep(steps.details);
      // Go through and check if percent or currency is provided as initial
      questions.forEach((question) => {
        if (question.conditional && question.conditional.dependency &&
          question.answers && question.answers.length > 0) {
          const exists = question.answers.find(a => a.answer == state.values[question.name]); // eslint-disable-line
          if (!exists) {
            const { dependency } = question.conditional;
            const parentValue = _.get(state.values, dependency.parent);

            const stateValue = state.values[question.name];
            // const calculatedValue = parentValue / 100;
            const newValue = question.answers.find(a =>
              (dependency.type === 'percent' ? (parentValue * a.answer) / 100 : parentValue * a.answer) === stateValue);
            if (newValue) {
              state.values[question.name] = newValue.answer;
            }
          }
        }
      });

      if (!this.props.initialized) {
        this.props.initialize(state.values);
      }
      this.setState(state);
    } else if (newProps.initialized && !newProps.pristine) {
      const { state } = this;
      if (!state.updated) {
        const { details } = this.props.data.steps;

        const premiumIndex = _.indexOf(details, _.find(details, { name: 'Annual Premium' }));
        details.splice(premiumIndex, 1, { name: 'Annual Premium', value: '-' });

        const coverageAIndex = _.indexOf(details, _.find(details, { name: 'Coverage A' }));
        details.splice(coverageAIndex, 1, { name: 'Coverage A', value: '-' });
        this.props.dispatch(setDetails(details));

        state.updated = true;
        this.setState(state);
      }
    } else if (newProps.initialized && newProps.pristine) {
      const { state } = this;
      if (state.updated) {
        state.updated = false;
        this.setState(state);
      }
    }
  }

  resetState = () => {
    this.props.dispatch(setDetails(this.state.defaultDetails));
    this.props.reset();
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

  handleOnSubmit = async () => {
    try {
      let state = this.state;
      state.submitting = true;
      this.setState(state);

      const result = await this.props.completeStep(this.buildSubmission(
        'askToCustomizeDefaultQuote',
        { shouldCustomizeQuote: 'No' }
      ));

      state = this.state;
      state.submitting = false;
      this.setState(state);

      const activeLink = result.data.completeStep.link;
      this.props.push(`${activeLink}`);
    } catch (error) {
      console.log('errors from graphql', error); // eslint-disable-line
    }
  }

  recalculateQuote = async (data) => {
    const updatedQuote = convertQuoteStringsToNumber(data);
    const updatedQuoteResult = {
      dwellingAmount: updatedQuote.dwellingAmount,
      otherStructuresAmount:
        ((updatedQuote.otherStructuresAmount / 100) * updatedQuote.dwellingAmount),
      personalPropertyAmount:
        ((updatedQuote.personalPropertyAmount / 100) * updatedQuote.dwellingAmount),
      personalPropertyReplacementCostCoverage:
        (updatedQuote.personalPropertyReplacementCostCoverage || false)
    };
    try {
      let state = this.state;
      state.submitting = true;
      this.setState(state);

      // reset form pristine to true so that the logic still works
      this.props.reset();

      await this.props.completeStep(this.buildSubmission('askToCustomizeDefaultQuote', { shouldCustomizeQuote: 'Yes' }));
      await this.props.completeStep(this.buildSubmission('customizeDefaultQuote', updatedQuoteResult));
      const result = await this.props.data.refetch();

      this.props.dispatch(setDetails(result.data.steps.details));
      state = this.state;
      state.submitting = false;
      state.updated = false;
      state.details = result.data.steps.details;
      state.quoteInfo = result.data.steps.data[0];
      this.setState(state);

      console.log('this.props.pristine', this.props.pristine);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Error:', error);
      this.props.push('error');
    }
  }

  submit = (data) => {
    this.state.updated ? this.recalculateQuote(data) : this.handleOnSubmit();
  }

  render() {
    const { updated, submitting } = this.state;
    const { handleSubmit } = this.props;
    let questions = [];
    if (this.props.data && this.props.data.steps &&
      this.props.data.steps.questions) {
      questions = _.sortBy(this.props.data.steps.questions, ['order']);
    }
    return (
      <div className="workflow-content">
        <section>
          <div className="fade-in">
            <Form
              className="fade-in"
              id="Customize"
              onSubmit={handleSubmit(this.submit)}
              noValidate
            >
              <div className="form-group survey-wrapper" role="group">
                {questions && questions.map((question, index) =>
                  <FieldGenerator
                    data={this.state.quoteInfo}
                    question={question}
                    values={this.props.fieldValues}
                    key={index}
                  />
                )}
              </div>
              <div className="workflow-steps">
                {updated &&
                  <button
                    className="btn btn-secondary"
                    onClick={this.resetState}
                    type="button"
                    disabled={submitting}
                  >
                    Reset
                  </button>
                }
                <button
                  className="btn btn-primary"
                  type="submit"
                  form="Customize"
                  disabled={submitting}
                >
                  {updated ? 'recalculate' : 'next'}
                </button>
              </div>
            </Form>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

export default CustomizeForm;
