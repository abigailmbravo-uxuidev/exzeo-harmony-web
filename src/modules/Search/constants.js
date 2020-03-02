export const VALID_QUOTE_STATES = [
  'Quote Started',
  'Application Started',
  'Quote Stopped',
  'Application Ready',
  'Quote Qualified'
];

export const SORT_OPTIONS = {
  policyNumber: 'policyNumber',
  firstName: 'firstName',
  lastName: 'lastName'
};

export const SORT_BY_OPTIONS = [
  {
    answer: SORT_OPTIONS.policyNumber,
    label: 'Policy Number'
  },
  {
    answer: SORT_OPTIONS.firstName,
    label: 'First Name'
  },
  {
    answer: SORT_OPTIONS.lastName,
    label: 'Last Name'
  }
];

export const SORT_DIRECTION_MAP = {
  [SORT_OPTIONS.policyNumber]: 'desc',
  [SORT_OPTIONS.firstName]: 'asc',
  [SORT_OPTIONS.lastName]: 'asc'
};
