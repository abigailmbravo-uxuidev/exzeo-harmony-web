import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import _ from 'lodash';
import configureStore from '../store/configureStore.dev';
import Quote from './Quote';

describe('Quote', () => {
  const store = configureStore([]);
  let props = { };
  props = {
    data: { loading: false },
    match: {
      params: {}
    },
    startWorkflow: () => new Promise(resolve => resolve(true))
  };

  it('should render Quote, with initialize', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = mount(<Provider store={store}>
      <Quote {...props} />
    </Provider>);
    expect(wrapper).to.exist;
    expect(wrapper.find('Quote')).to.have.length(1);
  });
});
