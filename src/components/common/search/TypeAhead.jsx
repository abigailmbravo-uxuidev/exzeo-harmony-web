import React, { PropTypes } from 'react';
import Suggestion from './Suggestion';

const TypeAhead = ({ suggestions }) => (
  <div>
    {
      suggestions ? suggestions.map(() => (
        <Suggestion />
      )) : null
    }
  </div>
);

TypeAhead.propTypes = {
  suggestions: PropTypes.Array,
};

export default TypeAhead;
