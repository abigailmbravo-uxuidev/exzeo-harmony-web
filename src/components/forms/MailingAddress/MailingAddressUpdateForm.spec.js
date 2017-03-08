import React from 'react';
import { shallow } from 'enzyme';
import MailingAddressUpdateForm from './MailingAddressUpdateForm';

describe('MailingAddressUpdateForm', () => {
  let props = {};

  beforeEach(() => {
    props = {
      styleName: '',
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn
    };
  });

  it('should render component', () => {
    const wrapper = shallow(<MailingAddressUpdateForm {...props} />);
    expect(wrapper).to.exist;
  });
});
