import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import MailingAddressUpdateForm from './MailingAddressUpdateForm';

const mapStateToProps = state => ({
  initialValues: {
    policyHolderMailingAddress: state.form.Verify ?
    state.form.Verify.values.policyHolderMailingAddress : {}
  }
});

export default compose(
  reduxForm({ form: 'MailingAddress' }),
  connect(mapStateToProps)
)(MailingAddressUpdateForm);
