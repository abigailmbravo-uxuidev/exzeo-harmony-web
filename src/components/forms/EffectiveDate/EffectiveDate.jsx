import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import EffectiveDateForm from './EffectiveDateForm';

const mapStateToProps = state => ({
  initialValues: {
    effectiveDate: state.form && state.form.Verify && state.form.Verify.initial ? state.form.Verify.initial.effectiveDate : ''
  }
});

export default compose(
  reduxForm({ form: 'EffectiveDateForm' }),
  connect(mapStateToProps)
)(EffectiveDateForm);
