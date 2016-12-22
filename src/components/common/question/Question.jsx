import React, { PropTypes } from 'react';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import RadioGroup from '../form/RadioGroup';
import BoolInput from '../form/BoolInput';
import SliderInput from '../form/SliderInput';

const Question = (props) => {
  const { answerType, answers } = props.question;
  const { handleChange, answer, disabled, hidden } = props;
  if (hidden) return null;
  let formElement;
  if (answerType === 'radio' && answers && answers.length > 0) {
    formElement = answers.length < 6 ?
      (<RadioGroup
        {...props.question}
        value={answer}
        handleChange={handleChange}
        disabled={disabled}
        segmented
      />) :
      (<Dropdown
        {...props.question}
        value={answer}
        handleChange={handleChange}
        disabled={disabled}
      />);
  } else if (answerType === 'bool') {
    formElement = (
      <BoolInput
        {...props.question}
        value={answer || false}
        handleChange={handleChange}
        disabled={disabled}
        isSwitch
      />);
  } else if (answerType === 'range') {
    formElement = (
      <SliderInput
        {...props.question}
        value={answer || null}
        handleChange={handleChange}
        disabled={disabled}
      />
    );
  } else {
    formElement = (
      <TextInput
        {...props.question}
        value={props.answer}
        handleChange={handleChange}
        disabled={disabled}
      />
    );
  }
  return formElement;
};

Question.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string,
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string,
      image: PropTypes.string,
    })),
    optional: PropTypes.bool,
  }),
  answer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default Question;
