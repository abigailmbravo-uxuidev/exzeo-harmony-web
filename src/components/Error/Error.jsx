import React from 'react';
import Footer from '../Footer';

const Error = ({ location: { state = {} }, history: { replace } }) => {
  const { exceptions = [], quote } = state;

  const hasFatalError = exceptions.some(ex => ex.code.startsWith(1));
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

  switch (status) {
    case 'ineligible':
      content = {
        icon: 'fa-exclamation-circle',
        header: 'Property Not Eligible.',
        intro: 'The following errors have occured for this property:',
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
          'The following underwriting error(s) have occured for this quote:',
        outro:
          'If you feel that you received this page in error and would like to edit the quote, please select Edit below.',
        buttons: [
          { text: 'Start New Quote', to: '/search/address' },
          { text: 'Edit', to: `/quote/${quote.quoteNumber}/customerinfo` }
        ]
      };
      break;
    default:
      content = {
        icon: 'fa-exclamation-triangle',
        header: 'Whoopsies! Something seems to have gone wrong.',
        intro:
          "Sorry for the inconveniene, We're experiencing and application issue at the moment. Try refreshing the page or returning to the home screen.",
        outro: '',
        buttons: [{ text: 'Home', to: '/' }]
      };
  }

  return (
    <div className="route-content">
      <div className="error-content" role="article">
        {/* HARD STOP WORKFLOW ERROR*/}
        <div className="error-wrapper">
          <section>
            <div id="Error">
              <div className="error-header">
                <i className={`fa ${content.icon}`} />
                {content.header}
              </div>
              <ul className="error-list">
                {exceptions.map((ex, key) => {
                  const className = ex.code.startsWith(1)
                    ? 'error-li'
                    : 'warning-li';
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
                      onClick={() =>
                        replace(button.to, { product: quote.product })
                      }
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
