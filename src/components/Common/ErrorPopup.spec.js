import React from 'react';
import { shallow } from 'enzyme';
import ErrorPopup from './ErrorPopup';


it('renders without crashing', () => {
  const props = {
    underwritingExceptions: [],
    refereshUWReviewError: () => (false),
    redirectToNewQuote: () => (false),
    quote: {}
  };
  const wrapper = shallow(<ErrorPopup {...props} />);
  expect(wrapper);
});
