import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ERROR_PATH = '/error';

export const CheckError = ({ error, redirectUrl }) => {
  return error && error.message
    ? <Redirect to={{ pathname: ERROR_PATH, state: { redirectUrl } }} />
    : null;
};

CheckError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  redirectUrl: PropTypes.string,
};

CheckError.defaultProps = {
  redirectUrl: '/'
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(CheckError);
