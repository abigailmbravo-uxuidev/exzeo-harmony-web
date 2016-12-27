export default [{
  name: 'dwelling',
  question: 'A. Dwelling',
  format: 'Currency',
  answerType: 'range',
  minValue: 125000,
  defaultValue: 150000,
  maxValue: 200000,
}, {
  name: 'otherStructures',
  question: 'B. Other Structures',
  format: 'Currency',
  answerType: 'range',
  conditional: {
    value: {
      min: 0.0,
      max: 0.1,
      dependency: 'dwelling',
      step: 0.0005,
    },
  },
}, {
  name: 'personalProperty',
  question: 'C. Personal Property',
  answerType: 'bool',
}, {
  name: 'personalPropertyValue',
  question: 'Value of Personal Property',
  answerType: 'range',
  conditional: {
    value: {
      dependency: 'dwelling',
      min: 0.25,
      max: 0.5,
      step: 0.005,
    },
    display: [{
      dependency: 'personalProperty',
      trigger: true,
      operator: 'equal',
      type: 'hidden',
    }],
  },
}, {
  name: 'lossOfUse',
  question: 'D. Loss of Use',
  answerType: 'range',
  format: 'Currency',
  conditional: {
    value: {
      dependency: 'dwelling',
      min: 0.0,
      max: 0.1,
      step: 0.0005,
    },
  },
}, {
  name: 'personalLiability',
  question: 'E. Personal Liability',
  answerType: 'radio',
  answers: [{
    answer: '100000',
  }, {
    answer: '300000',
  }],
}, {
  name: 'medicalPayments',
  question: 'F. Medical Payments',
  answerType: 'range',
  conditional: {
    value: {
      dependency: 'dwelling',
      min: 0.0,
      max: 0.1,
      step: 0.005,
    },
  },
}, {
  name: 'moldProperty',
  question: 'Mold Property',
  answerType: 'radio',
  answers: [{
    answer: '10000',
  }, {
    answer: '25000',
  }, {
    answer: '50000',
  }],
}, {
  name: 'moldLiability',
  question: 'Mold Liability',
  answerType: 'radio',
  answers: [{
    answer: '25',
  }, {
    answer: '50',
  }],
}, {
  name: 'personalPropertyReplacementCost',
  question: 'Personal Property Replacement Cost',
  answerType: 'bool',
  defaultValue: true,
}, {
  name: 'sinkholePerilCoverage',
  question: 'Sinkhole Peril Coverage',
  answerType: 'bool',
  defaultValue: true,
}, {
  name: 'propertyIncidentalOccupanciesMainDwelling',
  question: 'Property Permitted Incidental Occupancies Main Dweeling',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'propertyIncidentalOccupanciesOtherStructures',
  question: 'Property Permitted Incidental Occupancies Other Structures',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'liabilityIncidentalOccupancies',
  question: 'Lability Permitted Incidental Occupancies',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'hurricane',
  question: 'Hurricane',
  defaultValue: '500',
  answerType: 'radio',
  answers: [{
    answer: '500',
  }, {
    answer: '1000',
  }],
}, {
  name: 'sinkHole',
  question: 'Sinkhole',
  answerType: 'radio',
  conditional: {
    value: {
      dependency: 'dwelling',
      choices: [0.10],
    },
    display: [{
      type: 'hidden',
      dependency: 'sinkholePerilCoverage',
      operator: 'equal',
      trigger: true,
    }],
  },
}];
