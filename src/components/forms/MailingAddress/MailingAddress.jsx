import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import MailingAddressForm from './MailingAddressForm';

const mapStateToProps = state => ({
  initialValues: {
    policyHolderMailingAddress: state.form.Verify ?
    state.form.Verify.values.policyHolderMailingAddress : {}
  }
});

export default compose(
  reduxForm({ form: 'MailingAddress' }),
  connect(mapStateToProps)
)(MailingAddressForm);
