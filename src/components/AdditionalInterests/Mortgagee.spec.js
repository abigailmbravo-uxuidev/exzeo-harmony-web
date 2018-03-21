import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import failedSubmission from '../Common/reduxFormFailSubmit';
import ConnectedApp, { Mortgagee, handleFormSubmit, closeAndSavePreviousAIs, handleInitialize, setMortgageeValues, setMortgagee2Values } from './Mortgagee';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddMortgagee component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            previousTask: {
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
            uiQuestions: []
          }
        }
      },
      fieldQuestions: [{}],
      actions: {
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          completeTask() {}
        }
      },
      handleSubmit() {},
      fieldValues: {
        isAdditional: true,
        isAdditional2: true
      },
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<Mortgagee {...props} />);
    expect(wrapper);
    wrapper.find('[name="mortgage"]').simulate('change', { target: { value: 'ABC' }, props });
    wrapper.find('[name="mortgage2"]').simulate('change', { target: { value: 'ABC' }, props });
    wrapper.find('#goBack').simulate('click');
  });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [
                { name: 'getQuoteBeforeAIs', value: { result: { additionalInterests: [{ type: 'Mortgagee' }] } } }
              ]
            },
            uiQuestions: [{}],
            activeTask: {
              name: 'bb'
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
      quoteData: {
        additionalInterests: []
      },
      actions: {
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          completeTask() {}
        }
      },
      fieldValues: {
        isAdditional: false
      },
      dispatch: store.dispatch,
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            previousTask: {
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
            uiQuestions: []
          }
        }
      },
      handleSubmit() {},
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);

    handleFormSubmit({ isAdditional: true, isAdditional2: true }, props.dispatch, props);
    Mortgagee(props);
    closeAndSavePreviousAIs(props);
    handleInitialize(initialState);
    failedSubmission({}, props.dispatch, () => {}, props);

    const selectedMortgagee = {
      AIName1: 'One',
      AIName2: 'Two',
      AIAddress1: 'One Main Street',
      AICity: 'Tampa',
      AIState: 'FL',
      AIZip: '33607'
    };
    setMortgagee2Values(selectedMortgagee, props);
    setMortgageeValues(selectedMortgagee, props);

    setMortgagee2Values(null, props);
    setMortgageeValues(null, props);
  });
});
