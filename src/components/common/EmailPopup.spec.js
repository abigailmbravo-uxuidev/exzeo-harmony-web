import React from 'react';
import { shallow } from 'enzyme';
import EmailPopup from './EmailPopup';

describe('EmailPopup', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<EmailPopup
      showEmailPopup={false}
      primaryButtonHandler={function () { }}
      secondaryButtonHandler={function () { }}
    />);

    expect(wrapper).to.exist;
  });
});
