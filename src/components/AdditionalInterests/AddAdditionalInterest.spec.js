import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { AddAdditionalInterest, noAddAdditionalInterestSubmit, goToStep, returnTaskDataName, returnTaskName, openDeleteAdditionalInterest, hideAdditionalInterestModal, deleteAdditionalInterest } from './AddAdditionalInterest';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddAdditionalInterest component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      handleSubmit() {},
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<AddAdditionalInterest {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: [],
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
      actions: {
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          batchCompleteTask() { return Promise.resolve(); },
          completeTask() {}
        }
      },
      fieldQuestions: [],
      quoteData: {},
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

    noAddAdditionalInterestSubmit({}, props.dispatch, props);
    goToStep(props, 'Mortgagee');
    goToStep(props, 'Lienholder');
    goToStep(props, 'Bill Payer');
    goToStep(props, 'Additional Interest');
    goToStep(props, 'Additional Insured');
    returnTaskName('Mortgagee');
    returnTaskName('Lienholder');
    returnTaskName('Bill Payer');
    returnTaskName('Additional Interest');
    returnTaskName('Additional Insured');
    returnTaskDataName('Mortgagee');
    returnTaskDataName('Lienholder');
    returnTaskDataName('Bill Payer');
    returnTaskDataName('Additional Interest');
    returnTaskDataName('Additional Insured');

    AddAdditionalInterest(props);
    openDeleteAdditionalInterest({}, props);
    hideAdditionalInterestModal(props);

    deleteAdditionalInterest({}, props);
  });
});
