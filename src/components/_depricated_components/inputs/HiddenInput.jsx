// /* eslint-disable jsx-a11y/no-static-element-interactions */
// import React, { PropTypes } from 'react';
// import { Field } from 'redux-form';
// import ReactTooltip from 'react-tooltip';
// import { combineRules } from '../../Rules';
//
// // const renderField = ({
// //   input,
// //   handleChange,
// //   isSwitch,
// //   description,
// //   question,
// //   styleName,
// // }) => {
// //   const onChange = () => {
// //     if (input.disabled) return;
// //     const newEvent = {
// //       target: {
// //         name: input.name,
// //         value: !input.value,
// //       },
// //     };
// //     handleChange(newEvent);
// //   };
// //   const classnames = `form-group ${isSwitch ? 'switch' : ''}
// ${styleName} ${name} ${input.disabled ? 'disabled' : ''}`;
// //   return (
// //     <div className={classnames} >
// //       <label
// //         htmlFor={input.name || null}
// //         onClick={(event) => {
// //           input.onChange(!input.value);
// //           onChange(event);
// //         }}
// //       >
// //         {question || null}
// //         &nbsp;
// //         {description &&
// //         <span>
// //             <i className="fa fa-info-circle" data-tip data-for={name} />
// //             <ReactTooltip place="right"
// id={name} type="dark" effect="float">{description}</ReactTooltip>
// //           </span>
// //         }
// //         <input
// //           {...input}
// //           type="checkbox"
// //           checked={input.value}
// //           onChange={(event) => {
// //             input.onChange(!input.value);
// //             onChange(event);
// //           }}
// //         />
// //         {isSwitch && <div className="switch-div" />}
// //       </label>
// //     </div>
// //   );
// // };
//
// const HiddenInput = ({
//   answers,
//   description,
//   disabled = false,
//   handleChange,
//   name,
//   question,
//   styleName = '',
//   value,
//   validations,
// }) => {
//
//   answers.forEach((answer) => {
//     if(answer.default)
//       value = answer.answer;
//   })
//
//   return (
//     <Field
//       type="hidden"
//       component="input"
//       value={value || ''} name={name || null}
//     >
//     </Field>
//     // <input
//     //   name={name}
//     //   type="hidden"
//     //   value={value}
//     // />
//   );
// };
//
// HiddenInput.propTypes = {
//   answers: PropTypes.arrayOf(PropTypes.shape({
//     answer: PropTypes.object,
//     image: PropTypes.string,
//   })),
//   description: PropTypes.string,
//   name: PropTypes.string,
//   question: PropTypes.string,
//   value: PropTypes.oneOfType([
//     PropTypes.bool,
//     PropTypes.number,
//   ]),
// };
//
// export default HiddenInput;
