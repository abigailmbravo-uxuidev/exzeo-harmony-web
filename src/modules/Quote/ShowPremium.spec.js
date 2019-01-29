import React from 'react';
import { shallow } from 'enzyme/build';
import ShowPremium from './ShowPremium';

describe('Test ShowPremium component', () => {
  it('should test ShowPremium true', () => {
    const data = {
      isCustomize: true,
      totalPremium: 3423434
    };
    const wrapper = shallow(<ShowPremium {...data} />);
    expect(wrapper);
  });

  it('should test ShowPremium false', () => {
    const data = {
      isCustomize: false,
      totalPremium: 3423434
    };
    const wrapper = shallow(<ShowPremium {...data} />);
    expect(wrapper);
  });
})
