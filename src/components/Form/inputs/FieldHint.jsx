import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const FieldHint = ({ name, hint }) => (
  <span className="tooltip-wrapper">
    <i className="fa fa-info-circle" data-tip data-for={name} />
    <ReactTooltip place="right" id={name} type="dark" effect="solid">
      {hint}
    </ReactTooltip>
  </span>
);

FieldHint.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired
};

export default FieldHint;
