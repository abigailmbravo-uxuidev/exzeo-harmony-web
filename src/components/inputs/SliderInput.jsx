import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const SliderInput = ({
  description,
  handleChange,
  leftLabel,
  max,
  min,
  value,
  name,
  question,
  rightLabel,
  step,
  styleName = '',
}) =>
  // let formattedValue;
  // if (value) {
  //   formattedValue = `$ ${value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  // } else if (valueDefault) {
  //   formattedValue = `$ ${valueDefault.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  // }
  // console.log('FORMATTED VALUE FORMATTED VALUE FORMATTED VALUE FORMATTED VALUE');
  // console.log(formattedValue);
  // console.log('FORMATTED VALUE FORMATTED VALUE FORMATTED VALUE FORMATTED VALUE');
   (
     <div className={`form-group range-component ${styleName} ${name}`}>
       <label htmlFor={name || null}>
         {question || null}
        &nbsp;
         {description && <i className="fa fa-info-circle" data-tip data-for={name} />}
         {description && <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>}
       </label>
       <div className="range-wrapper">
         <div className="range-control-wrapper">
           <span className="range-limit">{leftLabel || min || '0'}</span>
           <input
             type="range"
             name={name || null}
             min={min}
             max={max}
             step={step}
             value={value}
             onChange={handleChange}
           />
           <span className="range-limit">{rightLabel || max || null}</span>
         </div>
         <span className="range-value">
                 <span className="value-label">$</span>
           <input
             type="text"
             value={value}
             onChange={handleChange}
             name={name}
           />
         </span>
       </div>
     </div>
  );

SliderInput.propTypes = {
  description: PropTypes.string,
  handleChange: PropTypes.func,
  leftLabel: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  rightLabel: PropTypes.string,
  question: PropTypes.string,
  step: PropTypes.number,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default SliderInput;
