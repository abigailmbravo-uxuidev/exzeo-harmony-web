import React from 'react';
import { shallow } from 'enzyme';
import EffectiveDateForm from './EffectiveDateForm';

describe('EffectiveDateForm', () => {
  let props = {};

  beforeEach(() => {
    props = {
      styleName: '',
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn
    };
  });

  it('should render component', () => {
    const wrapper = shallow(<EffectiveDateForm {...props} />);
    expect(wrapper).to.exist;
  });
});
