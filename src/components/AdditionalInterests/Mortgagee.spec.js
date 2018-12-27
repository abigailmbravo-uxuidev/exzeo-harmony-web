import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import failedSubmission from '../Common/reduxFormFailSubmit';
import ConnectedApp, { Mortgagee, handleFormSubmit, closeAndSavePreviousAIs, handleInitialize, setMortgageeValues, setMortgagee2Values, setMortgagee3Values } from './Mortgagee';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddMortgagee component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      history: [],
      quote: {},

      updateQuote() {},
      handleSubmit() {},
      fieldQuestions: [{}],
      fieldValues: {
        isAdditional: true,
        isAdditional2: true
      },
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
      quoteState: { quote: {} },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      history: [],
      quote: { additionalInterests: [] },

      updateQuote() {},
      handleSubmit() {},
      fieldQuestions: [{}],
      fieldValues: {
        isAdditional: true,
        isAdditional2: true
      },
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<Mortgagee store={store} {...props} />);
    expect(wrapper);
    const instance = wrapper.instance();

    instance.handleFormSubmit({ isAdditional: true, isAdditional2: true, isAdditional3: true }, props.dispatch, props);
    instance.closeAndSavePreviousAIs();
    handleInitialize(initialState);

    const selectedMortgagee = {
      AIName1: 'One',
      AIName2: 'Two',
      AIAddress1: 'One Main Street',
      AICity: 'Tampa',
      AIState: 'FL',
      AIZip: '33607'
    };
    instance.setMortgagee2Values(selectedMortgagee);
    instance.setMortgageeValues(selectedMortgagee);
    instance.setMortgagee3Values(selectedMortgagee);


    instance.setMortgagee3Values(null);
    instance.setMortgagee2Values(null);
    instance.setMortgageeValues(null);
  });
});
