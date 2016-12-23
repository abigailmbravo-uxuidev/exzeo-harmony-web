/* eslint-disable react/prop-types, no-param-reassign */
import React from 'react';
import Question from './Question';

const DependentQuestion = (props) => {
  const { value } = props.question.conditional;
  const { dependency, min, max, hardMin, hardMax } = value;
  const dependentValue = props.answers[dependency].value;
  let minValue = min ? min * dependentValue : null;
  let maxValue = max ? max * dependentValue : null;
  const step = dependentValue * value.step;
  minValue = hardMin && hardMin > minValue ? hardMin : minValue;
  maxValue = hardMax && hardMax < maxValue ? hardMax : maxValue;
  props.question.minValue = minValue < maxValue ? minValue : maxValue;
  props.question.maxValue = maxValue > minValue ? maxValue : minValue;
  props.question.step = step;
  return (<Question {...props} />);
};

export default DependentQuestion;
