import React, { PropTypes, Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector, Field } from 'redux-form';
import Footer from '../common/Footer';
import TextInput from '../common/form/TextInput';
import PolicyHolder from '../common/policyHolder/PolicyHolder';
import { Link } from 'react-router-dom';

class Demographics extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  handleChange = (event) => {
    // const { state } = this;
    // state[event.target.name] = event.target.value;
    // state.updated = true;
    // this.setState(state);
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    this.context.router.push('/workflow/underwriting');
    // const { state } = this;
    // if (state.updated) {
    //   // Do two mutations
    //   state.updated = false;
    //   this.setState(state);
    // } else {
    //   this.context.router.push('/workflow/shareQuote');
    // }
  }

  render() {
    const {
      state, formName, effectiveDate, styleName, handleSubmit, handleChange,
      pristine, reset, submitting, error, invalid,
    } = this.props;
    return (
      <Form
        className={`fade-in ${styleName || ''}`} id="Demographics" onSubmit={handleSubmit(this.handleOnSubmit)}
        noValidate
      >
        <PolicyHolder {...this.props} name="policyHolders[0]" state={state} />
        <div className="form-group survey-wrapper" role="group">
          <div className="form-group agentID" role="group">
            <label htmlFor="agentId">Agent</label>
            <select name="agentId">
              <option value="60000">Adam Doe</option>
              <option value="60001">Betsy Doe</option>
              <option value="60002">Cathy Doe</option>
              <option value="60003">Daniel Doe</option>
              <option value="60004">Ethan Doe</option>
              <option value="60005">Frank Doe</option>
              <option value="60006">Gail Doe</option>
              <option value="60007">Helen Doe</option>
            </select>
          </div>
          <TextInput
            answerType="date"
            handleChange={this.handleChange}
            name="effectiveDate"
            defaultValue={effectiveDate}
            question={'Effective Date'}
            validations={['required', 'date']}
          />

        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="Demographics">next</button>
        </div>
        <Footer />
      </Form>
    );
  }
}

Demographics.propTypes = {
  effectiveDate: PropTypes.string,
  handleChange: PropTypes.func,
};

Demographics = reduxForm({
  form: 'Demographics',
})(Demographics);

const selector = formValueSelector('Demographics'); // <-- same as form name

Demographics = connect(
    (state) => {
      const effectiveDate = selector(state, 'effectiveDate');

      return {
        initialValues: {
          effectiveDate: moment().format('YYYY-MM-DD'),
        },
        formName: 'Demographics',
        effectiveDate,
        state,
      };
    },
  )(Demographics);


export default Demographics;
