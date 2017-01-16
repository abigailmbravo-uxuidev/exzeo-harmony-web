import React, { PropTypes } from 'react';
import Validation from 'react-validation';
import Question from './Question';
import DependentQuestion from './DependentQuestion';
import Footer from '../Footer';

const Survey = ({ questions, styleName, answers, handleSubmit, handleChange }) => {
  let form;
  const validateFormElement = function validateFormElement(name) {
    form.validate(name);
  };

  return (
    <Validation.components.Form
      className={`fade-in ${styleName || ''}`} id="survey" onSubmit={handleSubmit}
      noValidate ref={(c) => { form = c; }}
    >
      <div className="form-group survey-wrapper" role="group">
        {questions && questions.length > 0 ?
        questions.map((question, index) => (
          question.conditional && question.conditional.value ?
            <DependentQuestion
              validateFormElement={validateFormElement}
              key={index}
              question={question}
              answer={answers[question.name].value}
              disabled={answers[question.name].disabled || false}
              hidden={answers[question.name].hidden || false}
              handleChange={handleChange}
              answers={answers}
            /> : <Question
              validateFormElement={validateFormElement}
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
        <Validation.components.Button className="btn btn-primary" type="submit" form="survey">next</Validation.components.Button>
      </div>
      <Footer />
    </Validation.components.Form>
  );
};

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
