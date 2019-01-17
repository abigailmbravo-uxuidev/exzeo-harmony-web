import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const ERROR_PATH = '/error';

const CheckError = ({ error, redirectUrl }) => {
  return error && error.message
    ? <Redirect to={{ pathname: ERROR_PATH, state: { redirectUrl } }} />
    : null;
};

CheckError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  redirectUrl: PropTypes.string.isRequired
};

export default CheckError;
