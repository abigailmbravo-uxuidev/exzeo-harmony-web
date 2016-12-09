/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, PropTypes } from 'react';

class BoolInput extends Component {
  static propTypes = {
    question: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.bool,
    handleChange: PropTypes.func,
    switch: PropTypes.bool,
  }
  onChange = () => {
    const newEvent = {
      target: {
        name: this.props.id,
        value: !this.props.value,
      },
    };
    this.props.handleChange(newEvent);
  }
  render() {
    const { question, id, value } = this.props;
    return (
      <div className={this.props.switch ? 'form-group switch' : 'form-group'} >
        <label htmlFor={id || null}>
          {question || null}
          <input
            type="checkbox"
            name={id || null}
            checked={value || false}
            onChange={this.onChange}
          />
          {this.props.switch && <div onClick={this.onChange} />}
        </label>
      </div>
    );
  }
}

export default BoolInput;
