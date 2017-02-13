/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import MailingAddress from '../forms/MailingAddress/MailingAddress';


let Billing = (props) => {
  const { styleName, handleSubmit } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="Billing" onSubmit={handleSubmit(() => {})}
      noValidate
    >
      <div>
        <h3>Mailing Address</h3>
        <MailingAddress {...props} name={'policyHolderMailingddress'} />

        <div className="form-group  BillTo">
          <label>Bill To</label>
          <select name="BillTo" value="">
            <option value="ph1">Policy Holder1</option>
            <option value="mh1">Bank of America</option>
            <option value="mh2">Capital One</option>
          </select>
        </div>
        <div className="form-group segmented BillType  " role="group">
          <label className="group-label label-segmented">Bill Plan</label>
          <div className="segmented-answer-wrapper">
            <div className="radio-column-3">
              <label className="label-segmented"><input type="radio" value="A" name="Annual" />
                <span>Annual <br />
                  $2,500</span>
              </label>
            </div>
            <div className="radio-column-3">
              <label className="label-segmented"><input type="radio" value="S" name="semiannual" />
                <span>Semi-Annual <br />
                  1st Installment: $1,250 <br />
                  2nd Installment: $1,250</span>
              </label>
            </div>
            <div className="radio-column-3">
              <label className="label-segmented"><input type="radio" value="Q" name="quaterly" />
                <span>Quaterly <br />
                  1st Installment: $625 <br />
                  2nd Installment: $625 <br />
                  3rd Installment: $625 <br />
                  4th Installment: $625</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="Billing">next</button>
      </div>
    </Form>
  );
};

Billing.propTypes = {
  styleName: PropTypes.string,
  handleSubmit: PropTypes.func,
};

Billing = reduxForm({
  form: 'Billing', // a unique identifier for this form
})(Billing);


Billing = connect(
    // state => ({
    //   initialValues: {
    //     policyHolderMailingAddress: {},
    //   },
    // }),
  )(Billing);


export default Billing;
