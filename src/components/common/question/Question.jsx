import React, { PropTypes } from 'react';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import RadioGroup from '../form/RadioGroup';
import BoolInput from '../form/BoolInput';

const Question = (props) => {
  const { answerType, answers } = props.question;
  const { handleChange, answer } = props;
  let formElement;
  if (answerType === 'radio' && answers && answers.length > 0) {
    formElement = answers.length < 6 ?
      <RadioGroup {...props.question} value={answer} handleChange={handleChange} segmented /> :
      <Dropdown {...props.question} value={answer} handleChange={handleChange} />;
  } else if (answerType === 'bool') {
    formElement = (
      <BoolInput
        {...props.question}
        value={answer || false}
        handleChange={handleChange}
        isSwitch
      />);
  } else {
    formElement = (
      <TextInput {...props.question} value={answer} handleChange={handleChange} />
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
};

export default Question;
