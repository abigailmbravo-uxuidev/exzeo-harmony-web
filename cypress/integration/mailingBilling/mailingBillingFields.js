export default [
  {
    name: 'address1',
    error: 'Field Required',
    label: 'Address 1',
    required: true
  },
  {
    name: 'address2',
    label: 'Address 2',
    required: false
  },
  {
    name: 'city',
    error: 'Field Required',
    label: 'City',
    required: true
  },
  {
    name: 'state',
    error: 'Field Required',
    label: 'State',
    required: true
  },
  {
    name: 'zip',
    error: 'Field Required',
    label: 'Zip',
    required: true
  },
  {
    name: 'billToId',
    type: 'select',
    error: 'Field Required',
    label: 'Bill To',
    required: false
  },
  {
    name: 'billPlan',
    type: 'radio',
    error: 'Field Required',
    label: 'Bill Plan',
    required: false
  }
];
