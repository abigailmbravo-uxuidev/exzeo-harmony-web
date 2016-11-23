/* globals document */
/* eslint react/jsx-filename-extension:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../src/components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
