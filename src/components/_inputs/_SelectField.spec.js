import React from 'react';
import { shallow } from 'enzyme';
import { SelectField } from './SelectField';

describe('SelectField', () => {
  it('should render "selectField input" when nothing is provided', () => {
    const props = {
      input: {
        onChange: () => {}
      }
    };
    const wrapper = shallow(<SelectField {...props} />);

    expect(wrapper).to.exist;
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
