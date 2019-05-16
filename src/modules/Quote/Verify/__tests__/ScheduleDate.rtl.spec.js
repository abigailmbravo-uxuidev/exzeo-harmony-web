import React from 'react';
import { render } from 'react-testing-library';
import ScheduleDate from '../ScheduleDate';

import { policyholder } from '../../../../test-utils';

describe('Congragulations Schedule Date Modal testing', () => {
  it('Renders static stuff correctly', () => {
    const props = {
      submitting: false,
      entity: { policyHolders: [policyholder]},
      companyName: 'Mom Co.',
      productDescription: 'Robot'
    };

    const { getByText } = render(<ScheduleDate {...props} />);
    expect(getByText('Congratulations'));
    expect(getByText('You have successfully completed a Mom Co. Robot Quote.'));
    expect(getByText('With this information, we will generate the Robot Application, and e-mail it to:'));
    expect(getByText('Bruce Wayne (Batman@gmail.com)'));
    expect(getByText('A copy will also be sent to you ()'));
    expect(getByText('Once all electronic signatures have been received, the policy will automatically be bound and the policy documents will be emailed to you and to the policyholder.'));
    expect(getByText('NOTE: All signatures must be completed within 10 days, or the application will expire.'));
    expect(getByText('Once you send, no changes can be made to this quote.'));
    expect(getByText('Edit Quote'));
    expect(getByText('Save Quote, Continue Later'));
    expect(getByText('Send Application For Signature'));
  });

  it('Data test tags are different', () => {
    const props = {
      submitting: false,
      entity: { policyHolders: [policyholder] },
      companyName: 'Mom Co.',
      productDescription: 'Robot'
    };

    const { getAllByTestId } = render(<ScheduleDate {...props} />);
    expect(getAllByTestId('modal-submit').length).toEqual(1);
  });
});
