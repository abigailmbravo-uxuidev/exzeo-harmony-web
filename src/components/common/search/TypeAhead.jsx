import React, { PropTypes } from 'react';
import Suggestion from './Suggestion';

const TypeAhead = ({ suggestions }) => (
  <div>
    {
      suggestions ? suggestions.map((s, i) => (
        <Suggestion key={i} suggestion={s} />
      )) : null
    }
  </div>
);

TypeAhead.propTypes = {
  suggestions: PropTypes.Array,
};

export default TypeAhead;
