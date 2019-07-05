import React from 'react';
import { generateField, getErrorToolTip } from './searchUtils';

describe('Search Utils', () => {
  it('tests generateField', () => {
    const field = generateField('test', 'place', 'label', false, '', 'true');
    expect(field.props.children.length).toEqual(2);
  });

  it('tests generateField with errors', () => {
    const field = generateField(
      'test',
      'place',
      'label',
      { test: 'error' },
      '',
      'true'
    );
    expect(field.props.className).toEqual('form-group error ');
  });

  it('tests getErrorToolTip no error', () => {
    const field = getErrorToolTip(null, 'test');
    expect(field).toEqual(<span />);
  });

  it('tests getErrorToolTip no error', () => {
    const field = getErrorToolTip({ test: 'error' }, 'test');
    expect(field.props.children.length).toEqual(2);
  });
});
