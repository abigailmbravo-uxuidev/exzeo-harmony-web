import React from 'react';
import { fireEvent, waitForDomChange } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultQuoteWorkflowProps,
  checkRadio, checkSwitch, checkSlider, checkHeader, checkLabel,
  setSliderValue
} from '../../../test-utils';
import { format } from '@exzeo/core-ui';
import { QuoteWorkflow } from '../QuoteWorkflow';

const fields = [
  {
    dataTest: 'coverageLimits.dwelling.value',
    required: true,
    type: 'slider',
    label: 'Dwelling Limit',
    tooltipText: 'structure of your home'
  },
  {
    dataTest: 'coverageLimits.otherStructures.value',
    required: true,
    type: 'radio',
    label: 'Other Structures Limit',
    tooltipText: 'the other structures',
    values: ['0', '2', '5', '10'],
    format: x => `${x}%`
  },
  {
    dataTest: 'coverageLimits.personalProperty.value',
    required: true,
    type: 'radio',
    label: 'Personal Property Limit',
    tooltipText: 'personal belongings',
    values: ['0', '25', '35', '50'],
    format: x => `${x}%`
  },
  {
    dataTest: 'coverageOptions.personalPropertyReplacementCost.answer',
    required: true,
    type: 'switch',
    label: 'Do you want Personal Property Replacement Cost Coverage?',
    tooltipText: 'Replacement Cost Coverage',
    defaultValue: true
  },
  {
    dataTest: 'coverageLimits.lossOfUse.value',
    required: true,
    type: 'text',
    label: 'Loss of Use Limit',
    tooltipText: 'This is your personal belongings'
  },
  {
    dataTest: 'coverageLimits.personalLiability.value',
    required: true,
    type: 'radio',
    label: 'Personal Liability Limit',
    values: ['100000', '300000'],
    format: format.toCurrency
  },
  {
    dataTest: 'coverageLimits.medicalPayments.value',
    required: true,
    type: 'text',
    label: 'Medical Payments to Others'
  },
  {
    dataTest: 'coverageLimits.moldProperty.value',
    required: true,
    type: 'radio',
    label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
    values: ['10000', '25000', '50000'],
    format: format.toCurrency
  },
  {
    dataTest: 'coverageLimits.moldLiability.value',
    required: true,
    type: 'radio',
    label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
    values: ['50000', '100000'],
    format: format.toCurrency
  },
  {
    dataTest: 'coverageLimits.ordinanceOrLaw.value',
    required: true,
    type: 'radio',
    label: 'Ordinance or Law Coverage Limit',
    values: ['25', '50'],
    format: x => `${x}% of Dwelling Limit`
  },
  {
    dataTest: 'coverageOptions.sinkholePerilCoverage.answer',
    required: true,
    type: 'switch',
    label: 'Do you want Sinkhole Loss Coverage?',
    defaultValue: true
  },
  {
    dataTest: 'deductibles.allOtherPerils.value',
    required: true,
    type: 'radio',
    label: 'All Other Perils Deductible',
    values: ['500', '1000', '2500'],
    format: format.toCurrency
  },
  {
    dataTest: 'deductibles.hurricane.value',
    required: true,
    type: 'radio',
    label: 'Hurricane Deductible',
    values: ['2', '5', '10'],
    format: x => `${x}% of Dwelling Limit`
  },
  {
    dataTest: 'deductibles.sinkhole.value',
    type: 'radio',
    label: 'Sinkhole Deductible',
    values: ['10'],
    format: format.toCurrency
  },
  {
    dataTest: 'property.windMitigation.roofCovering',
    required: true,
    type: 'radio',
    label: 'Roof Covering:',
    values: ['Non-FBC', 'FBC', 'Other']
  },
  {
    dataTest: 'property.windMitigation.roofDeckAttachment',
    required: true,
    type: 'radio',
    label: 'Roof Deck Attachment:',
    values: ['A', 'B', 'C', 'D', 'Concrete', 'Other']
  },
  {
    dataTest: 'property.windMitigation.roofToWallConnection',
    required: true,
    type: 'radio',
    label: 'Roof to Wall Attachment:',
    values: ['Toe Nails', 'Clips', 'Single Wraps', 'Double Wraps', 'Other']
  },
  {
    dataTest: 'property.windMitigation.roofGeometry',
    required: true,
    type: 'radio',
    label: 'Roof Geometry:',
    values: ['Flat', 'Gable', 'Hip', 'Other']
  },
  {
    dataTest: 'property.windMitigation.secondaryWaterResistance',
    required: true,
    type: 'radio',
    label: 'Secondary Water Resistance (SWR):',
    values: ['Yes', 'No', 'Other']
  },
  {
    dataTest: 'property.windMitigation.openingProtection',
    required: true,
    type: 'radio',
    label: 'Opening Protection:',
    values: ['None', 'Basic', 'Hurricane', 'Other']
  },
  {
    dataTest: 'property.burglarAlarm',
    required: true,
    type: 'switch',
    label: 'Does the property have a burglar alarm?',
    defaultValue: false
  },
  {
    dataTest: 'property.fireAlarm',
    required: true,
    type: 'switch',
    label: 'Does the property have a fire alarm?',
    defaultValue: false
  },
  {
    dataTest: 'property.sprinkler',
    required: true,
    type: 'radio',
    label: 'Sprinkler',
    values: ['N', 'A', 'B']
  }
];

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
    location: { pathname: '/quote/12-345-67/customize' }
  };

  it('NEG:Dwelling Limit', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    fields.filter(({ type }) => type === 'slider')
      .forEach(({ dataTest }) => {
        const input = getByTestId(`${dataTest}-input`);

        fireEvent.change(input, { target: { value: '0' }});
        fireEvent.blur(input);
        expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(/Not a valid range./);

        fireEvent.change(input, { target: { value: '124000' }});
        fireEvent.blur(input);
        expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(/Not a valid range./);

        fireEvent.change(input, { target: { value: '2100000' }});
        fireEvent.blur(input);
        expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(/Not a valid range./);

        fireEvent.change(input, { target: { value: '3000000' }});
        fireEvent.blur(input);
        expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(/Not a valid range./);

        fireEvent.change(input, { target: { value: '999999999' }});
        fireEvent.blur(input);
        expect(getByTestId(`${dataTest}_error`)).toHaveTextContent(/Not a valid range./);
      });
  });

  it('POS:Checks all fields', () => {
    const { getByTestId, container } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    fields.filter(({ required }) => required)
      .forEach(async field => {
        checkLabel(getByTestId, field);
        if (field.type === 'radio') checkRadio(getByTestId, field);
        if (field.type === 'switch') checkSwitch(getByTestId, field);
        if (field.type === 'slider') checkSlider(getByTestId, field);
        if (field.tooltipText) {
          fireEvent.mouseOver(getByTestId(`${field.dataTest}_tooltip`));
          // wait for our mouseover to occur
          await waitForDomChange({ container }).then(() =>
            expect(document.getElementById(field.dataTest).textContent).toMatch(field.tooltipText)
          );
        };
      });
  });

  it('POS:Checks Header Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Checks Output Values', () => {
    const outputFields = [
      'coverageLimits.otherStructures.value_wrapper',
      'coverageLimits.personalProperty.value_wrapper',
      'coverageLimits.medicalPayments.value_wrapper',
      'coverageLimits.lossOfUse.value_wrapper',
      'deductibles.hurricane.value_wrapper'
    ];
    const { getByTestId } = renderWithReduxAndRouter(<QuoteWorkflow {...props} />);
    const slider = getByTestId('coverageLimits.dwelling.value-slider');

    const setSliderAndCheckOutput = (value, { dataTest, outputValue }) => {
      setSliderValue(slider, value);
      expect(document.querySelector(`[data-test="${dataTest}"] output`)).toHaveTextContent(outputValue);
    };

    setSliderAndCheckOutput('350000', { dataTest: outputFields[0], outputValue: '$ 7,000' });
    setSliderAndCheckOutput('380000', { dataTest: outputFields[1], outputValue: '$ 87,500' });
    setSliderAndCheckOutput('380000', { dataTest: outputFields[2], outputValue: '$ 2,000' });
    setSliderAndCheckOutput('303000', { dataTest: outputFields[3], outputValue: '$ 30,300' });
    setSliderAndCheckOutput('295000', { dataTest: outputFields[4], outputValue: '$ 5,900' });
  });
});
