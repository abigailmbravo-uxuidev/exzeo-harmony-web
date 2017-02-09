import React, { PropTypes, Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector, Field, change } from 'redux-form';
import Question from './Question';
import DependentQuestion from './DependentQuestion';
import Footer from '../Footer';
import _ from 'lodash';

class Survey extends Component {

  componentWillMount() {
    console.log('this.props', this.props);

    const questions = this.props.questions;

    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];
      if (question.hidden) {
        const defaultField = _.find(question.answers, 'default');
        this.props.dispatch(change('survey', question.name, defaultField.answer));
      }
    }
  }

  render() {
    const { dispatch, questions, styleName, answers, handleSubmit, handleOnSubmit, handleChange,
       pristine, reset, submitting, error, invalid } = this.props;
    return (
      <Form
        className={`fade-in ${styleName || ''}`} id="survey" onSubmit={handleSubmit(handleOnSubmit)}
        noValidate
      >
        <div className="form-group survey-wrapper" role="group">
          {questions && questions.length > 0 ?
         questions.map((question, index) => (
           question.conditional && question.conditional.value ?
             <DependentQuestion
               key={index}
               question={question}
               answer={answers[question.name].value}
               disabled={answers[question.name].disabled || false}
               hidden={answers[question.name].hidden || false}
               handleChange={handleChange}
               answers={answers}
             /> : <Question
               key={index}
               question={question}
               answer={answers[question.name].value}
               disabled={answers[question.name].disabled || false}
               hidden={answers[question.name].hidden || false}
               handleChange={handleChange}
             />
         )) : null
       }
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="survey" disabled={submitting}>next</button>
        </div>
        <Footer />
      </Form>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.any,//eslint-disable-line
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  questions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string,
      image: PropTypes.string,
    })),
    optional: PropTypes.bool,
    styleName: PropTypes.string,
  })),
  answers: PropTypes.object, //eslint-disable-line
  styleName: PropTypes.string,
};

export default reduxForm({
  form: 'survey', // a unique identifier for this form
})(Survey);
