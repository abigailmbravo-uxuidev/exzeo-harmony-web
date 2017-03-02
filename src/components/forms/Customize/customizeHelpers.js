import _ from 'lodash';

export function convertQuoteStringsToNumber(data) {
  let newData = {};
  newData = _.cloneDeep(data);
  Object.keys(data).forEach((obj) => {
    if (_.isString(data[obj])) {
      newData[obj] = (!Number.isNaN(Number(data[obj])) ?
        Number(data[obj]) : data[obj]);
    }
  });
  return newData;
}

export function getInitialValues(questions, data) {
  const values = {};
  questions.forEach((question) => {
    if (question.readOnlyValue) {
      values[question.name] = question.readOnlyValue;
    } else if (question.defaultValueLocation) {
      const val = _.get(data, question.defaultValueLocation);
      values[question.name] = val;
    } else {
      values[question.name] = '';
    }
  });

  // Go through and check if percent or currency is provided as initial
  questions.forEach((question) => {
    if (question.conditional && question.conditional.dependency &&
      question.answers && question.answers.length > 0) {
      const exists = question.answers.find(a => a.answer == values[question.name]); // eslint-disable-line
      if (!exists) {
        const { dependency } = question.conditional;
        const parentValue = _.get(values, dependency.parent);

        const stateValue = values[question.name];
        // const calculatedValue = parentValue / 100;
        const newValue = question.answers.find(a =>
          (dependency.type === 'percent' ? (parentValue * a.answer) / 100 : parentValue * a.answer) === stateValue);
        if (newValue) {
          values[question.name] = newValue.answer;
        }
      }
    }
  });
  return values;
}
