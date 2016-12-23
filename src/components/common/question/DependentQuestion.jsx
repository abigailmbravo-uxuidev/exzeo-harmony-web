/* eslint-disable react/prop-types, no-param-reassign */
import React from 'react';
import Question from './Question';

const DependentQuestion = (props) => {
  const { dependency, min, max, hardMin, hardMax } = props.question.conditional.value;
  const dependentValue = props.answers[dependency].value;
  let minValue = min ? min * dependentValue : null;
  let maxValue = max ? max * dependentValue : null;
  minValue = hardMin && hardMin > minValue ? hardMin : minValue;
  maxValue = hardMax && hardMax < maxValue ? hardMax : maxValue;
  props.question.minValue = minValue < maxValue ? minValue : maxValue;
  props.question.maxValue = maxValue > minValue ? maxValue : minValue;
  return (<Question {...props} />);
};

export default DependentQuestion;
