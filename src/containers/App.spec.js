import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore.dev';
import App from './App';

describe('App', () => {
  const store = configureStore([]);
  let props = { };
  props = {
    data: { loading: false },
    match: {
      params: {}
    }
  };

  it('should render App, with initialize', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = mount(<Provider store={store}>
      <App {...props} />
    </Provider>);
    expect(wrapper).to.exist;
    expect(wrapper.find('App')).to.have.length(1);
  });
});
