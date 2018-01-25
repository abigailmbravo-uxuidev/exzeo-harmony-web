import React from 'react';
import { shallow } from 'enzyme';
import TextField from './TextField';
import reduxFormFieldConnect, { reduxFormField } from './reduxFormField';

describe('reduxFormField', () => {
  it('should connect to reduxFormField', () => {
    const props = {
      answers: []
    };
    const wrapper = shallow(<reduxFormFieldConnect {...TextField} {...props} />);

    expect(wrapper);
  });

  it('should render a component passed into redux form field', () => {
    const props = {
      answers: []
    };
    const wrapper = shallow(<reduxFormField {...TextField} {...props} />);

    expect(wrapper);
  });
});
