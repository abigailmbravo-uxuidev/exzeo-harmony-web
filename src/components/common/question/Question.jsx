import React, { PropTypes } from 'react';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';
import RadioGroup from '../form/RadioGroup';
import BoolInput from '../form/BoolInput';

const Question = (props) => {
  const { answerType, answers } = props.question;
  const { handleChange, value } = props;
  let formElement;
  if (answerType === 'radio' && answers && answers.length > 0) {
    formElement = answers.length < 6 ?
      <RadioGroup {...props.question} value={value} handleChange={handleChange} segmented /> :
      <Dropdown {...props.question} value={value} handleChange={handleChange} />;
  } else if (answerType === 'bool') {
    formElement = (
      <BoolInput
        {...props.question}
        value={value}
        handleChange={handleChange}
        isSwitch
      />);
  } else {
    formElement = (
      <TextInput {...props.question} value={props.answer} handleChange={handleChange} handleSubmit={props.handleSubmit} />
    );
  }
  return formElement;
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string,
      image: PropTypes.string,
    })),
    optional: PropTypes.bool,
    styleName: PropTypes.string,
  }),
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
  handleChange: PropTypes.func,
};

export default Question;
