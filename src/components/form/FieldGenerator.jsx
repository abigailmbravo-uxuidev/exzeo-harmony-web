import React, { PropTypes } from 'react';
import {
  CheckField,
  DisplayField,
  FormHeading,
  RadioField,
  SelectField,
  SliderField,
  TextField,
} from './inputs';

const FieldGenerator = ({ question }) => {
  const inputProps = {
    ...question,
    hint: question.description,
    label: question.question,
    type: question.answerType,
  };

  if (question.hidden) inputProps.type = 'hidden';

  switch (question.answerType) {
    case 'select':
      return <SelectField {...inputProps} />;
    case 'radio': {
      if (question.answers.length > 6) {
        return <SelectField {...inputProps} />;
      }
      const maxChars = window.innerWidth / (12 * question.answers.length);
      let isDropdown = false;
      question.answers.some((a) => {
        isDropdown = a.answer && a.answer.length > maxChars;
        return isDropdown;
      });
      return isDropdown ?
        <SelectField {...inputProps} /> :
        <RadioField {...inputProps} segmented />;
    }
    case 'bool':
      return <CheckField {...inputProps} isSwitch />;
    case 'range':
    case 'slider':
      return <SliderField {...inputProps} />;
    case 'text':
    case 'date':
      return <TextField {...inputProps} />;
    case 'display':
      return <DisplayField {...inputProps} />;
    case 'heading':
      return <FormHeading {...inputProps} />;
    default:
      return <TextField {...inputProps} />;
  }
};

FieldGenerator.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.string,
  })
};

export default FieldGenerator;
