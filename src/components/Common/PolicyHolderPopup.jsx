import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import _ from 'lodash';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';

import normalizePhone from '../Form/normalizePhone';
import CheckField from '../Form/inputs/CheckField';
import SnackBar from './SnackBar';
import failedSubmission from './reduxFormFailSubmit';
import { updateQuote } from '../../actions/quoteState.actions';

const handleQuoteData = state => state.quoteState.quote || {};
const handleInitialize = (state) => {
  const quote = handleQuoteData(state);

  const values = {
    isAdditional: _.has(quote, 'policyHolders[1].firstName')
  };
  values.pH1email = _.get(quote, 'policyHolders[0].emailAddress') || '';
  values.pH1FirstName = _.get(quote, 'policyHolders[0].firstName') || '';
  values.pH1LastName = _.get(quote, 'policyHolders[0].lastName') || '';
  values.pH1phone = normalizePhone(_.get(quote, 'policyHolders[0].primaryPhoneNumber') || '');

  values.pH2email = _.get(quote, 'policyHolders[1].emailAddress') || '';
  values.pH2FirstName = _.get(quote, 'policyHolders[1].firstName') || '';
  values.pH2LastName = _.get(quote, 'policyHolders[1].lastName') || '';
  values.pH2phone = normalizePhone(_.get(quote, 'policyHolders[1].primaryPhoneNumber') || '');
  return values;
};
const PolicyHolderPopup = ({ isLoading, handleSubmit, primaryButtonHandler, secondaryButtonHandler, fieldValues, parentProps, showSnackBar }) => (
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
              <button className="btn btn-secondary" onClick={secondaryButtonHandler} type="button" disabled={showSnackBar} data-test="cancel">Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={isLoading || showSnackBar} data-test="submit">Save</button>
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
  isLoading: state.appState.isLoading,
  showSnackBar: state.appState.showSnackBar,
  appState: state.appState,
  quote: handleQuoteData(state),
  initialValues: handleInitialize(state),
  fieldValues: _.get(state.form, 'UpdatePolicyholder.values', {})

});

export default connect(mapStateToProps, { updateQuote })(reduxForm({
  enableReinitialize: true,
  form: 'UpdatePolicyholder',
  onSubmitFail: failedSubmission
})(PolicyHolderPopup));
