import React from 'react';
import { Provider } from 'react-redux';
import { reduxForm } from 'redux-form';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import CustomizeForm from './CustomizeForm';

describe('CustomizeForm', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  let props = {};

  beforeEach(() => {
    props = {
      children: [],
      data: {},
      fieldValues: {},
      questions: [{
        _id: '58827547711411e6b4d3ac5f',
        name: 'moldProperty',
        models: [
          'quote'
        ],
        steps: [
          'customizeDefaultQuote'
        ],
        question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
        group: [
          'coverageLimits'
        ],
        order: 9,
        answerType: 'radio',
        validations: ['required'],
        answers: [
          {
            answer: '$50,000'
          },
          {
            answer: '$100,000'
          }
        ]
      },
      {
        _id: '58827550711411e6b4d3ac60',
        name: 'moldLiability',
        models: [
          'quote'
        ],
        steps: [
          'customizeDefaultQuote'
        ],
        question: 'Ordinance or Law Coverage Limit',
        group: [
          'coverageLimits'
        ],
        order: 10,
        answerType: 'radio',
        answers: [
          {
            answer: '$50,000'
          },
          {
            answer: '$100,000'
          }
        ]
      }],
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn,
      initialize: fn => fn,
      initialValues: {},
      styleName: ''
    };
  });

  it('should render CustomizeForm with redux form wrapper', () => {
    const Customize = reduxForm({ form: 'Customize' })(CustomizeForm);
    const wrapper = mount(<Provider store={store}>
      <Customize {...props} />
    </Provider>);

    expect(wrapper).to.exist;
    expect(wrapper.find('CustomizeForm')).to.have.length(1);
  });
});
