import React, { PropTypes } from 'react';
import dependencyHelper from './dependencyHelper';
import {
  CheckField,
  DisplayField,
  FormHeading,
  HiddenField,
  RadioField,
  SelectField,
  SliderField,
  TextField
} from './inputs';

const FieldGenerator = ({
  question,
  data,
  values
}) => {
  if (question.conditional) dependencyHelper(question, data, values);

  const inputProps = {
    ...question,
    hint: question.description,
    label: question.question,
    type: question.answerType
  };

  if (question.hidden) inputProps.type = 'hidden';

  switch (inputProps.type) {
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
    case 'hidden':
      return <HiddenField {...inputProps} />;
    default:
      return <RadioField {...inputProps} segmented />;
  }
};

FieldGenerator.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    description: PropTypes.string,
    answerType: PropTypes.string
  }),
  data: PropTypes.any, // eslint-disable-line
  values: PropTypes.any, // eslint-disable-line
};

export default FieldGenerator;
