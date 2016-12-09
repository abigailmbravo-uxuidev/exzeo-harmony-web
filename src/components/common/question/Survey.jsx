import React, { Component, PropTypes } from 'react';
import Question from './Question';

class Survey extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      question: PropTypes.string,
      description: PropTypes.string,
      answerType: PropTypes.oneOf(['email', 'password', 'text', 'number', 'radio', 'bool']),
      answers: PropTypes.arrayOf(PropTypes.string),
      optional: PropTypes.bool,
    })),
  }
  state = {}
  componentWillMount() {
    // set state for the questions in props
    const { questions } = this.props;
    if (questions && questions.length > 0) {
      const answerState = questions.reduce((values, question) => {
        switch (question.answerType) {
          case 'radio':
            if (question.answers && question.answers.length > 0) {
              values[question.id] = question.answers[0]; // eslint-disable-line no-param-reassign
              return values;
            }
          case 'bool': // eslint-disable-line no-fallthrough
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
  render() {
    const { questions } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
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
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    );
  }
}

export default Survey;
