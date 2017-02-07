import React, { PropTypes } from 'react';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import RadioGroup from '../form/RadioGroup';
import BoolInput from '../form/BoolInput';
import SliderInput from '../form/SliderInput';
import ListSelection from '../form/ListSelection';
import DisplayInput from '../form/DisplayInput';
import Heading from '../form/Heading';

const Question = ({ question, answer, disabled, hidden, handleChange }) => {
  const inputProps = {
    ...question,
    value: answer,
    handleChange,
    disabled,
  };
  switch (question.answerType) {
    case 'radio':
      if (question.answers && question.answers.length > 0) {
        if (question.answers.length > 6) {
          return <Dropdown {...inputProps} />;
        }
        const maxChars = window.innerWidth / (12 * question.answers.length);
        let isDropdown = false;
        question.answers.some((a) => {
          isDropdown = a.answer && a.answer.length > maxChars;
          return isDropdown;
        });
        return isDropdown ? <Dropdown {...inputProps} /> : <RadioGroup {...inputProps} segmented />;
      }
    case 'bool': // eslint-disable-line
      return <BoolInput {...inputProps} isSwitch />;
    case 'range':
    case 'slider':
      return <SliderInput {...inputProps} />;
    case 'list':
      return <ListSelection {...inputProps} />;
    case 'display':
      return <DisplayInput {...inputProps} />;
    case 'heading':
      return <Heading {...inputProps} />;
    default:
      return <TextInput {...inputProps} />;
  }
};

Question.propTypes = {
  question: PropTypes.shape({
    name: PropTypes.string,
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.oneOf([
      'heading',
      'string',
      'email',
      'password',
      'text',
      'number',
      'date',
      'range',
      'slider',
      'tel',
      'search',
      'radio',
      'bool',
      'display',
    ]),
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
      ]),
      display: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
      ]),
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
