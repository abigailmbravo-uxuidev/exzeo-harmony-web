import React from 'react';
import { shallow } from 'enzyme';
import WorkflowDetails from './WorkflowDetails';

describe('WorkflowDetails', () => {
  it('Should render when no props are passed in', () => {
    const detailArray = [
      { name: 'Annual Premium', value: '500000' },
      { name: 'Coverage A', value: '50000' },
      { name: 'Quote Number', value: '123' },
      { name: 'Address', value: '123' },
      { name: 'YearBuilt', value: '2015' },
      { name: 'AnnualPremium', value: '12222' },
      { name: 'QuoteNumber', value: '123' }
    ];

    const wrapper = shallow(<WorkflowDetails
      details={detailArray}
    />);

    expect(wrapper).to.exist;
  });
});
