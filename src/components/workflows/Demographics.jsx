/* eslint no-class-assign :0 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector } from 'redux-form';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';
import FormGenerator from '../form/FormGenerator';
import DependentQuestion from '../question/DependentQuestion';
import Footer from '../common/Footer';

const agentQuestion = {
  question: 'Agent',
  name: 'agentID',
  answerType: 'select',
  answers: [{
    answer: 60000,
    label: 'Adam Doe',
  }, {
    answer: 60001,
    label: 'John Doe',
  }, {
    answer: 60002,
    label: 'Cathy Doe',
  }, {
    answer: 60003,
    label: 'Emily Doe',
  }, {
    answer: 60004,
    label: 'Hero Doe',
  }, {
    answer: 60005,
    label: 'Jose Doe',
  }],
  validations: ['required']
};

class Demographics extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    questions: []
  };

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
        // newProps.data.steps &&
        this.props.data.steps.name !== newProps.data.steps.name
      )) {
      const { steps } = newProps.data;
      steps.questions.push(agentQuestion);
      this.setState({ questions: steps.questions });
    }
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

  render() {
    const { styleName, handleSubmit, initialValues } = this.props;
    const { questions } = this.state;

    return (
      <div className="workflow-content">
        <section className="">
          <div className="fade-in">
            <FormGenerator
              name="Demographics"
              initialValues={initialValues}
              questions={questions}
              data={this.state.quoteInfo}
              handleOnSubmit={this.handleOnSubmit}
              styleName={styleName}
            >
              <button className="btn btn-primary" type="submit" form="Demographics">next</button>
            </FormGenerator>
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

// Demographics = reduxForm({
//   form: 'Demographics',
// })(Demographics);


Demographics = connect(
    state => ({
      initialValues: {
        effectiveDate: moment().add(5, 'days').format('YYYY-MM-DD'),
      },
      formName: 'Demographics',
      state,
    }),
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
