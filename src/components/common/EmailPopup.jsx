/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
/* eslint no-class-assign :0 */
import React, { PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import TextField from '../form/inputs/TextField';

let EmailPopup = ({ submitting, showEmailPopup, primaryButtonHandler,
   secondaryButtonHandler, handleSubmit }) => (
     <div className={showEmailPopup === true ? 'error-content active' : 'error-content'} role="article">
       <Form className={'fade-in'} id="SendEmail" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
         <div className="survey-wrapper">
           <div className="contact-message">
             <div className="card card-csr">
               <div className="card-header image card-header-image-csr">
                 <h4><i className="fa fa-share-alt" /> Share Quote</h4>
               </div>
               <div className="card-block">
                 <TextField
                   type="text"
                   name={'name'}
                   value
                   styleName={'name'}
                   label={'Name'}
                   validations={['required']}
                 />
                 <TextField
                   type="text"
                   name={'emailAddr'}
                   styleName={'emailAddress'}
                   label={'Email Address'}
                   validations={['required', 'email']}
                 />
               </div>
               <div className="card-footer">
                 <div className="btn-group">
                   <button className="btn btn-secondary" onClick={secondaryButtonHandler} >Cancel</button>
                   <button className="btn btn-primary" type="submit" disabled={submitting}>Send Email</button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </Form>
     </div>
  );

EmailPopup = reduxForm({
  form: 'ShareEmail' // a unique identifier for this form
})(EmailPopup);

EmailPopup.propTypes = {
  submitting: PropTypes.bool,
  secondaryButtonHandler: PropTypes.func,
  primaryButtonHandler: PropTypes.func,
  handleSubmit: PropTypes.func,
  showEmailPopup: PropTypes.bool
};

export default EmailPopup;
