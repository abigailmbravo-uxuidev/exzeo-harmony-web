import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as customize from '../Customize/Customize';
import { getQuote } from '../../actions/serviceActions';
import { updateQuote } from '../../actions/quoteState.actions';
import { setRecalc } from '../../actions/appStateActions';
import { goToStep } from '../../utilities/navigation';
import ShowPremium from './ShowPremium';

export const handleRecalc = (props) => {
  customize.handleFormSubmit(props.customizeFormValues, props.dispatch, props);
};

export const getClassForStep = (stepName, props) => {
  const { activeTask, completedTasks } = props.workflowState;

  if (activeTask === stepName) return 'active';

  return completedTasks.includes(stepName) ? 'selected' : 'disabled';
};

export const onKeyPress = (event, props, stepName) => {
  if (event && event.preventDefault) event.preventDefault();
  if (event && event.charCode === 13) {
    goToStep(props, stepName);
  }
};

export class WorkflowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {}
    };
  }

  render() {
    const { quote, workflowState } = this.props;
    if (!quote || !quote.quoteNumber) {
      return (<div />);
    }
    const isCustomize = workflowState.activeTask === 'askToCustomizeDefaultQuote';
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
                  {quote.rating && !this.props.appState.isRecalc ?
                    <ShowPremium totalPremium={quote.rating.totalPremium} isCustomize={isCustomize} /> : '--'}
                </dd>
              </div>
              {this.props.appState.isRecalc && <div className="recalc-wrapper">
                <button
                  tabIndex={'0'}
                  className="btn btn-primary btn-round btn-sm"
                  type="button"
                  onClick={() => handleRecalc(this.props)}
                  disabled={this.props.appState.isLoading}
                ><i className="fa fa-refresh" /></button>
              </div>}
            </dl>
          </section>
        </div>
        { !this.props.isHardStop &&
        <ul className="workflow-header" data-test="tab-nav">
          <div className="rule" />
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askAdditionalCustomerData')} onClick={() => goToStep(this.props, 'askAdditionalCustomerData')} className={getClassForStep('askAdditionalCustomerData', this.props)}><i className={'fa fa-vcard'} /><span>Policyholder</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askUWAnswers')} onClick={() => goToStep(this.props, 'askUWAnswers')} className={getClassForStep('askUWAnswers', this.props)}><i className={'fa fa-list-ol'} /><span>Underwriting</span></a></li>
          <li><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'askToCustomizeDefaultQuote')} onClick={() => goToStep(this.props, 'askToCustomizeDefaultQuote')} className={getClassForStep('askToCustomizeDefaultQuote', this.props)}><i className={'fa fa-sliders'} /><span>Customize</span></a></li>
          <li data-test="tab-nav-sendEmailOrContinue"><a tabIndex="0" onKeyPress={event => onKeyPress(event, this.props, 'sendEmailOrContinue')} onClick={() => goToStep(this.props, 'sendEmailOrContinue')} className={getClassForStep('sendEmailOrContinue', this.props)}><i className={'fa fa-share-alt'} /><span>Share</span></a></li>
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
  isHardStop: state.quoteState.state.isHardStop
});

export default connect(mapStateToProps, { updateQuote, getQuote, setRecalc })(WorkflowDetails);
