import React, { PropTypes } from 'react';
import MailingAddress from '../../components/common/MailingAddress/MailingAddress';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector } from 'redux-form';

let Billing = (props) => {
  const { initialValues, styleName, handleSubmit, name,
          pristine, reset, submitting, error, invalid } = props;
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
                <span>Annual</span>
              </label>
            </div>
            <div className="radio-column-3">
              <label className="label-segmented"><input type="radio" value="S" name="semiannual" />
                <span>Semi-Annual</span>
              </label>
            </div>
            <div className="radio-column-3">
              <label className="label-segmented"><input type="radio" value="Q" name="quaterly" />
                <span>Quaterly</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

Billing.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

Billing = reduxForm({
  form: 'Billing', // a unique identifier for this form
})(Billing);

const selector = formValueSelector('Billing'); // <-- same as form name

Billing = connect(
    state => ({
      initialValues: {
        policyHolderMailingAddress: {},
      },
    }),
  )(Billing);


export default Billing;
