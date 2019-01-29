import React from 'react';
import { shallow } from 'enzyme';
import Policy from './Policy';

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const props = {
      location: {
        pathname: '/policy'
      },
      auth: {
        logout: () => {}
      }
    };
    const wrapper = shallow(<Policy {...props} />);
    expect(wrapper);
  });
});
