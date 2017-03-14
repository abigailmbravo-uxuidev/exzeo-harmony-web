import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.dev';
import Login from './Login';

describe('Login', () => {
  const store = configureStore([]);
  let props = { };
  props = {
    data: { loading: false },
    match: {
      params: {}
    }
  };

  it('should render Login, with initialize', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = mount(<Provider store={store}>
      <Login {...props} />
    </Provider>);
    expect(wrapper).to.exist;
    expect(wrapper.find('Login')).to.have.length(1);
  });
});
