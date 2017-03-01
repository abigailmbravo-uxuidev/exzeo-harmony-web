import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import FormGenerator from './FormGenerator';


describe('FormGenerator', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  let props = {};

  beforeEach(() => {
    props = {
      name: 'Testing',
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

  it('should render FormGenerator', () => {
    const wrapper = mount(<Provider store={store}>
      <FormGenerator {...props} />
    </Provider>);

    expect(wrapper).to.exist;
    expect(wrapper.find('FieldGenerator')).to.have.length(2);
  });
});
