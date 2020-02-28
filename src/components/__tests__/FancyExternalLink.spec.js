import React from 'react';
import { render } from '../../test-utils';

import FancyExternalLink from '../FancyExternalLink';

describe('Testing FancyExternalLink component', () => {
  it('should test props and render', () => {
    const props = {
      productIcon: 'fa fa-circle',
      url: 'www.google.com',
      title: 'External Link',
      description: 'External Link Description',
      linkIcon: 'fa fa-circle'
    };
    const { getByLabelText, getByText } = render(
      <FancyExternalLink {...props} />
    );

    expect(getByLabelText(props.title)).toBeInTheDocument();
    expect(getByText(props.description)).toBeInTheDocument();
  });
});
