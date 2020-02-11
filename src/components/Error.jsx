import React from 'react';

import Footer from './Footer';

const Error = ({
  getQuote,
  location: { state = {} },
  history: { replace }
}) => {
  const { exceptions = [], quote } = state;

  const hasFatalError = exceptions.some(ex => ex.action === 'Fatal Error');
  const isIneligible = exceptions.some(ex => ex.code === 102);

  // Possible error stauses: {'ineligible', 'fatal', 'editiable', 'misc'}
  const status = isIneligible
    ? 'ineligible'
    : hasFatalError
    ? 'fatal'
    : exceptions.length > 0
    ? 'editiable'
    : 'misc';

  let content = {};

  const buttonClick = async to => {
    if (to.includes('customerInfo')) {
      await getQuote(quote.quoteNumber, quote._id);
    }
    replace(to, { product: quote.product });
  };

  switch (status) {
    case 'ineligible':
      content = {
        icon: 'fa-exclamation-circle',
        header: 'Property Not Eligible.',
        intro: 'The following errors have occurred for this property:',
        outro: '',
        buttons: [{ text: 'Start New Quote', to: '/search/address' }]
      };
      break;
    case 'fatal':
      content = {
        icon: 'fa-exclamation-triangle',
        header: 'Underwriting Error(s)',
        intro: "Unfortunately, we've encountered an error with your quote:",
        outro: '',
        buttons: [{ text: 'Start New Quote', to: '/search/address' }]
      };
      break;
    case 'editiable':
      content = {
        icon: 'fa-exclamation-triangle',
        header: 'Underwriting Error(s)',
        intro:
          'The following underwriting error(s) have occurred for this quote:',
        outro:
          'If you feel that you received this page in error and would like to edit the quote, please select Edit below.',
        buttons: [
          { text: 'Start New Quote', to: '/search/address' },
          { text: 'Edit', to: `/quote/${quote.quoteNumber}/customerInfo` }
        ]
      };
      break;
    default:
      content = {
        icon: 'fa-exclamation-triangle',
        header: 'Whoopsies! Something seems to have gone wrong.',
        intro:
          "Sorry for the inconvenience, We're experiencing and application issue at the moment. Try refreshing the page or returning to the home screen.",
        outro: '',
        buttons: [{ text: 'Home', to: '/' }]
      };
  }

  return (
    <div className="route-content">
      <div className="error-content" role="article">
        {/* HARD STOP WORKFLOW ERROR*/}
        <header className={status}>
          <div className="error-header">
            <h4>
              <i className={`fa ${content.icon}`} />
              {content.header}
            </h4>
          </div>
          <ul className="workflow-header">
            <div className="rule"></div>
            <li>
              <a className="disabled">
                <i className="fa fa-vcard"></i>
                <span>Policyholder</span>
              </a>
            </li>
            <li>
              <a className="disabled">
                <i className="fa fa-list-ol"></i>
                <span>Underwriting</span>
              </a>
            </li>
            <li>
              <a className="disabled">
                <i className="fa fa-sliders"></i>
                <span>Customize</span>
              </a>
            </li>
            <li>
              <a className="disabled">
                <i className="fa fa-share-alt"></i>
                <span>Share</span>
              </a>
            </li>
            <li>
              <a className="disabled">
                <i className="fa fa-user-plus"></i>
                <span>Additional Parties</span>
              </a>
            </li>
            <li>
              <a className="disabled">
                <i className="fa fa-envelope"></i>
                <span>Mailing / Billing</span>
              </a>
            </li>
            <li>
              <a className="disabled">
                <i className="fa fa-check-square"></i>
                <span>Verify</span>
              </a>
            </li>
          </ul>
        </header>

        <div className="error-wrapper">
          <section>
            <div id="Error">
              <h4 className="error-intro">{content.intro}</h4>
              <ul className="error error-list">
                {exceptions.map((ex, key) => {
                  if (
                    ex.action === 'Missing Info' ||
                    ex.action === 'Informational'
                  )
                    return '';
                  const className =
                    ex.action === 'Fatal Error' ? 'error-li' : 'warning-li';
                  return (
                    <li className={className} key={key}>
                      {ex.agentMessage}
                    </li>
                  );
                })}
              </ul>
              <div className="error-outro">{content.outro}</div>
              <div className="error-footer">
                {content.buttons.map((button, key) => (
                  <React.Fragment key={key}>
                    <button
                      className={`btn ${
                        content.buttons.length - 1 === key
                          ? 'btn-primary'
                          : 'btn-secondary'
                      }`}
                      type="button"
                      data-test={button.text.toLowerCase().replace(/\s/g, '-')}
                      onClick={() => buttonClick(button.to)}
                    >
                      {button.text}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
          <aside>
            <div className="image" />
            <div className="contact-info">
              <a
                className="link-email"
                href="mailto:customerservice@typtap.com"
              >
                <i className="fa fa-envelope" /> <span>email us</span>
              </a>
              <a className="link-phone" href="tel:8442897968">
                <i className="fa fa-phone" /> <span>(844) 289-7968</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
