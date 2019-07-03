import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSnackBar: this.props.show,
      timer: this.props.timer || 4000
    };
  }

  componentWillReceiveProps(nextProps) {
    const { showSnackBar, timer } = this.state;
    if (showSnackBar !== nextProps.show) {
      this.setState({
        showSnackBar: nextProps.show,
        timer: nextProps.timer
      });

      setTimeout(() => {
        this.setState({ showSnackBar: false });
      }, timer);
    }
  }

  render() {
    const { showSnackBar } = this.state;

    return (
      <div
        className={
          showSnackBar
            ? 'snackbar bottom right active'
            : 'snackbar bottom right'
        }
      >
        {this.props.children}
      </div>
    );
  }
}

SnackBar.defaultProps = {
  show: false,
  timer: 4000
};

SnackBar.propTypes = {
  show: PropTypes.bool.isRequired,
  timer: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
