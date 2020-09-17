import { date } from '@exzeo/core-ui';

export default [
  {
    _id: '1',
    companyCode: 'TTIC',
    state: 'FL',
    product: 'HO3',
    claimNumber: '1-1-01',
    lossType: 'MISC',
    description: 'Miscellaneous',
    status: 'OPEN (UNKNOWN)',
    dateReported: date.moment
      .utc()
      .subtract(1, 'days')
      .format(),
    dateOfLoss: date.moment
      .utc()
      .subtract(1, 'week')
      .format()
  },
  {
    _id: '2',
    claimNumber: '2-2-02',
    lossType: 'MISC',
    description: 'Miscellaneous',
    status: 'OPEN (UNKNOWN)',
    dateReported: '2020-05-15T04:00:00.000Z',
    dateOfLoss: '2020-05-15T04:00:00.000Z',
    createdAt: date.moment
      .utc()
      .subtract(2, 'days')
      .format(),
    createdBy: { _id: '5f207d14e2f6882ddcfc2a47', userName: 'tticcsr' },
    updatedAt: '2019-09-25T15:18:29.543Z',
    updatedBy: { _id: '5f207d14e2f6882ddcfc2a48', userName: 'tticcsr' }
  },
  {
    _id: '3',
    claimNumber: '3-3-03',
    lossType: 'WATER - INTERNAL',
    description: 'Miscellaneous',
    status: 'CLOSED (PAID)',
    dateReported: date.moment
      .utc()
      .subtract(55, 'days')
      .format(),
    dateOfLoss: date.moment
      .utc()
      .subtract(50, 'days')
      .format(),
    dateClosed: date.moment
      .utc()
      .subtract(2, 'days')
      .format(),
    createdAt: date.moment
      .utc()
      .subtract(1, 'months')
      .format(),
    createdBy: { _id: '5f207d3fe2f6882ddcfc2ab7', userName: 'tticcsr' }
  },
  {
    _id: '4',
    claimNumber: '4-4-1abc',
    lossType: 'MISC',
    description: 'Miscellaneous',
    status: 'OPEN (UNKNOWN)',
    dateReported: '2020-05-16T04:00:00.000Z',
    dateOfLoss: '2020-05-16T04:00:00.000Z',
    createdAt: date.moment
      .utc()
      .subtract(4, 'days')
      .format(),
    createdBy: { _id: '5f207d54e2f6882ddcfc2aef', userName: 'tticcsr' }
  }
];
