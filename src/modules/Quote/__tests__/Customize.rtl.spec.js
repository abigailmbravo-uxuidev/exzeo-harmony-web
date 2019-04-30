import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  checkRadio, checkSwitch, checkSlider, checkHeader, checkLabel,
  customizeList as list,
  customizeUiQuestions as uiQuestions,
  quote,
  setSliderValue
} from '../../../test-utils';
import ConnectedQuoteWorkflow from '../QuoteWorkflow';

const fields = [
  {
    name: 'coverageLimits.dwelling.amount',
    required: true,
    type: 'slider',
    label: 'Dwelling Limit',
    tooltipText: 'structure of your home'
  },
  {
    name: 'coverageLimits.otherStructures.value',
    required: true,
    type: 'radio',
    label: 'Other Structures Limit',
    tooltipText: 'the other structures',
    values: ['0', '2', '5', '10']
  },
  {
    name: 'coverageLimits.personalProperty.value',
    required: true,
    type: 'radio',
    label: 'Personal Property Limit',
    tooltipText: 'personal belongings',
    values: ['0', '25', '35', '50']
  },
  {
    name: 'coverageOptions.personalPropertyReplacementCost.answer',
    required: true,
    type: 'switch',
    label: 'Do you want Personal Property Replacement Cost Coverage?',
    tooltipText: 'Replacement Cost Coverage',
    defaultValue: true
  },
  {
    name: 'coverageLimits.lossOfUse.value',
    required: true,
    type: 'text',
    label: 'Loss of Use Limit',
    tooltipText: 'This is your personal belongings'
  },
  {
    name: 'coverageLimits.personalLiability.value',
    required: true,
    type: 'radio',
    label: 'Personal Liability Limit',
    values: ['100000', '300000'],
  },
  {
    name: 'coverageLimits.medicalPayments.value',
    required: true,
    type: 'text',
    label: 'Medical Payments to Others'
  },
  {
    name: 'coverageLimits.moldProperty.value',
    required: true,
    type: 'radio',
    label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
    values: ['10000', '25000', '50000'],
  },
  {
    name: 'coverageLimits.moldLiability.value',
    required: true,
    type: 'radio',
    label: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability',
    values: ['50000', '100000']
  },
  {
    name: 'coverageLimits.ordinanceOrLaw.value',
    required: true,
    type: 'radio',
    label: 'Ordinance or Law Coverage Limit',
    values: ['25', '50']
  },
  {
    name: 'coverageOptions.sinkholePerilCoverage.answer',
    required: true,
    type: 'switch',
    label: 'Do you want Sinkhole Loss Coverage?',
    defaultValue: true
  },
  {
    name: 'deductibles.allOtherPerils.value',
    required: true,
    type: 'radio',
    label: 'All Other Perils Deductible',
    values: ['500', '1000', '2500'],
  },
  {
    name: 'deductibles.hurricane.value',
    required: true,
    type: 'radio',
    label: 'Hurricane Deductible',
    values: ['2', '5', '10']
  },
  {
    name: 'deductibles.sinkhole.value',
    type: 'radio',
    label: 'Sinkhole Deductible',
    values: ['10']
  },
  {
    name: 'property.windMitigation.roofCovering',
    required: true,
    type: 'radio',
    label: 'Roof Covering:',
    values: ['Non-FBC', 'FBC', 'Other']
  },
  {
    name: 'property.windMitigation.roofDeckAttachment',
    required: true,
    type: 'radio',
    label: 'Roof Deck Attachment:',
    values: ['A', 'B', 'C', 'D', 'Concrete', 'Other']
  },
  {
    name: 'property.windMitigation.roofToWallConnection',
    required: true,
    type: 'radio',
    label: 'Roof to Wall Attachment:',
    values: ['Toe Nails', 'Clips', 'Single Wraps', 'Double Wraps', 'Other']
  },
  {
    name: 'property.windMitigation.roofGeometry',
    required: true,
    type: 'radio',
    label: 'Roof Geometry:',
    values: ['Flat', 'Gable', 'Hip', 'Other']
  },
  {
    name: 'property.windMitigation.secondaryWaterResistance',
    required: true,
    type: 'radio',
    label: 'Secondary Water Resistance (SWR):',
    values: ['Yes', 'No', 'Other']
  },
  {
    name: 'property.windMitigation.openingProtection',
    required: true,
    type: 'radio',
    label: 'Opening Protection:',
    values: ['None', 'Basic', 'Hurricane', 'Other']
  },
  {
    name: 'property.burglarAlarm',
    required: true,
    type: 'switch',
    label: 'Does the property have a burglar alarm?',
    defaultValue: false
  },
  {
    name: 'property.fireAlarm',
    required: true,
    type: 'switch',
    label: 'Does the property have a fire alarm?',
    defaultValue: false
  },
  {
    name: 'property.sprinkler',
    required: true,
    type: 'radio',
    label: 'Sprinkler',
    values: ['N', 'A', 'B']
  }
];

