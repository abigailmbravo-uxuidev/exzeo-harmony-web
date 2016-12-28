import React, { PropTypes } from 'react';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import RadioGroup from '../form/RadioGroup';
import BoolInput from '../form/BoolInput';
import SliderInput from '../form/SliderInput';
import ListSelection from '../form/ListSelection';

const Question = ({ question, answer, disabled, hidden, handleChange }) => {
  if (hidden) return null;
  const inputProps = {
    ...question,
    value: answer,
    handleChange,
    disabled,
  };
  console.log(question.answerType);
  switch (question.answerType) {
    case 'radio':
      if (question.answers && question.answers.length > 0) {
        return question.answers.length < 6 ?
          <RadioGroup {...inputProps} segmented /> :
          <Dropdown {...inputProps} />;
      }
    case 'bool': // eslint-disable-line
      return <BoolInput {...inputProps} isSwitch />;
    case 'range':
      return <SliderInput {...inputProps} />;
    case 'list':
      return <ListSelection {...inputProps} />;
    default:
      return <TextInput {...inputProps} />;
  }
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
