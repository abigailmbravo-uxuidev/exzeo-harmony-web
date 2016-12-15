import React, { Component, PropTypes } from 'react';
import Question from './Question';

class Survey extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    data: PropTypes.shape({
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
    }),
  }
  state = {}
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && !Object.keys(this.state).length) {
      this.resetForm(nextProps);
      return true;
    }
    return false;
  }
  resetForm = (nextProps) => {
    let questions;
    if (nextProps) {
      questions = nextProps.data.questions;
    } else {
      questions = this.props.data.questions;
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
  validateForm = () => {
    // Put in some sort of form validation later
    if (!Object.keys(this.state).length) {
      return false;
    }
    // eslint-disable-next-line
    for (const key in this.state) {
      if (!this.state[key]) {
        return false;
      }
    }
    return true;
  }
  handleChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.handleSubmit(this.state);
    } else {
      console.log('nope'); // eslint-disable-line
    }
  }
  render() {
    console.log('SURVEY: ', this);
    const { questions } = this.props.data;
    return (
      <form className="fade-in" id="survey" onSubmit={this.handleSubmit}>
        <div className="form-group survey-wrapper" role="group">
          {questions && questions.length > 0 ?
            questions.map((question, index) => (
              <Question
                key={index}
                question={question}
                handleChange={this.handleChange}
                value={this.state[question.id]}
              />
            )) : null
          }
        </div>
      </form>
    );
  }
}

export default Survey;
