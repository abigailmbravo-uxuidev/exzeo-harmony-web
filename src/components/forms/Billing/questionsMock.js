export default [
  {
    answerType: 'text',
    question: 'Address 1',
    styleName: 'address1',
    name: 'address1',
    defaultValueLocation: 'property.physicalAddress.address1',
    validations: ['required']
  },
  {
    answerType: 'text',
    question: 'Address 2',
    styleName: 'address2',
    name: 'address2',
    defaultValueLocation: 'property.physicalAddress.address2'
  },
  {
    answerType: 'text',
    question: 'City',
    validations: ['required'],
    styleName: 'city',
    name: 'city',
    defaultValueLocation: 'property.physicalAddress.city'
  },
  {
    answerType: 'text',
    question: 'State',
    validations: ['required'],
    styleName: 'State',
    name: 'state',
    defaultValueLocation: 'property.physicalAddress.state'
  },
  {
    answerType: 'text',
    question: 'Zip',
    validations: ['required'],
    styleName: 'zip',
    name: 'zip',
    defaultValueLocation: 'property.physicalAddress.zip'
  }
];
