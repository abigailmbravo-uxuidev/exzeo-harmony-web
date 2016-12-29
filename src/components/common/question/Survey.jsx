import React, { PropTypes } from 'react';
import Question from './Question';
import DependentQuestion from './DependentQuestion';

const Survey = ({ questions, styleName, answers, handleSubmit, handleChange }) => (
  <form className={`fade-in ${styleName || ''}`} id="survey" onSubmit={handleSubmit}>
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
      <button className="btn btn-primary" type="submit" form="survey">next</button>
    </div>
  </form>
);


Survey.propTypes = {
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

export default Survey;
