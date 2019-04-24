import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';

import Footer from '../Common/Footer';
import AdditionalInterestModal from '../Common/AIPopup';
import SnackBar from '../Common/SnackBar';
import failedSubmission from '../Common/reduxFormFailSubmit';

export class AddAdditionalInterest extends React.Component {
  state = {
    showAdditionalInterestModal: false,
    selectedAI: null,
    addAdditionalInterestType: ''
  };


  noAddAdditionalInterestSubmit = async () => {
    const taskData = { shouldUpdateAIs: 'No' };
    // TODO: Temp noSubmit, will come back
    await this.props.updateQuote({ noSubmit: true, data: taskData, quoteNumber: this.props.quote.quoteNumber });
    this.props.history.replace('mailingBilling');
  };

  addMortgagee = () => {
    this.props.history.replace('askMortgagee');
  };

  addPremiumFinance = (props) => {
    this.props.history.replace('askPremiumFinance');
  };

  addAdditionalInsured = () => {
    this.props.history.replace('askAdditionalInsured');
  };

  addInterest = () => {
    this.props.history.replace('askAdditionalInterest');
  };

  addBillpayer = () => {
    this.props.history.replace('askBillPayer');
  };

  goToStep = (type) => {
    if (type === 'Mortgagee') this.addMortgagee();
    else if (type === 'Bill Payer') this.addBillpayer();
    else if (type === 'Premium Finance') this.addPremiumFinance();
    else if (type === 'Additional Interest') this.addInterest();
    else if (type === 'Additional Insured') this.addAdditionalInsured();
  };

  returnTaskDataName = (type) => {
    if (type === 'Mortgagee') return 'mortgagee';
    else if (type === 'Bill Payer') return 'billPayer';
    else if (type === 'Premium Finance') return 'premiumFinance';
    else if (type === 'Additional Interest') return 'additionalInterest';
    else if (type === 'Additional Insured') return 'additionalInsured';
  };

  openDeleteAdditionalInterest = (ai) => {
    this.setState({ showAdditionalInterestModal: true, selectedAI: ai, addAdditionalInterestType: ai.type });
  };

  hideAdditionalInterestModal = () => {
    this.setState({ showAdditionalInterestModal: false, selectedAI: null, addAdditionalInterestType: '' });
  };

  deleteAdditionalInterest = async (selectedAdditionalInterest) => {
    const { quote } = this.props;

    const additionalInterests = quote.additionalInterests || [];

    // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);
    // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

    let order = 0;
    _.each(_.filter(modifiedAIs, ai => ai.type === selectedAdditionalInterest.type), (ai) => {
      ai.order = order; // eslint-disable-line
      order += 1;
    });

    // TODO fix
    // await this.props.updateQuote({ data: { shouldUpdateAIs: this.returnTaskDataName(selectedAdditionalInterest.type) }, quoteNumber: quote.quoteNumber });
    // await this.props.updateQuote({ data: { additionalInterests: modifiedAIs }, quoteNumber: quote.quoteNumber });

    this.setState({ showAdditionalInterestModal: false });
  };

  render() {
    return (
      <div className="route-content" data-test="add-additional-interest">
      <SnackBar show={this.props.showSnackBar} timer={3000}>
        <p>Please correct errors.</p>
      </SnackBar>
      <Form id="AddAdditionalInterestPage" onSubmit={this.props.handleSubmit(this.noAddAdditionalInterestSubmit)}>
        <div className="scroll">
          <div className="form-group detail-wrapper">
            <p>Please select the type of Additional Interest that you would like to add for this policy. (If the policy premium bill needs to go to somewhere other than the policyholder or an additional interest, please select Bill Payer to enter the alternate address.)</p>
            <div className="button-group">
              <button className="btn btn-secondary" type="button" onClick={() => this.addMortgagee()} data-test="mortgagee-add"><div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
              <button className="btn btn-secondary" type="button" onClick={() => this.addAdditionalInsured()} data-test="ains-add"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
              <button className="btn btn-secondary" type="button" onClick={() => this.addInterest()} data-test="ai-add"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
              <button disabled={_.filter(this.props.quote.additionalInterests, ai => ai.type === 'Bill Payer').length > 0} className="btn btn-secondary" type="button" onClick={() => this.addPremiumFinance()} data-test="premium-finance-add"><div><i className="fa fa-plus" /><span>Premium Finance</span></div></button>
              <button disabled={_.filter(this.props.quote.additionalInterests, ai => ai.type === 'Premium Finance').length > 0} className="btn btn-secondary" type="button" onClick={() => this.addBillpayer()} data-test="bill-payer-add"><div><i className="fa fa-plus" /><span>Bill Payer</span></div></button>
            </div>
            {/* list of additional interests*/}
            <div className="results-wrapper">
              <ul className="results result-cards">
                {this.props.quote && this.props.quote.additionalInterests && this.props.quote.additionalInterests.map((question, index) =>
                  <li key={index}>
                    <div>
                      {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                      <div className="card-icon"><i className={`fa fa-circle ${question.type}`} /><label>{question.type} {question.order + 1}</label></div>
                      <section>
                        <h4>{`${question.name1}`}</h4>
                        <h4>{`${question.name2}`}</h4>
                        <p className="address">
                          {`${question.mailingAddress.address1}`}
                          {question.mailingAddress.address2 ? `, ${question.mailingAddress.address2}` : ''}
                        </p>
                        <p>
                          {`${question.mailingAddress.city}, `}
                          {`${question.mailingAddress.state} `}
                          {` ${question.mailingAddress.zip}`}
                        </p>
                      </section>
                      <a className="remove" onClick={() => this.openDeleteAdditionalInterest(question)}>
                        <i className="fa fa-trash" />
                      </a>
                      <a className="edit" onClick={() => this.goToStep(question.type)}>
                        <i className="fa fa-pencil" />
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="workflow-steps">
            {this.props.quote.additionalInterests && this.props.quote.additionalInterests.length === 0 &&
            <button className="btn btn-primary" type="submit" disabled={this.props.isLoading} data-test="submit">Not Applicable</button>
            }
            {this.props.quote.additionalInterests && this.props.quote.additionalInterests.length > 0 &&
            <button className="btn btn-primary" type="submit" disabled={this.props.isLoading} data-test="submit">next</button>
            }
          </div>
          <Footer />
        </div>
      </Form>
      {this.state.showAdditionalInterestModal &&
        <AdditionalInterestModal
          {...this.props}
          selectedAI={this.state.selectedAI}
          primaryButtonHandler={() => this.deleteAdditionalInterest(this.state.selectedAI)}
          secondaryButtonHandler={() => this.hideAdditionalInterestModal()}
        />
      }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  showSnackBar: state.appState.showSnackBar,
  appState: state.appState,
  fieldValues: _.get(state.form, 'AddAdditionalInterestPage.values', {}),
  quote: state.quoteState.quote || {}
});

export default connect(mapStateToProps)(reduxForm({
  form: 'AddAdditionalInterest',
  enableReinitialize: true,
  onSubmitFail: failedSubmission,
})(AddAdditionalInterest));
