/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes, Component } from 'react';

class BoolInput extends Component {
  componentWillMount = () => {
    this.props.handleChange({
      target: {
        name: this.props.name,
        value: false,
      },
    });
  }
  onChange = () => {
    this.props.handleChange({
      target: {
        name: this.props.name,
        value: !this.props.value,
      },
    });
  }
  render() {
    const { isSwitch, styleName, name, value, question } = this.props;
    const classnames = `form-group ${isSwitch ? 'switch' : ''} ${styleName} ${name}`;
    return (
      <div className={classnames} >
        <label htmlFor={name || null} onClick={this.onChange}>
          {question || null}
          <input
            type="checkbox"
            name={name || null}
            checked={value || false}
            onChange={this.onChange}
          />
          {isSwitch && <div />}
        </label>
      </div>
    );
  }
}

// const BoolInput = ({ question, name, value, handleChange, isSwitch, styleName = '' }) => {
//   const onChange = () => {
//     const newEvent = {
//       target: {
//         name,
//         value: !value,
//       },
//     };
//     handleChange(newEvent);
//   };
//   const classnames = `form-group ${isSwitch ? 'switch' : ''} ${styleName} ${name}`;
//   return (
//     <div className={classnames} >
//       <label htmlFor={name || null} onClick={onChange}>
//         {question || null}
//         <input
//           type="checkbox"
//           name={name || null}
//           checked={value || false}
//           onChange={onChange}
//         />
//         {isSwitch && <div />}
//       </label>
//     </div>
//   );
// };

BoolInput.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  handleChange: PropTypes.func,
  isSwitch: PropTypes.bool,
  styleName: PropTypes.string,
};

export default BoolInput;
