import React from 'react';
import { shallow } from 'enzyme';
import UnderwritingForm from './UnderwritingForm';

describe('UnderwritingForm', () => {
  let props = {};

  beforeEach(() => {
    props = {
      children: [],
      data: {
        steps: {
          questions: [
            {
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
            }, {
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
          ]
        }
      },
      fieldValues: {},
      form: {},
      handleSubmit: fn => fn,
      handleOnSubmit: fn => fn,
      initialize: fn => fn,
      initialValues: {},
      styleName: ''
    };
  });

  it('should render UnderwritingForm', () => {
    const wrapper = shallow(<UnderwritingForm {...props} />);
    expect(wrapper).to.exist;
  });
  it('should submit and push new page', async () => {
    let test = '';
    props.push = (link) => {
      test = link;
    };
    props.completeStep = () => new Promise(resolve => resolve({
      data: {
        completeStep: {
          link: 'ok'
        }
      }
    }));
    const wrapper = shallow(<UnderwritingForm {...props} />);
    expect(wrapper).to.exist;
    await wrapper.instance().handleOnSubmit();
    expect(test).to.equal('ok');
  });
});
