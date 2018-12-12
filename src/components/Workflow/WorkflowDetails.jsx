import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import CountUp from 'react-countup';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as completedTasksActions from '../../actions/completedTasksActions';
import * as serviceActions from '../../actions/serviceActions';
import * as customize from '../Customize/Customize';
import { goToStep as goToStepTerrible } from '../../actions/quoteState.actions';

const STEP_NAME_MAP = {
  askAdditionalCustomerData: 'customerInfo',
  askUWAnswers: 'underwriting',
  askToCustomizeDefaultQuote: 'customize',
  sendEmailOrContinue: 'share',
  addAdditionalAIs: 'additionalInterests',
  askAdditionalQuestions: 'mailingBilling',
  editVerify: 'verify'
};

export const handleRecalc = (props) => {
  customize.handleFormSubmit(props.customizeFormValues, props.dispatch, props);
};

export const getQuoteFromModel = (state, props) => {
  const startModelData = {
    quoteId: (props.appState.data && props.appState.data.quote) ? props.appState.data.quote._id : state.quote._id // eslint-disable-line
  };

  props.actions.serviceActions.getQuote(startModelData.quoteId).then((response) => {
    if (response.payload && response.payload[0].data.quote) {
      props.actions.appStateActions.setAppState(props.appState.modelName,
        props.appState.instanceId, {
          ...props.appState.data,
          updateWorkflowDetails: false
        });
    }
  });
};

export const goToStep = async (props, stepName) => {
  // don't allow submission until the other step is completed
  if (props.appState.data.submitting) return;

  await props.goToStepTerrible(stepName, props.quote.quoteNumber);
  //
  // const currentData = props.tasks && props.tasks[props.workflowModelName].data ? props.tasks[props.workflowModelName].data : {};
  //
  // if ((currentData && currentData.activeTask && currentData.activeTask.name !== taskName) &&
  //     (currentData && currentData.model && (_.includes(currentData.model.completedTasks, taskName) || _.includes(props.completedTasks, taskName)))) {
  //   const currentModelData = props.tasks && props.tasks[props.appState.modelName].data ? props.tasks[props.appState.modelName].data : {};
  //   props.actions.cgActions.moveToTask(props.appState.modelName, props.appState.instanceId, taskName, _.union(currentModelData.model.completedTasks, props.completedTasks));
  //   props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, submitting: true, nextPage: taskName });
  // }
  props.history.push(`${STEP_NAME_MAP[stepName]}`);
};

export const getClassForStep = (stepName, props) =>
  // let className = '';
  // const currentData = props.tasks && props.tasks[props.workflowModelName].data ? props.tasks[props.workflowModelName].data : {};
  // if (currentData && currentData.activeTask && currentData.activeTask.name === stepName) {
  //   className = 'active';
  // } else if (currentData && currentData.model && (_.includes(currentData.model.completedTasks, stepName) || _.includes(props.completedTasks, stepName))) {
  //   className = 'selected';
  // } else if (currentData && currentData.model && !_.includes(currentData.model.completedTasks, stepName) && !_.includes(props.completedTasks, stepName)) {
  //   className = 'disabled';
  // }
  // return className;
   '';

export const onKeyPress = (event, props, stepName) => {
  if (event && event.preventDefault) event.preventDefault();
  if (event && event.charCode === 13) {
    goToStep(props, stepName);
  }
};

