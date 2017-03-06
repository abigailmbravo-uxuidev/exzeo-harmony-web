// /*
// eslint import/no-mutable-exports:0
// */
// import React, { PropTypes } from 'react';
// // import _ from 'lodash';
// import { connect } from 'react-redux';
// import { reduxForm, Form, FieldArray } from 'redux-form';
// import Interest from './Interest';
//
// let AdditionalInterestUpdateForm = (props) => {
//   const { styleName, handleSubmit, handleOnSubmit } = props;
//
//   return (
//     <Form
//       className={`fade-in ${styleName || ''}`}
// id="AdditionalInterestUpdateForm" onSubmit={handleSubmit(handleOnSubmit)}
//       noValidate
//     >
//       <FieldArray name="additionalInterests"
// component={Interest} InterestType={'PolicyHolder'} />
//       <div className="workflow-steps">
//         <button className="btn btn-primary"
// type="submit" form="AdditionalInterestUpdateForm">Save</button>
//       </div>
//     </Form>
//   );
// };
//
// AdditionalInterestUpdateForm.propTypes = {
//   handleOnSubmit: PropTypes.func,
//   handleSubmit: PropTypes.func,
//   styleName: PropTypes.string
// };
//
// AdditionalInterestUpdateForm = reduxForm({
//   enableReinitialize: true,
//   form: 'AdditionalInterestUpdateForm' // a unique identifier for this form
// })(AdditionalInterestUpdateForm);
//
// // const selector = formValueSelector('AdditionalInterestUpdateForm'); // <-- same as form name
//
// AdditionalInterestUpdateForm = connect(
//     state => ({
//       initialValues: {
//         additionalInterests: state.form.Verify.values.additionalInterests
//       }
//     }),
//   )(AdditionalInterestUpdateForm);
//
//
// export default AdditionalInterestUpdateForm;
