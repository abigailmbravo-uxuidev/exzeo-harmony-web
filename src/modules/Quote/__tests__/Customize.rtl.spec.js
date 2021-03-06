import React from 'react';

import {
  render,
  fireEvent,
  wait,
  waitForElement,
  defaultQuoteWorkflowProps,
  checkRadio,
  checkSwitch,
  checkSlider,
  checkHeader,
  checkOutput,
  setSliderValue,
  screen
} from '../../../test-utils';
import { format } from '@exzeo/core-ui';
import QuoteWorkflow from '../QuoteWorkflow';

const pageHeaders = [
  {
    dataTest: 'Coverage Limits',
    text: 'Coverage Limits',
    icon: 'fa fa-line-chart'
  },
  {
    dataTest: 'Coverage Options',
    text: 'Coverage Options',
    icon: 'fa fa-tasks'
  },
  {
    dataTest: 'Deductibles',
    text: 'Deductibles',
    icon: 'fa fa-money'
  },
  {
    dataTest: 'Wind Mitigation',
    text: 'Wind Mitigation',
    icon: 'fa fa-flag'
  },
  {
    dataTest: 'Discounts',
    text: 'Discounts',
    icon: 'fa fa-scissors'
  }
];

describe('Testing the QuoteWorkflow Customize Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/customize' },
    match: { params: { step: 'customize', quoteNumber: '12-345-67' } }
  };

  it('NEG:Dwelling Limit', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    const dataTest = 'coverageLimits.dwelling.value';
    const input = getByTestId(`${dataTest}-input`);

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.blur(input);
    await wait(() =>
      expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(
        /Not a valid range./
      )
    );

    fireEvent.change(input, { target: { value: '124000' } });
    fireEvent.blur(input);
    await wait(() =>
      expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(
        /Not a valid range./
      )
    );

    fireEvent.change(input, { target: { value: '2100000' } });
    fireEvent.blur(input);
    await wait(() =>
      expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(
        /Not a valid range./
      )
    );

    fireEvent.change(input, { target: { value: '3000000' } });
    fireEvent.blur(input);
    await wait(() =>
      expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(
        /Not a valid range./
      )
    );

    fireEvent.change(input, { target: { value: '999999999' } });
    fireEvent.blur(input);
    await wait(() =>
      expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(
        /Not a valid range./
      )
    );
  });

  it('POS:Checks all fields', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    await wait(() =>
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    );

    await checkSlider(getByTestId, {
      dataTest: 'coverageLimits.dwelling.value',
      required: true,
      label: 'Dwelling Limit'
    });

    await checkRadio(getByTestId, {
      dataTest: 'coverageLimits.otherStructures.value',
      required: true,
      label: 'Other Structures Limit',
      values: ['0', '2', '5', '10'],
      defaultValue: '2',
      format: x => `${x}%`,
      outputValue: '$6,280'
    });

    await checkRadio(getByTestId, {
      dataTest: 'coverageLimits.personalProperty.value',
      required: true,
      label: 'Personal Property Limit',
      values: ['0', '25', '35', '50'],
      defaultValue: '25',
      outputValue: '$78,500',
      format: x => `${x}%`
    });

    await checkSwitch(getByTestId, {
      dataTest: 'coverageOptions.personalPropertyReplacementCost.answer',
      required: true,
      label: 'Do you want Personal Property Replacement Cost Coverage?',
      defaultValue: true
    });

    await checkOutput(getByTestId, {
      dataTest: 'coverageLimits.lossOfUse.value',
      required: true,
      label: 'Loss of Use Limit',
      value: '$31,400'
    });

    await checkRadio(getByTestId, {
      dataTest: 'coverageLimits.personalLiability.value',
      required: true,
      label: 'Personal Liability Limit',
      values: ['100000', '300000'],
      defaultValue: '300000',
      format: format.toCurrency
    });

    await checkOutput(getByTestId, {
      dataTest: 'coverageLimits.medicalPayments.value',
      required: true,
      label: 'Medical Payments to Others',
      value: '$2,000'
    });

    await checkRadio(getByTestId, {
      dataTest: 'coverageLimits.moldProperty.value',
      required: true,
      label:
        'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
      values: ['10000', '25000', '50000'],
      defaultValue: '10000',
      format: format.toCurrency
    });

    await checkRadio(getByTestId, {
      dataTest: 'coverageLimits.moldLiability.value',
      required: true,
      type: 'radio',
      label:
        'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
      values: ['50000', '100000'],
      defaultValue: '50000',
      format: format.toCurrency
    });

    await checkRadio(getByTestId, {
      dataTest: 'coverageLimits.ordinanceOrLaw.value',
      required: true,
      type: 'radio',
      label: 'Ordinance or Law Coverage Limit',
      values: ['25', '50'],
      defaultValue: '25',
      format: x => `${x}% of Dwelling Limit`
    });

    await checkSwitch(getByTestId, {
      dataTest: 'coverageOptions.sinkholePerilCoverage.answer',
      required: true,
      type: 'switch',
      label: 'Do you want Sinkhole Loss Coverage?',
      defaultValue: true
    });

    await checkRadio(getByTestId, {
      dataTest: 'deductibles.allOtherPerils.value',
      required: true,
      type: 'radio',
      label: 'All Other Perils Deductible',
      values: ['500', '1000', '2500'],
      defaultValue: '1000',
      format: format.toCurrency
    });

    await checkRadio(getByTestId, {
      dataTest: 'deductibles.hurricane.value',
      required: true,
      type: 'radio',
      label: 'Hurricane Deductible',
      values: ['2', '5', '10'],
      defaultValue: '2',
      format: x => `${x}% of Dwelling Limit`,
      outputValue: '$6,280'
    });

    await checkRadio(getByTestId, {
      dataTest: 'deductibles.sinkhole.value',
      required: true,
      type: 'radio',
      label: 'Sinkhole Deductible',
      values: ['10'],
      defaultValue: '10',
      format: x => `${x}% of Dwelling Limit`,
      outputValue: '$31,400'
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.windMitigation.roofCovering',
      required: true,
      type: 'radio',
      label: 'Roof Covering:',
      values: ['Non-FBC', 'FBC', 'Other'],
      defaultValue: 'Other'
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.windMitigation.roofDeckAttachment',
      required: true,
      type: 'radio',
      label: 'Roof Deck Attachment:',
      values: ['A', 'B', 'C', 'D', 'Concrete', 'Other'],
      defaultValue: 'Other'
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.windMitigation.roofToWallConnection',
      required: true,
      type: 'radio',
      label: 'Roof to Wall Attachment:',
      values: ['Toe Nails', 'Clips', 'Single Wraps', 'Double Wraps', 'Other'],
      defaultValue: 'Other'
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.windMitigation.roofGeometry',
      required: true,
      type: 'radio',
      label: 'Roof Geometry:',
      values: ['Flat', 'Gable', 'Hip', 'Other'],
      defaultValue: 'Other'
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.windMitigation.secondaryWaterResistance',
      required: true,
      type: 'radio',
      label: 'Secondary Water Resistance (SWR):',
      values: ['Yes', 'No', 'Other'],
      defaultValue: 'Other'
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.windMitigation.openingProtection',
      required: true,
      type: 'radio',
      label: 'Opening Protection:',
      values: ['None', 'Basic', 'Hurricane', 'Other'],
      defaultValue: 'Other'
    });

    await checkSwitch(getByTestId, {
      dataTest: 'property.burglarAlarm',
      required: true,
      type: 'switch',
      label: 'Does the property have a burglar alarm?',
      defaultValue: false
    });

    await checkSwitch(getByTestId, {
      dataTest: 'property.fireAlarm',
      required: true,
      type: 'switch',
      label: 'Does the property have a fire alarm?',
      defaultValue: false
    });

    await checkRadio(getByTestId, {
      dataTest: 'property.sprinkler',
      required: true,
      type: 'radio',
      label: 'Sprinkler',
      values: ['N', 'A', 'B'],
      defaultValue: 'N'
    });
  });

  it('POS:Checks Header Text', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    pageHeaders.forEach(header =>
      checkHeader(getByTestId, header.dataTest, header)
    );
  });

  it('POS:Checks Output Values for Slider', async () => {
    const outputFields = [
      'coverageLimits.otherStructures.value_wrapper',
      'coverageLimits.personalProperty.value_wrapper',
      'coverageLimits.medicalPayments.value_wrapper',
      'coverageLimits.lossOfUse.value_wrapper',
      'deductibles.hurricane.value_wrapper'
    ];
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    const slider = getByTestId('coverageLimits.dwelling.value-slider');

    const setSliderAndCheckOutput = (value, { dataTest, outputValue }) => {
      setSliderValue(slider, value);
      expect(
        document.querySelector(`[data-test="${dataTest}"] output`)
      ).toHaveTextContent(outputValue);
    };

    await wait(() =>
      setSliderAndCheckOutput('350000', {
        dataTest: outputFields[0],
        outputValue: '$7,000'
      })
    );

    await wait(() =>
      setSliderAndCheckOutput('380000', {
        dataTest: outputFields[1],
        outputValue: '$95,000'
      })
    );

    await wait(() =>
      setSliderAndCheckOutput('380000', {
        dataTest: outputFields[2],
        outputValue: '$2,000'
      })
    );

    await wait(() =>
      setSliderAndCheckOutput('303000', {
        dataTest: outputFields[3],
        outputValue: '$30,300'
      })
    );

    await wait(() =>
      setSliderAndCheckOutput('295000', {
        dataTest: outputFields[4],
        outputValue: '$5,900'
      })
    );
  });

  it('POS:Check Conditional Options coverageLimits.personalProperty 500,000 or greater', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    await waitForElement(() => [
      getByTestId('coverageLimits.dwelling.value-input'),
      getByTestId('coverageLimits.personalProperty.value_wrapper')
    ]);

    const personalPropertyWrapper = getByTestId(
      'coverageLimits.personalProperty.value_wrapper'
    );
    await wait(() => {
      const disabledOptions = personalPropertyWrapper.querySelectorAll(
        '[class="label-segmented disabled"]'
      );
      expect(disabledOptions.length).toBe(0);
    });

    fireEvent.change(getByTestId('coverageLimits.dwelling.value-input'), {
      target: { value: '2000000' }
    });

    await wait(() => {
      const disabledOptions = personalPropertyWrapper.querySelectorAll(
        '[class="label-segmented disabled"]'
      );
      expect(disabledOptions.length).toBe(2);
    });
  });
});
