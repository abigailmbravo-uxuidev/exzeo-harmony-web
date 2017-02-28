import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import UnderwritingForm from './UnderwritingForm';
import FormGenerator from '../../form/FormGenerator';

describe('UnderwritingForm', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  let props = {};

  beforeEach(() => {
    props = {
      children: [],
      data: {},
      fieldValues: {},
      form: {},
      questions: [{
        _id: '586bcbfc711411e6b4d38da4',
        name: 'monthsOccupied',
        models: [
          'quote'
        ],
        validations: [
          'required'
        ],
        steps: [
          'askUWAnswers'
        ],
        companyId: [
          'TTIC'
        ],
        state: [
          'FL'
        ],
        product: [
          'HO3'
        ],
        active: true,
        question: 'How many months a year does the owner live in the home?',
        answerType: 'radio',
        answers: [
          {
            answer: '0-3'
          },
          {
            answer: '4-6'
          },
          {
            answer: '7-9'
          },
          {
            answer: '10+'
          }
        ],
        order: 3
      },
      {
        _id: '586bcb89711411e6b4d38da1',
        name: 'rented',
        models: [
          'quote'
        ],
        validations: [
          'required'
        ],
        steps: [
          'askUWAnswers'
        ],
        companyId: [
          'TTIC'
        ],
        state: [
          'FL'
        ],
        product: [
          'HO3'
        ],
        active: true,
        question: 'Is the home or any structures on the property ever rented?',
        answerType: 'radio',
        answers: [
          {
            answer: 'Yes'
          },
          {
            answer: 'Occasionally'
          },
          {
            answer: 'Never'
          }
        ],
        order: 1
      }
      ],
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn,
      initialize: fn => fn,
      initialValues: {},
      styleName: ''
    };
  });

  it('should render UnderwritingForm', () => {
    const wrapper = mount(<Provider store={store}>
      <UnderwritingForm {...props} />
    </Provider>);

    expect(wrapper).to.exist;
    expect(wrapper.find('UnderwritingForm')).to.have.length(1);
  });
});
