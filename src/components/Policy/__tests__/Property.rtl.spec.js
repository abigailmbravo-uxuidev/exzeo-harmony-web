import React from 'react';
import { render } from 'react-testing-library';

import { checkHeader, latestPolicy } from '../../../test-utils';
import Property from '../Property';

const pageHeaders = [
  {
    text: 'Home and Location',
    icon: 'fa fa-map-marker'
  },
  {
    text: 'Wind Mitigation',
    icon: 'fa fa-flag'
  }
];

describe('Policy Property Page testing', () => {
  const props = { policy: latestPolicy };

  it('POS:Checks headers', () => {
    const { getByText } = render(<Property {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('POS:Checks Home and Location', () => {
    const { getByText } = render(<Property {...props} />);
    const sectionData = [
      { label: 'Year Home Built', value: '1998' },
      { label: 'Protection Class', value: '3' },
      { label: 'Dist. to Tidal Waters', value: '17,740.8 ft.' },
      { label: 'Residence Type', value: 'SINGLE FAMILY' },
      { label: 'Construction', value: 'MASONRY' },
      { label: 'BCEG', value: '3' },
      { label: 'Dist. to Fire Hydrant', value: '264.05 ft.' },
      { label: 'Square Footage', value: '2640' },
      { label: 'Year Roof Built', value: '2001' },
      { label: 'Family Units', value: '1-2' },
      { label: 'Dist. to Fire Station', value: '0.79mi.' },
      { label: 'Flood Zone', value: 'X' }
    ];
    sectionData.forEach(({ label, value }) =>
      expect(getByText(label).nextSibling.textContent).toEqual(value)
    );
  });

  it('POS:Checks Wind Mitigation', () => {
    const { getByText } = render(<Property {...props} />);
    const sectionData = [
      { label: 'Roof Covering', value: 'test covering' },
      { label: 'Roof Geometry', value: 'test geometry' },
      { label: 'FBC Wind Speed', value: '130' },
      { label: 'Internal Pressure Design', value: 'test ipd' },
      { label: 'Roof Deck Attachment', value: 'test roofdeckattachment' },
      { label: 'Secondary Water Resistance (SWR)', value: 'test swr value' },
      { label: 'FBC Wind Speed Design', value: '130' },
      { label: 'Wind Borne Debris Region (WBDR)', value: 'Yes' },
      { label: 'Roof to Wall Attachment', value: 'test roof to wall value' },
      { label: 'Opening Protection', value: 'test op' },
      { label: 'Terrain', value: 'B' },
      { label: 'Wind Mit Factor', value: '0' }
    ];

    sectionData.forEach(({ label, value }) =>
      expect(getByText(label).nextSibling.textContent).toEqual(value)
    );
  });
});
