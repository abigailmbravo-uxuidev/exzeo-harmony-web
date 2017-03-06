import React from 'react';
import { shallow } from 'enzyme';
import PolicyHolderAdditionalForm from './PolicyHolderAdditionalForm';

describe('PolicyHolderAdditionalForm', () => {
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

  it('should render PolicyHolderAdditionalForm', () => {
    const wrapper = shallow(<PolicyHolderAdditionalForm {...props} />);
    expect(wrapper).to.exist;
  });

  it('should trigger call handleOnSubmit', async () => {
    const wrapper = shallow(<PolicyHolderAdditionalForm {...props} />);

    expect(wrapper.find('FieldArray')).to.have.length(1);

    await wrapper.find('#PolicyHolderAdditional').simulate('submit');
    expect(test).to.equal('ok');
  });
});
