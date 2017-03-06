import React from 'react';
import { shallow } from 'enzyme';
import AdditionalInterestsForm from './AdditionalInterestsForm';

describe('AdditionalInterestsForm', () => {
  // const mockStore = configureStore([]);
  // const store = mockStore({});
  let props = {};
  let test = '';

  beforeEach(() => {
    props = {
      reset: fn => fn,
      dispatch: fn => fn,
      handleSubmit: fn => fn,
      push: (link) => {
        test = link;
      },
      completeStep: () => new Promise(resolve => resolve({
        data: {
          completeStep: {
            link: 'ok'
          }
        }
      }))
    };
  });

  it('should render AdditionalInterestsForm', () => {
    const wrapper = shallow(<AdditionalInterestsForm {...props} />);
    expect(wrapper).to.exist;
  });

  it('should trigger call handleOnSubmit', async () => {
    const wrapper = shallow(<AdditionalInterestsForm {...props} />);

    expect(wrapper.find('FieldArray')).to.have.length(5);

    await wrapper.find('#AdditionalInterests').simulate('submit');
    expect(test).to.equal('ok');
  });
});
