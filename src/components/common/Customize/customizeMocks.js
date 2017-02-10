export const quoteInfo = {
  coverageLimits: {
    personalProperty: {
      // format: 'Currency',
      // amount: 238000,
      format: 'Percentage',
      amount: 50,
    },
    otherStructures: {
      format: 'Percentage',
      amount: 10,
    },
    medicalPayments: {
      format: 'Currency',
      amount: 2000,
    },
    moldProperty: {
      format: 'Currency',
      amount: 10000,
    },
    ordinanceOrLaw: {
      format: 'Percentage',
      amount: 25,
    },
    lossOfUse: {
      format: 'Percentage',
      amount: 10,
    },
    personalLiability: {
      format: 'Currency',
      amount: 100000,
    },
    dwelling: {
      format: 'Currency',
      maxAmount: 618800,
      amount: 476000,
      minAmount: 428400,
    },
    moldLiability: {
      format: 'Currency',
      amount: 50000,
    },
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      answer: false,
    },
    propertyIncidentalOccupanciesOtherStructures: {
      answer: false,
    },
    liabilityIncidentalOccupancies: {
      answer: false,
    },
    personalPropertyReplacementCost: {
      answer: false,
    },
    propertyIncidentalOccupanciesMainDwelling: {
      answer: false,
    },
  },
  deductibles: {
    sinkhole: {
      format: 'Percentage',
      amount: 10,
    },
    hurricane: {
      format: 'Percentage',
      amount: 10,
    },
    allOtherPerils: {
      format: 'Currency',
      amount: 2500,
    },
  },
};

export const customizeQuestions = [{
  name: 'coverageLimits',
  question: 'Coverage Limits',
  answerType: 'heading',
  icon: 'fa fa-balance-scale',
}, {
  name: 'dwellingAmount',
  question: 'Dwelling Limit',
  defaultValueLocation: 'coverageLimits.dwelling.amount',
  answerType: 'slider',
  step: 1000,
  conditional: {
    slider: {
      minLocation: 'coverageLimits.dwelling.minAmount',
      maxLocation: 'coverageLimits.dwelling.maxAmount',
    },
  },
}, {
  name: 'otherStructuresAmount',
  question: 'Other Structures Limit',
  defaultValueLocation: 'coverageLimits.otherStructures.amount',
  answerType: 'radio',
  answers: [{
    answer: 0,
    display: '0%',
  }, {
    answer: 2,
    display: '2%',
  }, {
    answer: 5,
    display: '5%',
  }, {
    answer: 10,
    display: '10%',
  }],
  conditional: {
    readOnly: {
      type: 'percent',
      location: 'state',
      dependency: 'dwellingAmount',
    },
  },
}, {
  name: 'personalPropertyCoverage',
  question: 'Do you want personal property coverage?',
  defaultValue: false,
  answerType: 'bool',
}, {
  name: 'personalPropertyAmount',
  question: 'Personal Property Limit',
  defaultValueLocation: 'coverageLimits.personalProperty.amount',
  answerType: 'radio',
  answers: [{
    answer: 0,
    display: '0%',
  }, {
    answer: 25,
    display: '25%',
  }, {
    answer: 35,
    display: '35%',
  }, {
    answer: 50,
    display: '50%',
  }],
  conditional: {
    display: [{
      type: 'hidden',
      trigger: true,
      dependency: 'personalPropertyCoverage',
      location: 'state',
      operator: 'equal',
    }],
  },
}, {
  name: 'personalPropertyReplacementCostCoverage',
  question: 'Do you want personal property replacement cost coverage?',
  answerType: 'bool',
  defaultValue: false,
  conditional: {
    display: [{
      type: 'hidden',
      trigger: true,
      dependency: 'personalPropertyCoverage',
      location: 'state',
      operator: 'equal',
    }],
  },
}, {
  name: 'lossOfUseAmount',
  question: 'Loss Of Use Limit',
  answerType: 'text',
  defaultValueLocation: 'coverageLimits.lossOfUse.amount',
  conditional: {
    readOnly: {
      type: 'percent',
      location: 'state',
      dependency: 'dwellingAmount',
    },
  },
}, {
  name: 'personalLiability',
  question: 'Personal Liability Limit',
  defaultValueLocation: 'coverageLimits.personalLiability.amount',
  answerType: 'radio',
  answers: [{
    answer: 100000,
    display: '$ 100,000',
  }, {
    answer: 300000,
    display: '$ 300,000',
  }],
}, {
  name: 'medicalPayments',
  question: 'Medical Payments to Others',
  defaultValue: '$ 2000',
  answerType: 'display',
}, {
  name: 'moldProperty',
  question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
  defaultValueLocation: 'coverageLimits.moldProperty.amount',
  answerType: 'radio',
  answers: [{
    answer: 10000,
    display: '$ 10,000',
  }, {
    answer: 25000,
    display: '$ 25,000',
  }, {
    answer: 50000,
    display: '$ 50,000',
  }],
}, {
  name: 'moldLiability',
  question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
  defaultValueLocation: 'coverageLimits.moldLiability.amount',
  answerType: 'radio',
  answers: [{
    answer: 50000,
    display: '$ 50,000',
  }, {
    answer: 100000,
    display: '$ 100,000',
  }],
}, {
  name: 'ordinanceOrLaw',
  question: 'Ordinance Or Law Coverage Limit',
  defaultValueLocation: 'coverageLimits.ordinanceOrLaw.amount',
  answerType: 'radio',
  answers: [{
    answer: 25,
    display: '25%',
  }, {
    answer: 50,
    display: '50%',
  }],
  conditional: {
    readOnly: {
      type: 'percent',
      location: 'state',
      dependency: 'dwellingAmount',
    },
  },
}, {
  name: 'coverageOptions',
  question: 'Coverage Options',
  answerType: 'heading',
  icon: 'fa fa-tasks',
}, {
  name: 'propertyIncidentalOccupancies',
  question: 'Property Permitted Incidental Occupancies',
  defaultValue: 'None',
  answerType: 'radio',
  answers: [{
    answer: 'Main Dwelling',
  }, {
    answer: 'Other Structures',
  }, {
    answer: 'None',
  }],
}, {
  name: 'sinkholeCoverage',
  question: 'Do you want Sinkhole Loss Coverage? ',
  defaultValueLocation: 'coverageOptions.sinkholePerilCoverage.answer',
  answerType: 'bool',
}, {
  name: 'deductibles',
  question: 'Deductibles',
  answerType: 'heading',
  icon: 'fa fa-money',
}, {
  name: 'allOtherPerils',
  question: 'All Other Perils Deductible',
  defaultValueLocation: 'deductibles.allOtherPerils.amount',
  answerType: 'radio',
  answers: [{
    answer: 500,
    display: '$ 500',
  }, {
    answer: 1000,
    display: '$ 1000',
  }, {
    answer: 2500,
    display: '$ 2500',
  }],
}, {
  name: 'hurricane',
  question: 'Other Structures Limit',
  defaultValueLocation: 'deductibles.hurricane.amount',
  answerType: 'radio',
  answers: [{
    answer: 2,
    display: '2%',
  }, {
    answer: 5,
    display: '5%',
  }, {
    answer: 10,
    display: '10%',
  }],
  conditional: {
    readOnly: {
      type: 'percent',
      location: 'state',
      dependency: 'dwellingAmount',
    },
  },
}];
