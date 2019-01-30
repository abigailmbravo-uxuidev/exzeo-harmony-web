import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { WorkflowNavigation } from './WorkflowNavigation';

const mockStore = configureStore([]);

describe('Testing WorkflowNavigation component', () => {
  it('should test connected component', () => {
    const initialState = {
      quoteState: {
        quote: {
          quoteNumber: '1',
        },
        state: {
          activeTask: 'test',
          completedTasks: [],
          uiQuestions: [],
        },
      },
    };
    const store = mockStore(initialState);

    const props = {
      goToStep: x => x,
      handleRecalc: x => x,
      isRecalc: false,
      isLoading: false,
      updateQuote: x => x,
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test WorkflowNavigation', () => {
    const props = {
      workflowState: {
        activeTask: 'test',
        completedTasks: ['test1'],
        uiQuestions: [],
      },
      quote: {
        quoteNumber: '1',
      },
      goToStep: x => x,
      handleRecalc: x => x,
      isRecalc: false,
      isLoading: false,
      updateQuote: x => x,
    };
    const wrapper = shallow(<WorkflowNavigation {...props} />);
    expect(wrapper);
    wrapper.instance().getClassForStep('test');
    wrapper.instance().getClassForStep('test1');
    wrapper.instance().onKeyPress({}, 'test');
    wrapper.instance().onKeyPress({ preventDefault: x=>x, charCode: 13}, 'test');
  });
});
