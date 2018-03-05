import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import PolicyHolderPopup from './PolicyHolderPopup';

const middlewares = [];
const mockStore = configureStore(middlewares);

it('renders PolicyHolderPopup', () => {
  const initialState = {
    cg: {
      bb: {
        data: {
          modelInstanceId: '123',
          model: {
            variables: [{
              name: 'getFinalQuote', value: { result: {} }
            }
            ]
          },
          uiQuestions: []
        }
      }
    },
    appState: {
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const props = {
    quote: {}
  };
  const wrapper = shallow(<PolicyHolderPopup {...props} store={store} />);
  expect(wrapper);
});
