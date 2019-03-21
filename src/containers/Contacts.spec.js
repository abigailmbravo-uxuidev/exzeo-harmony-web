import React from 'react';
import { shallow } from 'enzyme';
import Contacts from './Contacts';

describe('Test Contacts container component', () => {
  it('should render', () => {
    const props = {
      auth: { logout: x => x },
      match: { params: {} },
    };

    const component = shallow(<Contacts {...props} />);
    expect(component.exists()).toBeTruthy();
  })
});
