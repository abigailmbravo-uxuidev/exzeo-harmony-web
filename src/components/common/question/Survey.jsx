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
        answerType: PropTypes.oneOf(['email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
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
  shouldComponentUpdate(nextProps) {
    if (!nextProps.data.loading) {
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
  handleChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }
  render() {
    const { questions } = this.props.data;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group" role="group">
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
          <div className="form-group submit-button-group">
            {/*
            <button type="reset" className="btn-secondary" onClick={this.resetForm}>Reset</button>
            */}
            <button type="submit" className="btn-primary">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Survey;
