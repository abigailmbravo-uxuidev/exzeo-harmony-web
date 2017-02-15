/* eslint-disable react/prop-types, no-param-reassign */
import React from 'react';
import _ from 'lodash';
import Question from './Question';

const DependentQuestion = ({
  data,
  question,
  answers,
  handleChange,
}) => {
  // No conditional
  if (!question.conditional) {
    return (<Question
      answer={answers[question.name]}
      handleChange={handleChange}
      question={question}
    />);
  }

  // Has some slider properties depending on other values
  if (question.conditional.slider) {
    const { slider } = question.conditional;
    if (slider.minLocation) {
      question.leftLabel = `$ ${Math.ceil(_.get(data, slider.minLocation))}`;
      question.min = Math.ceil(_.get(data, slider.minLocation));
    }
    if (slider.maxLocation) {
      question.rightLabel = `$ ${Math.floor(_.get(data, slider.maxLocation))}`;
      question.max = Math.floor(_.get(data, slider.maxLocation));
    }
  }

  // For read only/display boxes
  if (question.conditional.value) {
    const { value } = question.conditional;
    const parentValue = _.get(answers, value.parent);
    const calculatedValue = parentValue * answers[question.name];
    // console.log('PERCENTAGE CONDITION: ', question, value);
    question.displayValue = `$ ${value.type === 'percent' ? Math.ceil(calculatedValue / 100) : calculatedValue}`;
  }

  if (question.conditional.dependency) {
    const { dependency } = question.conditional;
    const parentValue = _.get(answers, dependency.parent);
    const calculatedValue = parentValue * answers[question.name];
    question.displayValue = `$ ${dependency.type === 'percent' ? Math.ceil(calculatedValue / 100) : calculatedValue}`;
  }

/**
 * type: 'hidden',
 trigger: true,
 dependency: 'personalPropertyConverage',
 operator: 'equal',

  if the parent's value is {operator} to/than {trigger},
  then the child will be !{type}, else child will be {type}
 */
  if (question.conditional.display && question.conditional.display.length > 0) {
    const { display } = question.conditional;
    display.forEach((d) => {
      const {
        type,
        trigger,
        parent,
        operator
      } = d;
      const parentValue = _.get(answers, parent);
      switch (operator) {
        case 'equal':
          // Hidden/disabled if parent value does not equal trigger
          question[type] = !(parentValue === trigger);
          break;
        case 'notEqual':
          // Hidden/disabled if parent value equals trigger
          question[type] = !(parentValue !== trigger);
          break;
        case 'greaterThan':
          // Hidden/disabled if parent value is less than or equal to trigger
          question[type] = !(parentValue > trigger);
          break;
        case 'lessThan':
          // Hidden/disabled if parent value is greater than or equal to trigger
          question[type] = !(parentValue < trigger);
          break;
        default:
      }
    });
  }

  return question.hidden ? null : <Question
    answer={answers[question.name]}
    handleChange={handleChange}
    question={question}
  />;
};

export default DependentQuestion;
