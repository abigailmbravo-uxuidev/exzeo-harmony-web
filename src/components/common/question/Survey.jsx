import React, { Component, PropTypes } from 'react';
import Question from './Question';

class Survey extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
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
  }
  // componentWillReceiveProps(nextProps) {
  //   if (!nextProps.data.loading && !Object.keys(this.state).length) {
  //     this.resetForm(nextProps);
  //     return true;
  //   }
  //   return false;
  // }
  resetForm = (nextProps) => {
    let questions;
    if (nextProps) {
      questions = nextProps.questions;
    } else {
      questions = this.props.questions;
    }
    if (questions && questions.length > 0) {
      const answerState = questions.reduce((values, question) => {
        switch (question.answerType) {
          case 'radio':
            if (question.answers && question.answers.length > 0) {
              // eslint-disable-next-line no-param-reassign
              values[question.id] = question.answers[0].answer;
              return values;
            }
          case 'range': // eslint-disable-line no-fallthrough
            values[question.id] = 50; // eslint-disable-line no-param-reassign
            break;
          case 'bool':
            values[question.id] = false; // eslint-disable-line no-param-reassign
            break;
          default:
            values[question.id] = ''; // eslint-disable-line no-param-reassign
            break;
        }
        return values;
      }, {});
      this.setState(answerState);
    }
  }
  handleChange = (event) => {
    this.props.handleChange(event);
  }
  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.props.handleSubmit();
  }
  render() {
    console.log('SURVEY: ', this);
    const { questions } = this.props;
    return (
      <form className="fade-in" id="survey" onSubmit={this.handleSubmit}>
        <div className="form-group survey-wrapper" role="group">
          {questions && questions.length > 0 ?
            questions.map((question, index) => (
              <Question
                key={index}
                question={question}
                answer={this.props.answers[question.question]}
                handleChange={this.handleChange}
              />
            )) : null
          }
        </div>
      </form>
    );
  }
}

export default Survey;
