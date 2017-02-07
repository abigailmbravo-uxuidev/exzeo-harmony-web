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
  if (!question.conditional) return (<Question
    answer={answers[question.name]}
    handleChange={handleChange}
    question={question}
  />)

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
  if (question.conditional.readOnly) {
    const { readOnly } = question.conditional;
    const depValue = readOnly.location === 'state' ? answers[readOnly.dependency] :
      _.get(data, readOnly.dependency);
    const calcValue = depValue * answers[question.name]
    question.displayValue = `$ ${readOnly.type === 'percent' ? calcValue / 100 : calcValue}`;
  }

/**
 * type: 'hidden',
 trigger: true,
 dependency: 'personalPropertyConverage',
 location: 'state',
 operator: 'equal',
 */
  if (question.conditional.display && question.conditional.display.length > 0) {
    const { display } = question.conditional;
    display.forEach((d) => {
      const { type, trigger, dependency, location, operator } = d;
      const depValue = location === 'state' ? answers[dependency] : _.get(data, dependency);
      switch(operator) {
        case 'equal':
          // Hidden/disabled if dependency value does not equal trigger
          question[type] = !(depValue == trigger);
          break;
        case 'notEqual':
          // Hidden/disabled if dependency value equals trigger
          question[type] = (depValue == trigger)
          break;
        case 'greaterThan':
          // Hidden/disabled if dependency value is less than or equal to trigger
          question[type] = depValue <= trigger;
          break;
        case 'lessThan':
          // Hidden/disabled if dependency value is greater than or equal to trigger
          question[type] = depValue >= trigger;
          break;
      }
    });

  }

  return question.hidden ? null : <Question
    answer={answers[question.name]}
    handleChange={handleChange}
    question={question}
  />
};

export default DependentQuestion;
