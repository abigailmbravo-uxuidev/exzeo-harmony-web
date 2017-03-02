import React from 'react';
import { shallow } from 'enzyme';
import MailingAddressForm from './MailingAddressForm';

describe('MailingAddressForm', () => {
  let props = {};

  beforeEach(() => {
    props = {
      styleName: '',
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn
    };
  });

  it('should render component', () => {
    const wrapper = shallow(<MailingAddressForm {...props} />);
    expect(wrapper).to.exist;
  });
});
