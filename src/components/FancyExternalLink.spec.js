import React from 'react';
import { mount } from 'enzyme';

import FancyExternalLink from './FancyExternalLink';

describe('Testing FancyExternalLink component', () => {
  const props = {
    productIcon: 'fa fa-circle',
    url: 'www.google.com',
    title: 'External Link',
    description: 'External Link Description',
    linkIcon: 'fa fa-circle'
  }
  const wrapper = mount(<FancyExternalLink {...props} />);

  it('should test props and render', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('li')).toHaveLength(1)
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(3);
    
    const wrapperProps = wrapper.props();
    expect(wrapperProps.productIcon).toEqual(props.productIcon)
    expect(wrapperProps.url).toEqual(props.url)
    expect(wrapperProps.title).toEqual(props.title)
    expect(wrapperProps.description).toEqual(props.description)
    expect(wrapperProps.linkIcon).toEqual(props.linkIcon)

  });
  
});
