import React, { PropTypes } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import AIPopup from '../Common/AIPopup';

const userTasks = {
  sendEmailOrContinue: 'sendEmailOrContinue',
  askAI: 'askAI'
};

const getQuoteData = (state) => {
  const { cg, appState } = state;
  const quoteData = _.find(cg[appState.modelName].data.model.variables, { name: 'quote' });
  return (quoteData ? quoteData.value.result : undefined);
};

const noAddAdditionalInterestSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.sendEmailOrContinue;
  const taskData = { shouldAddAI: 'No' };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

const AddAdditionalInterestQuoteSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  // we need to call a batch complete here
  const steps = [{
    name: userTasks.sendEmailOrContinue,
    data: { shouldAddAI: 'Yes' }
  }, {
    name: userTasks.askEmail,
    data
  }];
  props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps);
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { showAIPopup: false });
};

const AddAdditionalInterestQuote = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { submitting: true });
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showAIPopup: true });
};

const closeAddAdditionalInterestSubmit = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showAIPopup: false });
};

export const AddAdditionalInterest = props => (
  <div className="route-content">
    <Form className={`${'styleName' || ''}`} id="AddAdditionalInterestPage" onSubmit={props.handleSubmit(noAddAdditionalInterestSubmit)} noValidate>
      <div className="scroll">
        <div className="form-group detail-wrapper" />
        <div className="workflow-steps">
          <button className="btn btn-secondary" type="button" onClick={() => AddAdditionalInterestQuote(props)}>Add AI</button>
          <button className="btn btn-primary" type="submit" disabled={props.appState.data.submitting}>next</button>
        </div>
        <Footer />
      </div>
    </Form>
    {props.appState.data.showAIPopup &&
      <AIPopup
        primaryButtonHandler={AddAdditionalInterestQuoteSubmit}
        secondaryButtonHandler={() => closeAddAdditionalInterestSubmit(props)}
      />}
  </div>
);


AddAdditionalInterest.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape({}),
  appState: PropTypes.shape({ modelName: PropTypes.string, data: PropTypes.object }),
  underwritingExceptions: PropTypes.arrayOf(PropTypes.shape())
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  quote: getQuoteData(state)
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'AddAdditionalInterest' })(AddAdditionalInterest));
