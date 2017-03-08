import React, { PropTypes } from 'react';
import TextInput from '../inputs/TextInput';
import Dropdown from '../inputs/Dropdown';
import RadioGroup from '../inputs/RadioGroup';
import BoolInput from '../inputs/BoolInput';
import SliderInput from '../inputs/SliderInput';
import ListSelection from '../inputs/ListSelection';
import DisplayInput from '../inputs/DisplayInput';
import Heading from '../inputs/Heading';

const Question = ({ question, answer, disabled, handleChange }) => {
  const inputProps = {
    ...question,
    value: answer,
    handleChange,
    disabled
  };

  if (question.hidden) inputProps.answerType = 'hidden';

  switch (question.answerType) {
    case 'radio': // eslint-disable-line
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
    case 'select':
      return <Dropdown {...inputProps} />;
    case 'list':
      return <ListSelection {...inputProps} />;
    case 'text':
      return <TextInput {...inputProps} />;
    case 'date':
      return <TextInput {...inputProps} />;
    case 'display':
      return <DisplayInput {...inputProps} />;
    case 'heading':
      return <Heading {...inputProps} />;
    default:
      return <RadioGroup {...inputProps} segmented />;
  }
};

Question.propTypes = {
  question: PropTypes.shape({
    hidden: PropTypes.bool,
    name: PropTypes.string,
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.oneOf([
      'heading',
      'string',
      'email',
      'password',
      'select',
      'text',
      'number',
      'date',
      'range',
      'slider',
      'tel',
      'search',
      'radio',
      'bool',
      'display'
    ]),
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number
      ]),
      display: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number
      ]),
      image: PropTypes.string
    })),
    optional: PropTypes.bool
  }),
  answer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ]),
  handleChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default Question;