const pageHeaders = [
  {
    name: 'Coverage Limits',
    text: 'Coverage Limits',
    icon: 'fa fa-line-chart'
  },
  {
    name: 'Coverage Options',
    text: 'Coverage Options',
    icon: 'fa fa-tasks'
  },
  {
    name: 'Deductibles',
    text: 'Deductibles',
    icon: 'fa fa-money'
  },
  {
    name: 'Wind Mitigation',
    text: 'Wind Mitigation',
    icon: 'fa fa-flag'
  },
  {
    name: 'Discounts',
    text: 'Discounts',
    icon: 'fa fa-scissors'
  }
];

describe('Testing the QuoteWorkflow Customize Page', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/12-5162219-01/customize'
    }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote,
      state: {
        ...defaultInitialState.quoteState.state,
        uiQuestions,
        activeTask: 'askToCustomizeDefaultQuote'
      }
    },
    list: {
      ...defaultInitialState.list,
      ...list
    }
  };

  it('NEG:Dwelling Limit', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    
    fields.filter(({ type }) => type === 'slider')
      .forEach(({ name }) => {
        const input = getByTestId(`${name}-input`);
        fireEvent.change(input, { target: { value: '0' }});
        fireEvent.blur(input);
        expect(getByTestId(`${name}_error`)).toHaveTextContent(/Not a valid range./);
        fireEvent.change(input, { target: { value: '124000' } });
        fireEvent.blur(input);
        expect(getByTestId(`${name}_error`)).toHaveTextContent(/Not a valid range./);
        fireEvent.change(input, { target: { value: '2100000' } });
        fireEvent.blur(input);
        expect(getByTestId(`${name}_error`)).toHaveTextContent(/Not a valid range./);
      });
  });

  it('POS:Checks all fields', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    fields.filter(({ required }) => required)
      .forEach(field => {
        checkLabel(getByTestId, field);
        if (field.type === 'radio') checkRadio(getByTestId, field);
        if (field.type === 'switch') checkSwitch(getByTestId, field);
        if (field.type === 'slider') checkSlider(getByTestId, field);
        if (field.tooltipText) expect(getByTestId(`${field.name}_tooltip`));
      });
  });

  it('POS:Checks Header Text', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    pageHeaders.forEach(header => checkHeader(getByTestId, header));
  });

  it('POS:Checks Output Values', () => {
    const outputFields = [
      'coverageLimits.otherStructures.value_wrapper',
      'coverageLimits.personalProperty.value_wrapper',
      'coverageLimits.lossOfUse.value_wrapper',
      'deductibles.hurricane.value_wrapper'
    ];
    const setSliderAndCheckOutput = ({ slider, value }, { name, outputValue }) => {
      setSliderValue(slider, value);
      expect(document.querySelector(`[data-test="${name}"] output`)).toHaveTextContent(outputValue);
    };

    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    const slider = getByTestId('coverageLimits.dwelling.amount-slider');
    setSliderAndCheckOutput({ slider, value: '350000' }, { name: outputFields[0], outputValue: '$ 7,000' });
    setSliderAndCheckOutput({ slider, value: '380000' }, { name: outputFields[1], outputValue: '$ 95,000' });
    setSliderAndCheckOutput({ slider, value: '303000' }, { name: outputFields[2], outputValue: '$ 30,300' });
    setSliderAndCheckOutput({ slider, value: '295000' }, { name: outputFields[3], outputValue: '$ 5,900' });
  });
});
