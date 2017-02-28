import React from 'react';
import { shallow } from 'enzyme';
import DemographicsForm from './DemographicsForm';

// TODO: Write out the unit and integration tests for this
// Reference: https://github.com/tylercollier/redux-form-test
describe('<DemographicsForm />', () => {
  let onSubmit;
  beforeEach(() => {
    onSubmit = fn => fn;
  });

  it('renders when mounted with handleSubmit', () => {
    const wrapper = shallow(
      <DemographicsForm
        handleSubmit={onSubmit}
      />
    );

    expect(wrapper).to.exist;
  });
});
