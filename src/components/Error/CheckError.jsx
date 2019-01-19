import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export const CheckError = ({ error, redirectUrl }) => {
  if (error && error.message) {
    const errorPath = '/error';
    return <Redirect to={{ pathname: errorPath, state: { redirectUrl } }} />;
  }

  return <span />;
};

CheckError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }),
  redirectUrl: PropTypes.string
};

CheckError.defaultProps = {
  redirectUrl: '/'
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(CheckError);
