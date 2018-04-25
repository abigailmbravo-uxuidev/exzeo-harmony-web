import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import normalizePhone from '../Form/normalizePhone';
import CheckField from '../Form/inputs/CheckField';
import SnackBar from './SnackBar';
import failedSubmission from './reduxFormFailSubmit';

const handleQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : {};
  const variables = _.get(taskData, 'model.variables');
  return _.get(_.find(taskData.model.variables, { name: 'getFinalQuote' }), 'value.result') || _.get(_.find(variables, { name: 'quote' }), 'value.result') || {};
};
const handleInitialize = (state) => {
  const quoteData = handleQuoteData(state);
  const values = {
    isAdditional: _.has(quoteData, 'policyHolders[1].firstName')
  };
  values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress') || '';
  values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName') || '';
  values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName') || '';
  values.pH1phone = normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '');

  values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress') || '';
  values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName') || '';
  values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName') || '';
  values.pH2phone = normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '');
  return values;
};
const PolicyHolderPopup = ({ submitting, handleSubmit, primaryButtonHandler, secondaryButtonHandler, fieldValues, parentProps, showSnackBar }) => (
  <div className="edit-policyholder-modal modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-policyholder">
          <SnackBar
            {...parentProps}
            show={showSnackBar}
            timer={3000}
          ><p>Please correct errors.</p></SnackBar>
          <Form className={'fade-in'} id="UpdatePolicyholder" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
            <div className="card-header">
              <h4><i className="fa fa-vcard" /> Edit Policyholder(s)</h4>
            </div>
            <div className="card-block">
              <h3 id="primaryPolicyholder">Primary Policyholder</h3>
              <div className="ph1name">
                <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH1FirstName'} />
                <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH1LastName'} />
              </div>
              <div className="ph1contact">
                <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH1phone'} />
                <TextField validations={['required', 'email']} label={'Email Address'} styleName={''} name={'pH1email'} />
              </div>
              <CheckField name={'isAdditional'} isSwitch label={'Do you want to add an additional Policyholder?'} />
              { fieldValues.isAdditional && <div>
                <h3 id="secondaryPolicyholder">Secondary Policyholder</h3>
                <div className="ph2name">
                  <TextField
                    label={'First Name'} dependsOn={['isAdditional', 'pH2LastName', 'pH2email', 'pH2phone']} styleName={''} name={'pH2FirstName'}
                  />
                  <TextField
                    label={'Last Name'} dependsOn={['isAdditional', 'pH2FirstName', 'pH2email', 'pH2phone']} styleName={''} name={'pH2LastName'}
                  />
                </div>
                <div className="ph2contact">
                  <PhoneField
                    label={'Primary Phone'} dependsOn={['isAdditional', 'pH2FirstName', 'pH2LastName', 'pH2email']} styleName={''} name={'pH2phone'} validations={['phone']}
                  />
                  <TextField
                    validations={['optionalEmail']} dependsOn={['isAdditional', 'pH2FirstName', 'pH2LastName', 'pH2phone']} label={'Email Address'} styleName={''} name={'pH2email'}
                  />
                </div>
              </div>}
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={secondaryButtonHandler} type="button" disabled={showSnackBar}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={submitting || showSnackBar}>Save</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

PolicyHolderPopup.propTypes = {
  ...propTypes,
  primaryButtonHandler: PropTypes.func,
  secondaryButtonHandler: PropTypes.func
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quoteData: handleQuoteData(state),
  initialValues: handleInitialize(state),
  fieldValues: _.get(state.form, 'UpdatePolicyholder.values', {})

});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'UpdatePolicyholder',
  onSubmitFail: failedSubmission
})(PolicyHolderPopup));
