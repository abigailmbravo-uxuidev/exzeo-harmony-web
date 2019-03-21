export const fields = [
  {
    name: 'coverageLimits.dwelling.amount_wrapper',
    type: 'slider',
    label: 'Dwelling Limit',
    tooltipText: 'structure of your home'
  },
  {
    name: 'coverageLimits.otherStructures.value_wrapper',
    required: true,
    type: 'radio',
    label: 'Other Structures Limit',
    tooltipText: 'the other structures',
    values: ['0', '2', '5', '10']
  },
  {
    name: 'coverageLimits.personalProperty.value_wrapper',
    required: true,
    type: 'radio',
    label: 'Personal Property Limit',
    tooltipText: 'personal belongings',
    values: ['0', '25', '35', '50']
  },
  {
    name: 'coverageOptions.personalPropertyReplacementCost.answer_wrapper',
    type: 'switch',
    label: 'Do you want Personal Property Replacement Cost Coverage?',
    tooltipText: 'Replacement Cost Coverage',
    dependsOn: '',
    defaultValue: true
  },
  {
    name: 'coverageLimits.lossOfUse.value_wrapper',
    required: true,
    type: 'text',
    label: 'Loss of Use Limit',
    tooltipText: 'This is your personal belongings'
  },
  {
    name: 'coverageLimits.personalLiability.amount_wrapper',
    required: true,
    type: 'radio',
    label: 'Personal Liability Limit',
    values: ['$ 100,000', '$ 300,000'],
  },
  {
    name: 'coverageLimits.medicalPayments.amount_wrapper',
    required: true,
    type: 'text',
    label: 'Medical Payments to Others'
  },
  {
    name: 'coverageLimits.moldProperty.amount_wrapper',
    required: true,
    type: 'radio',
    label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
    values: ['$ 10,000', '$ 25,000', '$ 50,000'],
  },
  {
    name: 'coverageLimits.moldLiability.amount_wrapper',
    required: true,
    type: 'radio',
    label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
    values: ['$ 50,000', '$ 100,000']
  },
  {
    name: 'coverageLimits.ordinanceOrLaw.amount_wrapper',
    required: true,
    type: 'radio',
    label: 'Ordinance or Law Coverage Limit',
    values: ['25', '50']
  },
  {
    name: 'coverageOptions.sinkholePerilCoverage.answer_wrapper',
    type: 'switch',
    label: 'Do you want Sinkhole Loss Coverage?',
    defaultValue: true
  },
  {
    name: 'deductibles.allOtherPerils.amount_wrapper',
    required: true,
    type: 'radio',
    label: 'All Other Perils Deductible',
    values: ['$ 500', '$ 1,000', '$ 2,500'],
  },
  {
    name: 'deductibles.hurricane.value_wrapper',
    required: true,
    type: 'radio',
    label: 'Hurricane Deductible',
    values: ['2', '5', '10']
  },
  {
    name: 'deductibles.sinkhole.amount_wrapper',
    required: true,
    type: 'radio',
    label: 'Sinkhole Deductible',
    values: ['10']
  },
  {
    name: 'property.windMitigation.roofCovering_wrapper',
    required: true,
    type: 'radio',
    label: 'Roof Covering:',
    values: ['Non-FBC', 'FBC', 'Other']
  },
  {
    name: 'property.windMitigation.roofDeckAttachment_wrapper',
    required: true,
    type: 'radio',
    label: 'Roof Deck Attachment:',
    values: ['A', 'B', 'C', 'D', 'Concrete', 'Other']
  },
  {
    name: 'property.windMitigation.roofToWallConnection_wrapper',
    required: true,
    type: 'radio',
    label: 'Roof to Wall Attachment:',
    values: ['Toe Nails', 'Clips', 'Single Wraps', 'Double Wraps', 'Other']
  },
  {
    name: 'property.windMitigation.roofGeometry_wrapper',
    required: true,
    type: 'radio',
    label: 'Roof Geometry:',
    values: ['Flat', 'Gable', 'Hip', 'Other']
  },
  {
    name: 'property.windMitigation.secondaryWaterResistance_wrapper',
    required: true,
    type: 'radio',
    label: 'Secondary Water Resistance (SWR):',
    values: ['Yes', 'No', 'Other']
  },
  {
    name: 'property.windMitigation.openingProtection_wrapper',
    required: true,
    type: 'radio',
    label: 'Opening Protection:',
    values: ['None', 'Basic', 'Hurricane', 'Other']
  },
  {
    name: 'property.burglarAlarm_wrapper',
    type: 'switch',
    label: 'Does the property have a burglar alarm?',
    defaultValue: false
  },
  {
    name: 'property.fireAlarm_wrapper',
    type: 'switch',
    label: 'Does the property have a fire alarm?',
    defaultValue: false
  },
  {
    name: 'property.sprinkler_wrapper',
    required: true,
    type: 'radio',
    label: 'Sprinkler',
    values: ['N', 'A', 'B']
  }
]

export const workflowSections = [
  {
    name: 'tab-nav-askAdditionalCustomerData',
    status: 'selected'
  },
  {
    name: 'tab-nav-askUWAnswers',
    status: 'selected'
  },
  {
    name: 'tab-nav-askToCustomizeDefaultQuote',
    status: 'active'
  },
  {
    name: 'tab-nav-sendEmailOrContinue',
    status: 'disabled'
  },
  {
    name: 'tab-nav-addAdditionalAIs',
    status: 'disabled'
  },
  {
    name: 'tab-nav-askAdditionalQuestions',
    status: 'disabled'
  },
  {
    name: 'tab-nav-editVerify',
    status: 'disabled'
  }
];

export const headers = ['Coverage Limits', 'Coverage Options', 'Deductibles', 'Wind Mitigation', 'Discounts'];
