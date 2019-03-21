export default [
  {
    name: 'rented',
    required: true,
    type: 'radio',
    values: ['Yes', 'Occasionally', 'Never']
  },
  {
    name: 'previousClaims',
    required: true,
    type: 'radio',
    values: ['No claims ever filed', 'Less than 3 Years', '3-5 Years', 'Over 5 Years', 'Unknown']
  },
  {
    name: 'monthsOccupied',
    required: true,
    type: 'radio',
    values: ['0-3', '4-6', '7-9', '10+']
  },
  {
    name: 'fourPointUpdates',
    required: true,
    type: 'radio',
    values: ['Yes', 'No', 'Unknown']
  },
  {
    name: 'business',
    required: true,
    type: 'radio',
    values: ['Yes', 'No']
  }
];
