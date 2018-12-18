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
import { updateQuote } from '../../actions/quoteState.actions';
import { goToStep } from '../../utilities/navigation';

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

export const getClassForStep = (stepName, props) => {
  let className = '';
  const { activeTask, completedTasks } = props.workflowState;

  if (activeTask === stepName) {
    className = 'active';
  } else if (completedTasks.includes(stepName)) {
    className = 'selected';
  } else if (!completedTasks.includes(stepName)) {
    className = 'disabled';
  }
  return className;
  // const currentData = props.tasks && props.tasks[props.workflowModelName].data ? props.tasks[props.workflowModelName].data : {};
  // if (currentData && currentData.activeTask && currentData.activeTask.name === stepName) {
  //   className = 'active';
  // } else if (currentData && currentData.model && (_.includes(currentData.model.completedTasks, stepName) || _.includes(props.completedTasks, stepName))) {
  //   className = 'selected';
  // } else if (currentData && currentData.model && !_.includes(currentData.model.completedTasks, stepName) && !_.includes(props.completedTasks, stepName)) {
  //   className = 'disabled';
  // }
  // return className;
};

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
    const { quote, workflowState } = this.props;
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
                $ {quote.coverageLimits && (workflowState.activeTask !== 'askAdditionalCustomerData' && workflowState.activeTask !== 'askUWAnswers')
                    ? quote.coverageLimits.dwelling.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : '--'
                  }
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
        { !this.props.isHardStop &&
        <ul className="workflow-header">
          <div className="rule" />
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askAdditionalCustomerData')} onClick={() => goToStep(this.props, 'askAdditionalCustomerData')} className={getClassForStep('askAdditionalCustomerData', this.props)}><i className={'fa fa-vcard'} /><span>Policyholder</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askUWAnswers')} onClick={() => goToStep(this.props, 'askUWAnswers')} className={getClassForStep('askUWAnswers', this.props)}><i className={'fa fa-list-ol'} /><span>Underwriting</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askToCustomizeDefaultQuote')} onClick={() => goToStep(this.props, 'askToCustomizeDefaultQuote')} className={getClassForStep('askToCustomizeDefaultQuote', this.props)}><i className={'fa fa-sliders'} /><span>Customize</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'sendEmailOrContinue')} onClick={() => goToStep(this.props, 'sendEmailOrContinue')} className={getClassForStep('sendEmailOrContinue', this.props)}><i className={'fa fa-share-alt'} /><span>Share</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'addAdditionalAIs')} onClick={() => goToStep(this.props, 'addAdditionalAIs')} className={getClassForStep('addAdditionalAIs', this.props)}><i className={'fa fa-user-plus'} /><span>Additional Parties</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askAdditionalQuestions')} onClick={() => goToStep(this.props, 'askAdditionalQuestions')} className={getClassForStep('askAdditionalQuestions', this.props)}><i className={'fa fa-envelope'} /><span>Mailing / Billing</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'editVerify')} onClick={() => goToStep(this.props, 'editVerify')} className={getClassForStep('editVerify', this.props)}><i className={'fa fa-check-square'} /><span>Verify</span></a></li>
        </ul>}
        {/* } */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  completedTasks: state.completedTasks,
  customizeFormValues: _.get(state.form, 'Customize.values', {}),
  quote: state.quoteState.quote,
  workflowState: state.quoteState.state,
  isHardStop: state.quoteState.state ? state.quoteState.state.isHardStop : false

});

const mapDispatchToProps = dispatch => ({
  dispatch,
  updateQuote: bindActionCreators(updateQuote, dispatch),
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    completedTasksActions: bindActionCreators(completedTasksActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowDetails);
