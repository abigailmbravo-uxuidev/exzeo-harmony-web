import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import _ from 'lodash';

import { getZipcodeSettings, getAgents } from '../../actions/serviceActions';
import Footer from '../Common/Footer';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { getInitialValues } from '../Customize/customizeHelpers';
import FieldGenerator from '../Form/FieldGenerator';
import SelectFieldAgents from '../Form/inputs/SelectFieldAgents';
import normalizePhone from '../Form/normalizePhone';

export const handleFormSubmit = async (data, dispatch, props) => {
  const taskData = data;
  taskData.agentCode = String(taskData.agentCode);

  if (!taskData.isAdditional) {
    taskData.FirstName2 = '';
    taskData.LastName2 = '';
    taskData.EmailAddress2 = '';
    taskData.phoneNumber2 = '';
  }

  taskData.effectiveDate = momentTZ.tz(moment.utc(taskData.effectiveDate).format('YYYY-MM-DD'), props.zipCodeSettings.timezone).format();
  taskData.phoneNumber = taskData.phoneNumber.replace(/[^\d]/g, '');
  taskData.phoneNumber2 = taskData.phoneNumber2.replace(/[^\d]/g, '');

  await props.updateQuote({ data: taskData, quoteNumber: props.quote.quoteNumber });

  props.history.replace('underwriting');
};

const handleGetQuestions = state => {
  return state.quoteState.state && Array.isArray(state.quoteState.state.uiQuestions)
    ? state.quoteState.state.uiQuestions
    : [];
};

const handleInitialize = (state) => {
  const quoteData = state.quoteState.quote;
  const uiQuestions = handleGetQuestions(state);
  const values = getInitialValues(uiQuestions, quoteData);

  values.FirstName = _.get(quoteData, 'policyHolders[0].firstName') || '';
  values.effectiveDate = moment(_.get(quoteData, 'effectiveDate')).utc().format('MM/DD/YYYY');
  values.phoneNumber = normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '');
  values.phoneNumber2 = normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '');
  values.electronicDelivery = _.get(quoteData, 'policyHolders[0].electronicDelivery') || false;
  values.agentCode = _.get(quoteData, 'agentCode');

  if (_.trim(values.FirstName2)) values.isAdditional = true;

  return values;
};

export class CustomerInfo extends React.Component {
  componentDidMount() {
    const { quote } = this.props;

    if (quote && quote.property) {
      this.props.getAgents(quote.companyCode, quote.state, quote.agencyCode);
      this.props.getZipcodeSettings(quote.companyCode, quote.state, quote.product, quote.property.physicalAddress.zip);
    }
  }

  render() {
    const {
      handleSubmit,
      fieldValues,
      zipCodeSettings,
      agentResults,
      showSnackBar,
      submitting,
      quote
    } = this.props;

    const questions = this.props.uiQuestions;

    return (
      <div className="route-content">
        <SnackBar
          {...this.props}
          show={showSnackBar}
          timer={3000}
        ><p>Please correct errors.</p></SnackBar>
        <Form
          id="CustomerInfo"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              {questions.map((question, index) =>
                <FieldGenerator
                  tabindex="0"
                  autoFocus={index === 1}
                  zipCodeSettings={zipCodeSettings}
                  data={quote}
                  question={question}
                  values={fieldValues}
                  key={index}
                />
              )}
              <div className="agentID">
                <SelectFieldAgents
                  tabindex="0"
                  name="agentCode"
                  label="Agent"
                  onChange={() => {}}
                  validations={['required']}
                  agents={agentResults}
                />
              </div>
            </div>
            <div className="workflow-steps">
              <button
                tabIndex="0"
                className="btn btn-primary"
                type="submit"
                form="CustomerInfo"
                disabled={submitting}
              >next</button>
            </div>
            <Footer />
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    showSnackBar: state.appState.showSnackBar,
    fieldValues: _.get(state.form, 'CustomerInfo.values', {}),
    initialValues: handleInitialize(state),
    agentResults: state.service.agents,
    zipCodeSettings: state.service.zipCodeSettings,
    quote: state.quoteState.quote,
    uiQuestions: handleGetQuestions(state)
  });

export default connect(mapStateToProps, { getZipcodeSettings, getAgents })(reduxForm({
  enableReinitialize: true,
  form: 'CustomerInfo',
  onSubmitFail: failedSubmission
})(CustomerInfo));