export const ShowPremium = ({ isCustomize, totalPremium }) => {
  if (isCustomize) {
    return (<CountUp prefix="$ " separator="," start={0} end={totalPremium} />);
  }
  return (<span>$ {totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>);
};

ShowPremium.propTypes = {
  totalPremium: PropTypes.number,
  isCustomize: PropTypes.boolean
};

export class WorkflowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {}
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.appState !== this.props.appState) {
  //     if (((nextProps.appState.data && nextProps.appState.data.quote) || this.state.quote._id) && nextProps.appState.data.updateWorkflowDetails) { // eslint-disable-line
  //       getQuoteFromModel(this.state, nextProps);
  //     }
  //   }
  //   const quote = nextProps.quote || {};
  //   if (nextProps.appState.data && nextProps.appState.data.hideYoChildren) {
  //     delete quote.coverageLimits;
  //   }
  //   this.setState((prevProps, newProps) => ({ ...newProps,
  //     quote
  //   }));
  // }


  render() {
    const quote = this.props.quote;
    // const { quote } = this.props;
    if (!quote || !quote.quoteNumber) { // eslint-disable-line
      return <div className="detailHeader" />;
    }
    const isCustomize = false;
    // const isCustomize = this.props.tasks[this.props.workflowModelName] && this.props.tasks[this.props.workflowModelName].data && this.props.tasks[this.props.workflowModelName].data.activeTask && this.props.tasks[this.props.workflowModelName].data.activeTask.name === 'askToCustomizeDefaultQuote';
    return (
      <div>
        <div className="detailHeader">
          <section id="quoteDetails">
            <dl>
              <div>
                <dt className="fade">Quote Number</dt>
                <dd className="fade">{quote.rating ? quote.quoteNumber : '-'}</dd>
              </div>
            </dl>
          </section>
          <section id="propertyDetails" className="propertyDetails">
            <dl>
              <div>
                <dt>Address</dt>
                <dd className="fade">{quote.property.physicalAddress.address1}</dd>
                <dd className="fade">{quote.property.physicalAddress.address2}</dd>
                <dd className="fade">
                  {quote.property.physicalAddress.city},&nbsp;
                {quote.property.physicalAddress.state}&nbsp;
                  {quote.property.physicalAddress.zip}
                </dd>
              </div>
            </dl>
          </section>
          <section id="yearBuilt" className="yearBuilt">
            <dl>
              <div>
                <dt className="fade">Year Built</dt>
                <dd className="fade">{quote.property.yearBuilt}</dd>
              </div>
            </dl>
          </section>
          <section id="constructionType" className="constructionType">
            <dl>
              <div>
                <dt className="fade">Construction Type</dt>
                <dd className="fade">{quote.property.constructionType}</dd>
              </div>
            </dl>
          </section>
          <section id="coverageDetails">
            <dl>
              <div>
                <dt className="fade">Coverage A</dt>
                <dd className="fade">
                $ {quote.coverageLimits && this.props.appState.data && !this.props.appState.data.recalc && !this.props.appState.data.updateWorkflowDetails ?
                quote.coverageLimits.dwelling.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '--'}
                </dd>
              </div>
            </dl>
          </section>
          <section id="premium" className="premium">
            <dl>
              <div>
                <dt className="fade">Premium</dt>
                <dd className="fade">
                  {quote.rating && this.props.appState.data && !this.props.appState.data.recalc && !this.props.appState.data.updateWorkflowDetails ?
                    <ShowPremium totalPremium={quote.rating.totalPremium} isCustomize={isCustomize} /> : '--'}
                </dd>
              </div>
              {this.props.appState.data && this.props.appState.data.recalc && <div className="recalc-wrapper">
                <button
                  tabIndex={'0'}
                  className="btn btn-primary btn-round btn-sm"
                  type="button"
                  onClick={() => handleRecalc(this.props)}
                  disabled={this.props.appState.data.submitting}
                ><i className="fa fa-refresh" /></button>
              </div>}
            </dl>
          </section>
        </div>
        {/* { this.props.tasks && this.props.tasks[this.props.workflowModelName].data && this.props.tasks[this.props.workflowModelName].data.activeTask && this.props.tasks[this.props.workflowModelName].data.activeTask !== 'askToSearchAgain' && */}
        <ul className="workflow-header">
          <div className="rule" />
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askAdditionalCustomerData')} onClick={() => goToStep(this.props, 'askAdditionalCustomerData')} className={getClassForStep('askAdditionalCustomerData', this.props)}><i className={'fa fa-vcard'} /><span>Policyholder</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askUWAnswers')} onClick={() => goToStep(this.props, 'askUWAnswers')} className={getClassForStep('askUWAnswers', this.props)}><i className={'fa fa-list-ol'} /><span>Underwriting</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askToCustomizeDefaultQuote')} onClick={() => goToStep(this.props, 'askToCustomizeDefaultQuote')} className={getClassForStep('askToCustomizeDefaultQuote', this.props)}><i className={'fa fa-sliders'} /><span>Customize</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'sendEmailOrContinue')} onClick={() => goToStep(this.props, 'sendEmailOrContinue')} className={getClassForStep('sendEmailOrContinue', this.props)}><i className={'fa fa-share-alt'} /><span>Share</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'addAdditionalAIs')} onClick={() => goToStep(this.props, 'addAdditionalAIs')} className={getClassForStep('addAdditionalAIs', this.props)}><i className={'fa fa-user-plus'} /><span>Additional Parties</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askAdditionalQuestions')} onClick={() => goToStep(this.props, 'askAdditionalQuestions')} className={getClassForStep('askAdditionalQuestions', this.props)}><i className={'fa fa-envelope'} /><span>Mailing / Billing</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'editVerify')} onClick={() => goToStep(this.props, 'editVerify')} className={getClassForStep('editVerify', this.props)}><i className={'fa fa-check-square'} /><span>Verify</span></a></li>
        </ul>
        {/* } */}
      </div>
    );
  }
}

WorkflowDetails.propTypes = {
  quote: PropTypes.object,
  completedTasks: PropTypes.any, // eslint-disable-line
  actions: PropTypes.shape(),
  workflowModelName: PropTypes.string,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateWorkflowDetails: PropTypes.boolean,
      hideYoChildren: PropTypes.boolean,
      recalc: PropTypes.boolean,
      showLoader: PropTypes.boolean,
      isMoveTo: PropTypes.boolean,
      submitting: PropTypes.boolean,
      taskName: PropTypes.string,
      taskData: PropTypes.shape({})
    })
  })
};

const mapStateToProps = state => ({
  quote: state.quoteState.quote,
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks,
  customizeFormValues: _.get(state.form, 'Customize.values', {}),
  reactState: state
});

const mapDispatchToProps = dispatch => ({
  goToStepTerrible: bindActionCreators(goToStepTerrible, dispatch),
  dispatch,
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    completedTasksActions: bindActionCreators(completedTasksActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDetails);
