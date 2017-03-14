// /*
// eslint import/no-mutable-exports:0
// */
// import React, { PropTypes } from 'react';
// // import _ from 'lodash';
// import { connect } from 'react-redux';
// import { reduxForm, Form, FieldArray } from 'redux-form';
// import PolicyHolderFormFields from './PolicyHolderFormFields';
//
// const renderPolicyHolder = ({ fieldState, fields, formName, InterestTypeName,
//    meta: { touched, error } }) => (
//      <div>
//        {fields.length === 1 && <button type="button" onClick={() => fields.push({})}>+ Add Secondary {InterestTypeName}</button>}
//        {fields.length === 2 && <button type="button" onClick={() => fields.remove(1)}>+ Remove Secondary {InterestTypeName}</button>}
//        <br />
//        <br />
//        {touched && error && <span>{error}</span>}
//        {fields.map((policyHolder, index) =>
//          <div key={index}>
//            <h3>{index === 0 ? 'Primary' : 'Secondary'} Policy Holdler</h3>
//            {/* {index > 0 && <button
//           type="button"
//           onClick={() => fields.remove(index)}
//         >Remove {InterestTypeName}</button>
//       } */}
//            <PolicyHolderFormFields handleChange={function () {}} name={`${policyHolder}`} formName={formName} state={fieldState} />
//          </div>,
//     )}
//      </div>
//   );
//
// renderPolicyHolder.propTypes = {
//     fieldState: PropTypes.any,// eslint-disable-line
//     fields: PropTypes.any,// eslint-disable-line
//     formName: PropTypes.any,// eslint-disable-line
//     InterestTypeName: PropTypes.any,// eslint-disable-line
//     handleChange: PropTypes.any,// eslint-disable-line
//     meta: PropTypes.any,// eslint-disable-line
// };
//
// let PolicyHolderUpdateForm = (props) => {
//   const { formName, styleName, handleSubmit, handleOnSubmit, state } = props;
//   return (
//     <Form
//       className={`fade-in ${styleName || ''}`} id="PolicyHolderUpdateForm" onSubmit={handleSubmit(handleOnSubmit)}
//       noValidate
//     >
//       <FieldArray name="policyHolders" component={renderPolicyHolder} InterestType={'PolicyHolder'} InterestTypeName={'Policy Holder'} formName={formName} fieldState={state} />
//       <div className="workflow-steps">
//         <button className="btn btn-primary" type="submit" form="PolicyHolderUpdateForm">Save</button>
//       </div>
//     </Form>
//   );
// };
//
// PolicyHolderUpdateForm.propTypes = {
//   fieldState: PropTypes.any,// eslint-disable-line
//   fields: PropTypes.any,// eslint-disable-line
//   formName: PropTypes.any,// eslint-disable-line
//   styleName: PropTypes.any,// eslint-disable-line
//   handleOnSubmit: PropTypes.func,
//   handleSubmit: PropTypes.func,
//   state: PropTypes.any,// eslint-disable-line
// };
//
// PolicyHolderUpdateForm = reduxForm({
//   form: 'PolicyHolderUpdateForm' // a unique identifier for this form
// })(PolicyHolderUpdateForm);
//
// PolicyHolderUpdateForm = connect(
//     state => ({
//       initialValues: {
//         policyHolders: state.form.Verify.values.policyHolders
//       },
//       formName: 'PolicyHolderUpdateForm',
//       state
//     }),
//   )(PolicyHolderUpdateForm);
//
//
// export default PolicyHolderUpdateForm;
