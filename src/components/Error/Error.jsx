import React from 'react';
import Footer from '../Footer';

const Error = ({ location: { state = {} }, history: { replace } }) => {
  const { exceptions = [], quote } = state;

  const hasFatalError = exceptions.some(ex => ex.code.startsWith(1));
  const isIneligible = exceptions.some(ex => ex.code === 102);
  console.log();
  const sortByCode = (a, b) => {
    console.log(a.code);
    const aCode = Number(a.code);
    const bCode = Number(b.code);

    aCode > bCode ? 1 : -1;
  };

  //exceptions.sort(sortByCode)

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
          { text: 'Edit', to: `/quote/${quote.quoteNumber}/customerInfo` }
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
        <header className={status}>
          <div className="error-header">
            <i className={`fa ${content.icon}`} />
            <h4>{content.header}</h4>
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
              <ul className="error-list">
                {exceptions.map((ex, key) => {
                  if (ex.code.startsWith('0')) return '';
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
