import React from 'react';
import PropTypes from 'prop-types';

const Warning = ({ config, initialValues: { underwritingExceptions } }) => {
  if (!underwritingExceptions || underwritingExceptions.length < 1) return null;
  const { as, className } = config;
  const Element = as;
  const warnings = underwritingExceptions.filter(ex => ex.code.startsWith(4));

  return (
    <React.Fragment>
      {warnings.map(item => {
        return (
          <Element
            className={['uw-warning', className].join(' ')}
            key={item._id}
          >
            {item.displayText}
          </Element>
        );
      })}
    </React.Fragment>
  );
};

Warning.propTypes = {
  config: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    underwritingExceptions: PropTypes.array
  })
};

export default Warning;
