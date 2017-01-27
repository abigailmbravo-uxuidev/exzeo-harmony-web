// Test page for components
import React, { Component } from 'react';
import Survey from './common/question/Survey';
import './TestPage.css';
// Uncomment and change the surveyQuestions object name below
// import surveyQuestions from './CoverageQuestions';

const surveyQuestions = [{
  name: 'dep-test1',
  question: 'Disabled test 1',
  answerType: 'bool',
  defaultValue: false,
}];

class TestPage extends Component {
  state = {
    questions: {},
  }
  componentWillMount = () => {
    const { questions } = this.state;
    surveyQuestions.forEach((question) => {
      let value = '';
      if ('defaultValue' in question) {
        value = question.defaultValue;
      } else if (question.answerType === 'bool') {
        value = false;
      } else if (question.answerType === 'range') {
        value = '0';
      }
      questions[question.name] = {
        value,
        hidden: false,
        disabled: false,
      };
    });
    surveyQuestions.forEach((question) => {
      if (question.conditional && question.conditional.display) {
        const { display } = question.conditional;
        display.forEach((condition) => {
          switch (condition.operator) { // eslint-disable-line
            case 'equal':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value === condition.trigger);
              }
              break;
            case 'greaterThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value > condition.trigger);
              }
              break;
            case 'lessThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value < condition.trigger);
              }
              break;
          }
        });
      }
    });
    this.setState({ questions });
  }
  handleChange = (event) => {
    const { questions } = this.state;
    questions[event.target.name].value = event.target.value;
    surveyQuestions.forEach((question) => {
      if (question.conditional && question.conditional.display) {
        questions[question.name].hidden = false;
        questions[question.name].disabled = false;
        const { display } = question.conditional;
        display.forEach((condition) => {
          switch (condition.operator) { // eslint-disable-line
            case 'equal':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value === condition.trigger);
              }
              break;
            case 'greaterThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value > condition.trigger);
              }
              break;
            case 'lessThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] =
                  !(questions[condition.dependency].value < condition.trigger);
              }
              break;
          }
        });
      }
    });
    this.setState({ questions });
  }
  formatData = () => {
    const answers = [];
    Object.keys(this.state.questions).forEach((key) => {
      answers.push({
        key,
        value: this.state.questions[key],
      });
    });
    return answers;
  }
  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    console.log(this.state.questions); // eslint-disable-line
  }
  render() {
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <div className="workflow-content">
            <section>
              <Survey
                questions={surveyQuestions}
                handleChange={this.handleChange}
                handleOnSubmit={this.handleSubmit}
                answers={this.state.questions}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default TestPage;
