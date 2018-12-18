import React from 'react';
import PropTypes from 'prop-types';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';

import * as appStateActions from '../../actions/appStateActions';
import FieldGenerator from '../Form/FieldGenerator';
import { getInitialValues } from '../Customize/customizeHelpers';
import SelectFieldAgents from '../Form/inputs/SelectFieldAgents';
import Loader from '../Common/Loader';
import normalizePhone from '../Form/normalizePhone';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';
import { updateQuote } from '../../actions/quoteState.actions';
import { getZipcodeSettings, getAgents } from '../../actions/serviceActions';

export const handleFormSubmit = async (data, dispatch, props) => {
  // const workflowId = props.appState.instanceId;
  // const taskName = userTasks.formSubmit;
  const taskData = data;
  taskData.agentCode = String(taskData.agentCode);

  if (!taskData.isAdditional) {
    taskData.FirstName2 = '';
    taskData.LastName2 = '';
    taskData.EmailAddress2 = '';
    taskData.phoneNumber2 = '';
  }

  taskData.effectiveDate = momentTZ.tz(moment.utc(taskData.effectiveDate)
    .format('YYYY-MM-DD'), props.zipCodeSettings.timezone)
    .format();
  taskData.phoneNumber = taskData.phoneNumber.replace(/[^\d]/g, '');
  taskData.phoneNumber2 = taskData.phoneNumber2.replace(/[^\d]/g, '');
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: true });
  // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
  await props.updateQuote({ data: taskData, quoteNumber: props.quote.quoteNumber });
  props.actions.appStateActions.setAppState(props.appState.modelName, '', { ...props.appState.data, submitting: false });

  props.history.push('underwriting');
};

// const handleGetZipCodeSettings = (state) => {
//   const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
//   if (!taskData) return null;

//   const zipCodeSettings = _.find(taskData.model.variables, { name: 'getZipCodeSettings' }) ?
//   _.find(taskData.model.variables, { name: 'getZipCodeSettings' }).value.result[0] : null;

//   const zipCodeSettingsQuote = _.find(taskData.model.variables, { name: 'getZipCodeSettingsForQuote' }) ?
//   _.find(taskData.model.variables, { name: 'getZipCodeSettingsForQuote' }).value.result[0] : null;

//   return zipCodeSettingsQuote || zipCodeSettings;
// };

const handleGetQuestions = state => (state.quoteState.state ? state.quoteState.state.uiQuestions : []);

const handleInitialize = (state) => {
  // const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : { model: null };
  // const retrieveQuoteData = state.appState && state.appState.data ? state.appState.data.quote : {};
  const quoteData = state.quoteState.quote;// _.find(taskData.model.variables, { name: 'updateQuoteWithCustomerData' }) ?
  // _.find(taskData.model.variables, { name: 'updateQuoteWithCustomerData' }).value.result : retrieveQuoteData;
  const uiQuestions = handleGetQuestions(state);
  const values = getInitialValues(uiQuestions, quoteData);

  values.FirstName = _.get(quoteData, 'policyHolders[0].firstName') || '';
  values.effectiveDate = moment(_.get(quoteData, 'effectiveDate'))
    .utc()
    .format('MM/DD/YYYY');
  values.phoneNumber = normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '');
  values.phoneNumber2 = normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '');
  values.electronicDelivery = _.get(quoteData, 'policyHolders[0].electronicDelivery') || false;
  values.agentCode = _.get(quoteData, 'agentCode');

  if (_.trim(values.FirstName2)) values.isAdditional = true;

  return values;
};

// const handleGetAgentsFromAgency = (state) => {
//   const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
//   if (!taskData) return [];

//   const agentData = _.find(taskData.model.variables, { name: 'getActiveAgents' }) ?
//   _.find(taskData.model.variables, { name: 'getActiveAgents' }).value.result : [];
//   return agentData;
// };

// const getQuoteData = (state) => {
//   const { cg, appState } = state;
//   const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'quote' });
//   return (quoteData ? quoteData.value.result : undefined);
// };

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
      // appState,
      handleSubmit,
      fieldValues,
      zipCodeSettings,
      agentResults
    } = this.props;

    const questions = this.props.uiQuestions;
    const quoteData = this.props.quote;
    return (
      <div className="route-content">
        <SnackBar
          {...this.props}
          show={this.props.appState.data.showSnackBar}
          timer={3000}
        ><p>Please correct errors.</p></SnackBar>
        {this.props.appState.data.submitting && <Loader />}
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
                  data={quoteData}
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
                disabled={this.props.appState.data.submitting}
              >
                next
              </button>
            </div>
            <Footer />
          </div>
        </Form>
      </div>
    );
  }
}

CustomerInfo.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.boolean,
      taskName: PropTypes.string,
      taskData: PropTypes.shape({})
    })
  })
};

const mapStateToProps = state => (
  {
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'CustomerInfo.values', {}),
    initialValues: handleInitialize(state),
    agentResults: state.service.agents,
    zipCodeSettings: state.service.zipCodeSettings,
    quote: state.quoteState.quote,
    uiQuestions: handleGetQuestions(state)
  });

const mapDispatchToProps = dispatch => ({
  updateQuote: bindActionCreators(updateQuote, dispatch),
  getZipcodeSettings: bindActionCreators(getZipcodeSettings, dispatch),
  getAgents: bindActionCreators(getAgents, dispatch),
  actions: {
    
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  enableReinitialize: true,
  form: 'CustomerInfo',
  onSubmitFail: failedSubmission
})(CustomerInfo));
