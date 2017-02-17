/* eslint no-class-assign :0 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import DependentQuestion from '../question/DependentQuestion';

class Demographics extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    questions: []
  };

  componentWillMount() {
    // this.props.dispatch(change('Demographics', 'entityType', 'Person'));
  }

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
        // newProps.data.steps &&
        this.props.data.steps.name !== newProps.data.steps.name
      )) {
      const { steps } = newProps.data;
      this.setState({ questions: steps.questions });
    }
  }

  handleChange = () => {

  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.props.completeStep({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'),
          stepName: 'askAdditionalCustomerData',
          data: event,
        },
      },
    }).then((updatedModel) => {
      console.log('UPDATED MODEL : ', updatedModel);
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
    const { styleName, handleSubmit } = this.props;
    const { questions } = this.state;

    return (
      <div className="workflow-content">
        <section className="">
          <div className="fade-in">
            <Form
              className={`fade-in ${styleName || ''}`} id="Demographics" onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="form-group survey-wrapper" role="group">
                {questions && questions.map((question, index) => (
                  <DependentQuestion
                    data={this.state.quoteInfo}
                    question={question}
                    answers={this.state}
                    handleChange={this.handleChange}
                    key={index}
                  />
                ))}
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
              </div>
              <div className="workflow-steps">
                <button className="btn btn-primary" type="submit" form="Demographics">next</button>
              </div>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

Demographics.propTypes = {
  effectiveDate: PropTypes.string,
  completeStep: PropTypes.func,
  dispatch:PropTypes.any,// eslint-disable-line
  handleSubmit: PropTypes.func,
  state:PropTypes.any,// eslint-disable-line
  styleName:PropTypes.any,// eslint-disable-line
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
          effectiveDate: moment().add(5, 'days').format('YYYY-MM-DD'),
        },
        formName: 'Demographics',
        effectiveDate,
        state,
      };
    },
  )(graphql(gql `
  query GetActiveStep($workflowId:ID!) {
    steps(id: $workflowId) {
      name
      questions {
        readOnlyValue
        defaultValueLocation
        order
        hidden
        name
        validations
        question
        answerType
        description
        defaultAnswer
        step
        answers {
          label
          default
          answer
          image
        }
      }
      completedSteps
      type
    }
  }`, {
    options: {
      variables: {
        workflowId: localStorage.getItem('newWorkflowId'),
      },
    },
  })(graphql(gql `
    mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
            name
            icon
            type
            link
        }
    }
`, { name: 'completeStep' })(Demographics)));


export default Demographics;
