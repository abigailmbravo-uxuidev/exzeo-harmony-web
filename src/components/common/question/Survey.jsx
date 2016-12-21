import React, { Component, PropTypes } from 'react';
import Question from './Question';

class Survey extends Component {
  static propTypes = {
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
    styleName: PropTypes.string,
  }
  handleChange = (event) => {
    this.props.handleChange(event);
  }
  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.props.handleSubmit();
  }
  render() {
    // console.log('SURVEY: ', this);
    const { questions, styleName } = this.props;
    return (
      <form className={`fade-in ${styleName || ''}`} id="survey" onSubmit={this.handleSubmit}>
        <div className="form-group survey-wrapper" role="group">
          {questions && questions.length > 0 ?
            questions.map((question, index) => (
              <Question
                key={index}
                question={question}
                answer={this.props.answers[question.name] || ''}
                handleChange={this.handleChange}
              />
            )) : null
          }
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="survey">next</button>
        </div>
      </form>
    );
  }
}

export default Survey;
