import React, { Component, PropTypes } from 'react';
import Question from './Question';

class Survey extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    data: PropTypes.shape({
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
    }),
  }
  state = {}
  componentDidlMount() {
    this.resetForm();
  }
  resetForm = (event) => {
    if (event) event.preventDefault();
    const { underwritingQuestions } = this.props.data;
    console.log(underwritingQuestions);
    console.log(this.props);
    if (underwritingQuestions && underwritingQuestions.length > 0) {
      const answerState = underwritingQuestions.reduce((values, question) => {
        switch (question.answerType) {
          case 'radio':
            if (question.answers && question.answers.length > 0) {
              // eslint-disable-next-line no-param-reassign
              values[question.id] = question.answers[0].answer;
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
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  }
  render() {
    const { underwritingQuestions } = this.props.data;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group" role="group">
          {underwritingQuestions && underwritingQuestions.length > 0 ?
            underwritingQuestions.map((question, index) => (
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
