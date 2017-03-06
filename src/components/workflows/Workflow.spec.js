import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../store/configureStore.dev';
import Workflow from './Workflow';

describe('Workflow', () => {
  const store = configureStore([]);
  const props = {
    data: {}
  };

  it('should render Workflow, with initialize', () => {
    // const newProps = _.cloneDeep(props);
    props.initialValues = {};
    const wrapper = mount(<Provider store={store}>
      <Router>
        <Workflow {...props} />
      </Router>
    </Provider>);
    expect(wrapper).to.exist;
    expect(wrapper.find('Workflow')).to.have.length(1);
  });
});
