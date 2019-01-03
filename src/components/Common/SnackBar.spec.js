import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import SnackBar from './SnackBar';

const middlewares = [];
const mockStore = configureStore(middlewares);
it('renders without crashing', () => {
  const initialState = {
    service: {

    },
    cg: {
      bb: {
        data: {
          modelInstanceId: '123',
          model: {
            variables: [
              {
                name: 'quote',
                value: {
                  result: []
                }
              }
            ]
          },
          uiQuestions: [],
          activeTask: {},
          previousTask: {
            value: {
              result: []
            }
          }
        }
      }
    },
    appState: {
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const props = {
    fieldQuestions: [],
    quoteData: {},
    dispatch: store.dispatch,
    appState: {
      data: {
        submitting: false
      }
    },
    tasks: {
      bb: {
        data: {
          modelInstanceId: '123',
          model: {
            variables: [
              {
                name: 'quote',
                value: {
                  result: []
                }
              }
            ]
          },
          uiQuestions: [],
          activeTask: {},
          previousTask: {
            value: {
              result: []
            }
          }
        }
      }
    },
    handleSubmit() {}
  };
  const wrapper = shallow(<SnackBar {...props} />);
  expect(wrapper);
  wrapper.instance().componentWillReceiveProps({ ...props });
});
