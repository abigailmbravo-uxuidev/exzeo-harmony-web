// /* eslint import/no-mutable-exports:0 */
// import React, { PropTypes } from 'react';
// // import _ from 'lodash';
// import { connect } from 'react-redux';
// import { reduxForm, Form } from 'redux-form';
// import AdditionalInterests from '../forms/AdditionalInterests/AdditionalInterests';
//
// let AdditionalInterestsForm = (props) => {
//   const { styleName, handleSubmit } = props;
//   return (
//     <Form
//       className={`fade-in ${styleName || ''}`} id="AdditionalInterestsForm" onSubmit={handleSubmit(() => { })}
//       noValidate
//     >
//       <AdditionalInterests {...props} />
//       <div className="workflow-steps">
//         <button className="btn btn-primary" type="submit" form="AdditionalInterestsForm">next</button>
//       </div>
//     </Form>
//   );
// };
//
// AdditionalInterestsForm.propTypes = {
//   handleSubmit: PropTypes.func,
//   styleName: PropTypes.string
// };
//
// AdditionalInterestsForm = reduxForm({
//   form: 'AdditionalInterestsForm' // a unique identifier for this form
// })(AdditionalInterestsForm);
//
// AdditionalInterestsForm = connect(
//     // state => ({
//     //   initialValues: {
//     //   },
//     // }),
//   )(AdditionalInterestsForm);
//
//
// export default AdditionalInterestsForm;
