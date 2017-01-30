import React, { PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Footer';

const Summary = ({ quote, styleName, handleSubmit, handleOnSubmit, handleChange,
   pristine, reset, submitting, error, invalid }) => (
     <Form
       className={`fade-in ${styleName || ''}`} id="survey" onSubmit={handleSubmit(handleOnSubmit)}
       noValidate
     >
       <div className="form-group survey-wrapper">

         <section className="display-element demographics">
           <h3>Quote details</h3>

           <dl>
             <div>
               <dt>Quote Number</dt>
               <dd>TT-12345678-01</dd>
             </div>
           </dl>
           <dl>
             <div>
               <dt>Property address</dt>
               <dd>1234 South Main Street</dd>
             </div>
           </dl>
           <dl>
             <div>
               <dt>Annual premium</dt>
               <dd>$123456</dd>
             </div>
           </dl>


           {/* BoolInput component with addition of class: "verification"*/}
           <div className="form-group switch  verification">
             <label htmlFor="test">Confirmed
                                              <input
                                                type="checkbox"
                                                name="test"
                                                checked={false}
                                              />
               <div className="switch-div" />
               {/* needed to add a span element for marker icon*/}
               <span />
             </label>
           </div>


         </section>


         <section className="display-element demographics">
           <h3>Demographics</h3>

           <dl>
             <div>
               <dt>Policyholder first name</dt>
               <dd>John</dd>
             </div>
           </dl>
           <dl>
             <div>
               <dt>Policyholder last name</dt>
               <dd>Doe</dd>
             </div>
           </dl>
           <dl>
             <div>
               <dt>Email address</dt>
               <dd>john.doe@gmail.com</dd>
             </div>
           </dl>


           {/* BoolInput component with addition of class: "verification"*/}
           <div className="form-group switch  verification">
             <label htmlFor="test">Confirmed
                                              <input
                                                type="checkbox"
                                                name="test"
                                                checked={false}
                                              />
               <div className="switch-div" />
               {/* needed to add a span element for marker icon*/}
               <span />
             </label>
           </div>


         </section>

       </div>
       <div className="workflow-steps">
         <button className="btn btn-primary" type="submit" form="survey">next</button></div>
       <Footer />
     </Form>
  );

Summary.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  quote: PropTypes.object,  //eslint-disable-line
  styleName: PropTypes.string,
};

export default reduxForm({
  form: 'Summary', // a unique identifier for this form
})(Summary);
