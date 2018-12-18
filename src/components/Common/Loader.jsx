import React from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as appStateActions from '../../actions/appStateActions';

export const pageName = (props) => {
  const nextPage = props.appState && props.appState.data ? props.appState.data.nextPage : '';
  switch (nextPage) {
    case 'askAdditionalCustomerData':
      return 'Loading Policyholder';

    case 'askUWAnswers':
      return 'Loading Underwriting';

    case 'askToCustomizeDefaultQuote':
      return 'Loading Customize';

    case 'sendEmailOrContinue':
      return 'Loading Share';

    case 'addAdditionalAIs':
      return 'Loading Additional Parties';

    case 'askAdditionalQuestions':
      return 'Loading Mailing/Billing';

    case 'askScheduleInspectionDates':
      return 'Loading Verify';
    default:
      return 'Loading';
  }
};
const Loader = props => (
  <div className="loader modal">
    <div className="card" role="dialog">
      <div className="card-block">
        <div className="ring-5">
          <div className="ring-4">
            <div className="ring-3">
              <div className="ring-2">
                <div className="ring-1" />
              </div>
            </div>
          </div>
        </div>
        <span>{pageName(props)}</span>
      </div>
    </div>
  </div>
  );

Loader.propTypes = {
  appState: propTypes.shape({
    data: propTypes.shape({
      nextPage: propTypes.string
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Loader' })(Loader));

// export default Loader;
