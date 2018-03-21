/* eslint-disable no-param-reassign, no-extend-native  */
import _ from 'lodash';

export const toCurrency = function toCurrency(value) {
  return `$ ${String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
};

export default function dependencyHelper(question, data, values) {
  const updatedQuestion = _.cloneDeep(question);
  if (!question.conditional) return updatedQuestion;
  // For some slider properties depending on other fields
  if (question.conditional.slider) {
    const { slider } = question.conditional;
    if (slider.minLocation) {
      updatedQuestion.leftLabel = toCurrency(Math.ceil(_.get(data, slider.minLocation)));
      updatedQuestion.min = Math.ceil(_.get(data, slider.minLocation));
    }
    if (slider.maxLocation) {
      updatedQuestion.rightLabel = toCurrency(Math.floor(_.get(data, slider.maxLocation)));
      updatedQuestion.max = Math.floor(_.get(data, slider.maxLocation));
    }
  }
  // For display fields
  if (question.conditional.value) {
    const { value } = question.conditional;
    if (value.type === 'percent') {
      const roundedParentValue = Math.round(_.get(values, value.parent) / 1000) * 1000;
      const calculatedValue = roundedParentValue * value.value;
      updatedQuestion.displayValue = toCurrency(Math.ceil(calculatedValue / 100));
    } else {
      const parentValue = _.get(values, value.parent);
      const calculatedValue = parentValue * value.value;
      updatedQuestion.displayValue = toCurrency(calculatedValue);
    }
  }

  // For read only fields on radio fields
  if (question.conditional.dependency) {
    const { dependency } = question.conditional;

    if (dependency.type === 'percent') {
      const roundedParentValue = Math.round(_.get(values, dependency.parent) / 1000) * 1000;
      const calculatedValue = roundedParentValue * values[question.name];
      updatedQuestion.displayValue = toCurrency(Math.ceil(calculatedValue / 100));
    } else {
      const parentValue = _.get(values, dependency.parent);
      const calculatedValue = parentValue * values[question.name];
      updatedQuestion.displayValue = toCurrency(calculatedValue);
    }
  }
  /**
   * type: 'hidden',
   * trigger: true,
   * dependency: 'personalPropertyConverage',
   * operator: 'equal',
   *
   * if the parent's value is {operator} to/than {trigger},
   * then the child will be !{type}, else child will be {type}
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
      if (!updatedQuestion[type]) {
        const parentValue = _.get(values, parent);
        switch (operator) {
          case 'equal':
              // Hidden/disabled if parent value does not equal trigger
            updatedQuestion[type] = !(parentValue === trigger);
            break;
          case 'notEqual':
              // Hidden/disabled if parent value equals trigger
            updatedQuestion[type] = !(parentValue !== trigger);
            break;
          case 'greaterThan':
              // Hidden/disabled if parent value is less than or equal to trigger
            updatedQuestion[type] = !(parentValue > trigger);
            break;
          case 'lessThan':
              // Hidden/disabled if parent value is greater than or equal to trigger
            updatedQuestion[type] = !(parentValue < trigger);
            break;
          default:
        }
      }
    });
  }
  return updatedQuestion;
}
