import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const props = {};

  it('should render FormGenerator, with initialize', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = mount(<Provider store={store}>
      <SearchResults {...props} />
    </Provider>);
    expect(wrapper).to.exist;
    expect(wrapper.find('SearchResults')).to.have.length(1);
  });
});
