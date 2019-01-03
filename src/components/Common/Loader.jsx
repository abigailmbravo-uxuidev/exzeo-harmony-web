import React from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as appStateActions from '../../actions/appStateActions';

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
        <span>Loading</span>
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
