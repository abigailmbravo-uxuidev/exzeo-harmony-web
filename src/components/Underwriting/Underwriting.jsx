import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import { Redirect } from 'react-router';
import _ from 'lodash';

import Footer from '../Common/Footer';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import FieldGenerator from '../Form/FieldGenerator';

const handleFormSubmit = async (data, dispatch, props) => {
  await props.updateQuote({ data, quoteNumber: props.quote.quoteNumber });
  props.history.replace('customize');
};

const handleGetQuestions = state => (state.quoteState.state && Array.isArray(state.quoteState.state.underwritingQuestions) ? state.quoteState.state.underwritingQuestions: []);

const handleInitialize = (state) => {
  const questions = handleGetQuestions(state);
  const data = state.quoteState.quote;
  const values = {};
  questions.forEach((question) => {
    values[question.name] = _.get(data, `underwritingAnswers.${question.name}.answer`);

    const defaultAnswer = question && question.answers &&
    _.find(question.answers, { default: true }) ?
      _.find(question.answers, { default: true }).answer : null;

    if (defaultAnswer && question.hidden) {
      values[question.name] = defaultAnswer;
    }
  });

  return values;
};

export const Underwriting = (props) => {
  const { handleSubmit, fieldValues, quote, isHardStop, showSnackBar, isLoading } = props;
  const questions = props.questions;

  return (
    <div className="route-content">
      {isHardStop &&
        <Redirect to="error" />
      }
      <SnackBar show={showSnackBar} timer={3000}>
        <p>Please correct errors.</p>
      </SnackBar>
      <Form id="Underwriting" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            {_.sortBy(questions, ['order']).map((question, index) =>
              <FieldGenerator
                key={index}
                autoFocus={index === 0}
                data={quote}
                question={question}
                values={fieldValues}
              />
            )}
          </div>
          <div className="workflow-steps">
            <button
              tabIndex="0"
              className="btn btn-primary"
              type="submit"
              form="Underwriting"
              disabled={isLoading}
              data-test="submit"
            >next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

Underwriting.propTypes = {
  quote: PropTypes.shape(),
  questions: PropTypes.arrayOf(PropTypes.shape())
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  showSnackBar: state.appState.showSnackBar,
  fieldValues: _.get(state.form, 'Underwriting.values', {}),
  initialValues: handleInitialize(state),
  questions: handleGetQuestions(state),
  quote: state.quoteState.quote,
  isHardStop: state.quoteState.state ? state.quoteState.state.isHardStop : false
});


export default connect(mapStateToProps)(reduxForm({
  form: 'Underwriting',
  onSubmitFail: failedSubmission,
  enableReinitialize: true,
})(Underwriting));
