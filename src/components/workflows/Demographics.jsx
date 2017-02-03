import React, { PropTypes, Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector, Field } from 'redux-form';
import Footer from '../common/Footer';
import TextInput from '../common/form/TextInput';
import PolicyHolder from '../common/policyHolder/PolicyHolder';
import {Link} from 'react-router-dom';

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
    //}
  }

  render() {
    const {
      effectiveDate, styleName, handleSubmit, handleChange,
      pristine, reset, submitting, error, invalid
    } = this.props;
    return (
      <Form
        className={`fade-in ${styleName || ''}`} id="Demographics" onSubmit={handleSubmit(this.handleOnSubmit)}
        noValidate
      >
        <PolicyHolder {...this.props} />
        <div className="form-group survey-wrapper" role="group">
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
        effectiveDate,
      };
    },
  )(Demographics);


export default Demographics;
