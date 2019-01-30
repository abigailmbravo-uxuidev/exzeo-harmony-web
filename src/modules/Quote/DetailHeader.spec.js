import React from 'react';
import { shallow } from 'enzyme/build';
import DetailHeader from './DetailHeader';

describe('Test DetailHeader component', () => {
  const quote = {
    property: { physicalAddress: {} },
    coverageLimits: { dwelling: { amount: '1000'} },
  };

  const baseProps = {
    quote,
    activeTask: 'test',
    handleRecalc: x => x,
    isLoading: false,
    isRecalc: false,
  };

  it('should test DetailHeader ', () => {
    const props = { ...baseProps };
    const wrapper = shallow(<DetailHeader{...props} />);
    expect(wrapper);
  });
});
