import React from 'react';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import { reduxForm, Form, change } from 'redux-form';
import _ from 'lodash';

import Footer from '../Common/Footer';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import ReactSelectField from '../Form/inputs/ReactSelectField';

export const closeAndSavePreviousAIs = async (props) => {
  const additionalInterests = props.quote.additionalInterests;

  await props.updateQuote({ data: { additionalInterests }, quoteNumber: props.quote.quoteNumber });
  props.history.replace('additionalInterests');
};

export const handleGetQuestions = (state) => {
  const questions = state.quoteState.state && Array.isArray(state.quoteState.state.uiQuestions) ? state.quoteState.state.uiQuestions: [];

  questions.filter(question => question.name === 'premiumFinance')
    .forEach((q) => {
      if (q && Array.isArray(q.answers)) {
        q.answers.forEach((answer) => {
          answer.displayText = `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`;
          return answer;
        });
      }
      return q;
    });
  return questions;
};

export const handleInitialize = (state) => {
  const uiQuestions = handleGetQuestions(state);
  const quote = state.quoteState.quote || {};
  const values = getInitialValues(uiQuestions, { additionalInterests: _.filter(quote.additionalInterests, ai => ai.type === 'Premium Finance') });
  _.forEach(uiQuestions, (q) => {
    if (!values[q.name]) {
      values[q.name] = '';
    }
  });
  values.isAdditional = true;

  return values;
};

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];


export class PremiumFinance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPremiumFinanceOption: null
    };
  }

  setPremiumFinanceValues = (val) => {
    this.setState({ selectedPremiumFinanceOption: val });
    const selectedPremiumFinance = val;

    if (selectedPremiumFinance) {
      this.props.dispatch(
        batchActions([
          change('PremiumFinance', 'name1', _.get(selectedPremiumFinance, 'AIName1')),
          change('PremiumFinance', 'name2', _.get(selectedPremiumFinance, 'AIName2')),
          change(
            'PremiumFinance',
            'mailingAddress1',
            _.get(selectedPremiumFinance, 'AIAddress1')
          ),
          change('PremiumFinance', 'city', _.get(selectedPremiumFinance, 'AICity')),
          change('PremiumFinance', 'state', _.get(selectedPremiumFinance, 'AIState')),
          change('PremiumFinance', 'zip', String(_.get(selectedPremiumFinance, 'AIZip')))
        ])
      );
    } else {
      this.props.dispatch(
        batchActions([
          change('PremiumFinance', 'name1', ''),
          change('PremiumFinance', 'name2', ''),
          change('PremiumFinance', 'mailingAddress1', ''),
          change('PremiumFinance', 'city', ''),
          change('PremiumFinance', 'state', ''),
          change('PremiumFinance', 'zip', '')
        ])
      );
    }
  };
  handleFormSubmit = async (data) => {
    const additionalInterests = this.props.quote.additionalInterests;
    const premiumFinance1 = _.find(additionalInterests, { order: 0, type: 'Premium Finance' }) || {};
    _.remove(additionalInterests, ai => ai.type === 'Premium Finance');

    if (data.isAdditional) {
      premiumFinance1.name1 = data.name1;
      premiumFinance1.name2 = data.name2;
      premiumFinance1.referenceNumber = data.referenceNumber;
      premiumFinance1.order = 0;
      premiumFinance1.active = true;
      premiumFinance1.type = 'Premium Finance';
      premiumFinance1.mailingAddress = {
        address1: data.mailingAddress1,
        address2: data.mailingAddress2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      };

      additionalInterests.push(premiumFinance1);
    }

    await this.props.updateQuote({ data: { additionalInterests }, quoteNumber: this.props.quote.quoteNumber });
    this.props.history.replace('additionalInterests');
  };

  render() {
    const {
      fieldQuestions,
      quote,
      handleSubmit,
      fieldValues,
      isLoading,
      showSnackBar
    } = this.props;

    return (
      <div className="route-content">
        <SnackBar
          show={showSnackBar}
          timer={3000}>
          <p>Please correct errors.</p>
        </SnackBar>
        <Form id="PremiumFinance" onSubmit={handleSubmit(this.handleFormSubmit)} >
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <h3 className="section-group-header"><i className="fa fa-money" /> Premium Finance</h3>
              {fieldValues.isAdditional && (
                <ReactSelectField
                  label="Top Premium Finance"
                  name="premiumFinance"
                  searchable
                  labelKey="displayText"
                  autoFocus
                  value={this.state.selectedPremiumFinanceOption}
                  answers={getAnswers('premiumFinance', fieldQuestions)}
                  onChange={val => this.setPremiumFinanceValues(val)}
                />
              )}
              {fieldQuestions &&
              _.sortBy(
                _.filter(fieldQuestions, q => q.name !== 'premiumFinance'),
                'sort'
              ).map((question, index) => (
                <FieldGenerator
                  autoFocus={index === 1}
                  data={quote}
                  question={question}
                  values={fieldValues}
                  key={index}
                />
              ))}
            </div>
            <div className="workflow-steps">
              <span className="button-label-wrap">
                <span className="button-info">Oops! There is no Premium Finance</span>
                <button className="btn btn-secondary" type="button" onClick={() => closeAndSavePreviousAIs(this.props)}>Go Back</button>
              </span>
              <button className="btn btn-primary" type="submit" form="PremiumFinance" disabled={isLoading}>Save</button>
            </div>
            <Footer />
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  showSnackBar: state.appState.showSnackBar,
  appState: state.appState,
  fieldValues: _.get(state.form, 'PremiumFinance.values', {}),
  initialValues: handleInitialize(state),
  fieldQuestions: handleGetQuestions(state),
  quote: state.quoteState.quote || {},
});

export default connect(mapStateToProps)(reduxForm({
  form: 'PremiumFinance',
  onSubmitFail: failedSubmission
})(PremiumFinance));
