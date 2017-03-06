import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import _ from 'lodash';
import configureStore from '../../store/configureStore.dev';
import Search from './Search';

describe('Search', () => {
  const store = configureStore([]);
  const props = {};

  it('should render FormGenerator, with initialize', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = mount(<Provider store={store}>
      <Search {...props} />
    </Provider>);
    expect(wrapper).to.exist;
    expect(wrapper.find('Search')).to.have.length(1);
  });
});
