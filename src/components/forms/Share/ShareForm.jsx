import React, { Component, PropTypes } from 'react';
import { Form, reset } from 'redux-form';
import localStorage from 'localStorage';
import EmailPopup from '../../common/EmailPopup';
import Footer from '../../common/Footer';

class ShareForm extends Component {
  static propTypes = {
    completeStep: PropTypes.func,
    push: PropTypes.func,
    dispatch: PropTypes.func,
    styleName: PropTypes.string,
    handleSubmit: PropTypes.func
  }
  state = {
    quote: {},
    showEmailPopup: false
  }

  buildSubmission = (stepName, data) => ({
    variables: {
      input: {
        workflowId: localStorage.getItem('newWorkflowId'),
        stepName,
        data
      }
    }
  });

  noShareSubmit = (event) => {
    if (event && event.preventDefault) { event.preventDefault(); }
    this.props.completeStep(this.buildSubmission('sendEmailOrContinue', {
      shouldSendEmail: 'No'
    }))
      .then((result) => {
        const activeLink = result.data.completeStep.link;
        this.props.push(`${activeLink}`);
      })
      .catch((error) => {
        console.log('Error after share: ', error); // eslint-disable-line
        this.props.push('error');
      });
  }

  shareQuoteSubmit = async (event) => {
    if (event && event.preventDefault) { event.preventDefault(); }
    if (event && (!event.name || !event.emailAddr)) {
      this.props.dispatch(reset('ShareEmail'));
      return;
    }
    try {
      const state = this.state;
      state.submitting = true;
      this.setState(state);

      await this.props.completeStep(this.buildSubmission('sendEmailOrContinue', {
        shouldSendEmail: 'Yes'
      }));

      await this.props.completeStep(this.buildSubmission('askEmail', event));

      this.closeShareSubmit();
    } catch (error) {
      console.log('errors from graphql', error); // eslint-disable-line
      this.props.push('error');
    }
  }

  closeShareSubmit = () => {
    const { state } = this;
    state.showEmailPopup = false;
    this.setState(state);
    this.props.dispatch(reset('ShareEmail'));
  }

  shareQuote = (event) => {
    if (event && event.preventDefault) { event.preventDefault(); }
    const { state } = this;
    state.showEmailPopup = true;
    this.setState(state);
  }

  render() {
    const { styleName, handleSubmit } = this.props;
    return (
      <div className="workflow-content">
        <section className="section-share">
          <div className="fade-in">
            <Form className={`fade-in ${styleName || ''}`} id="SharePage" onSubmit={handleSubmit(this.noShareSubmit)} noValidate>
              <div className="form-group detail-wrapper">
                <section className="section-instructions">
                  <h3 className="section-group-header"><i className="fa fa-share-alt" /> Share</h3>
                  <p>To SHARE this quote as a PDF via email, click the <a className="btn-link" href="">SHARE</a> button</p>
                </section>
                <section className="section-instructions">
                  <h3 className="section-group-header"><i className="fa fa-arrow-circle-right" /> Continue</h3>
                  <p>To CONTINUE the quote process, you will need the following</p>
                  <ul>
                    <li>Mortgage information</li>
                    <li>Name and email address of additional owners</li>
                    <li>Name and address of any other additional insured to add to this policy</li>
                  </ul>
                  <p>When you are prepared to move forward, click the <a className="btn-link" href="">NEXT</a> button</p>
                </section>
                <section className="section-instructions">
                  <h3 className="section-group-header"><i className="fa fa-quote-left" /> New Quote</h3>
                  <p>Your current quote is saved and can be retrieved at any time. To begin a NEW QUOTE, click the <a className="btn-link" href="/"><i className="fa fa-th-large" /> Dasboard</a> tab</p>
                </section>
              </div>
              <div className="workflow-steps">
                <button className="btn btn-secondary" type="button" onClick={this.shareQuote}>share</button>
                <button className="btn btn-primary" type="submit">next</button>
              </div>
            </Form>
          </div>
        </section>
        <Footer />
        <EmailPopup
          state={this.state}
          showEmailPopup={this.state.showEmailPopup}
          primaryButtonHandler={this.shareQuoteSubmit}
          secondaryButtonHandler={this.closeShareSubmit}
        />
      </div>
    );
  }
}

export default ShareForm;
