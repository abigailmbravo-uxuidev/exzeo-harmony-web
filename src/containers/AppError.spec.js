import React from 'react';
import { mount } from 'enzyme';

import AppError from './AppError';

describe('Testing AppError component', () => {
  it('should render component', () => {
    const props = {
      error: { message: 'Whoops!' },
      history: {},
      location: { state: {} },
      match: {}
    };
    const wrapper = mount(<AppError {...props} />);
    expect(wrapper);
  });
});
