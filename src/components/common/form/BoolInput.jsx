import React, { Component, PropTypes } from 'react';

class BoolInput extends Component {
  static propTypes = {
    question: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.bool,
    handleChange: PropTypes.func,
  }
  onChange = (event) => {
    const newEvent = {
      target: {
        name: this.props.id,
        value: event.target.checked,
      },
    };
    this.props.handleChange(newEvent);
  }
  render() {
    const { question, id, value } = this.props;
    return (
      <div className="form-group switch">
        <label htmlFor={id || null}>
          {question || null}
          <input
            type="checkbox"
            name={id || null}
            checked={value || false}
            onChange={this.onChange}
          />
          <div />
        </label>
      </div>
    );
  }
}

export default BoolInput;
