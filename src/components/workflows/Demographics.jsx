import React, { PropTypes, Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector, Field, change } from 'redux-form';
import Footer from '../common/Footer';
import TextInput from '../common/form/TextInput';
import PolicyHolderDemographics from '../common/policyHolder/PolicyHolderDemographics';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Demographics extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  componentWillMount() {
    this.props.dispatch(change('Demographics', 'entityType', 'Person'));
  }

  handleChange = (event) => {

  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    this.props.completeStep({
      variables: {
        input: {
          workflowId: 257738,
          stepName: 'askAdditionalCustomerData',
          data: this.formatData(event),
        },
      },
    }).then((updatedModel) => {
      console.log(updatedModel);
      const activeLink = updatedModel.data.completeStep.link;
      this.context.router.push(`${activeLink}`);
    }).catch((error) => {
      // this.context.router.transitionTo('/error');
      console.log('errors from graphql', error); // eslint-disable-line
    });
  }

  formatData = (demographicAnswers) => {
    const answers = [];
    Object.keys(demographicAnswers).forEach((key) => {
      answers.push({ key, value: demographicAnswers[key] });
    });
    return answers;
  }

  render() {
    const {
      dispatch, state, formName, effectiveDate, styleName, handleSubmit,
      pristine, reset, submitting, error, invalid,
    } = this.props;

    return (
      <Form
        className={`fade-in ${styleName || ''}`} id="Demographics" onSubmit={handleSubmit(this.handleOnSubmit)}
        noValidate
      >
        <PolicyHolderDemographics {...this.props} state={state} handleChange={this.handleChange} />
        <div className="form-group survey-wrapper" role="group">
          <div className="form-group agentID" role="group">
            <label htmlFor="agencyID">Agent</label>
            <select name="agencyID">
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
  )(graphql(gql `
    mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
            name
            icon
            type
            link
        }
    }
`, { name: 'completeStep' })(Demographics));


export default Demographics;
