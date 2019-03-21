export const ph1Fields = [
  {
    name: 'FirstName',
    error: 'Field Required',
    label: 'First Name',
    required: true
  },
  {
    name: 'LastName',
    error: 'Field Required',
    label: 'Last Name',
    required: true
  },
  {
    name: 'EmailAddress',
    error: 'Not a valid email address',
    label: 'Email Address',
    type: 'email',
    required: true
  },
  {
    name: 'phoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'phone',
    required: true
  }
];

export const ph2Fields = [
  {
    name: 'FirstName2',
    error: 'Field Required',
    label: 'First Name',
    required: true
  },
  {
    name: 'LastName2',
    error: 'Field Required',
    label: 'Last Name',
    required: true
  },
  {
    name: 'EmailAddress2',
    error: 'Not a valid email address',
    label: 'Email Address',
    type: 'email',
    required: true
  },
  {
    name: 'phoneNumber2',
    error: 'Field Required',
    label: 'Policyholder Contact Phone',
    type: 'phone',
    required: true
  }
];

export const policyDetailsFields = [
  {
    name: 'effectiveDate',
    error: 'Not a valid date',
    label: 'Effective Date',
    type: 'date',
    required: true
  },
  {
    name: 'agentCode',
    error: '',
    label: 'Agent',
    type: 'select',
    required: true
  }
];
