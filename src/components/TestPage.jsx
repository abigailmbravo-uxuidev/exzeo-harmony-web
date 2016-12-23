// Test page for components
import React, { Component } from 'react';
import Survey from './common/question/Survey';
import './TestPage.css';

const surveyQuestions = [{
//   name: 'firstName',
//   question: 'First Name',
//   description: 'Test for first name',
//   answerType: 'text',
// }, {
//   name: 'lastName',
//   question: 'Last Name',
//   description: 'Test for last name',
//   answerType: 'text',
// }, {
//   name: 'bool-test',
//   question: 'Test for bool?',
//   answerType: 'bool',
//   defaultValue: false,
// }, {
//   name: 'text-test',
//   question: 'Test for text?',
//   description: 'Testing for text',
//   answerType: 'text',
// }, {
//   name: 'password-test',
//   question: 'Test for password?',
//   description: 'Testing for password',
//   answerType: 'password',
// }, {
//   name: 'date-test',
//   question: 'Test for dates?',
//   description: 'Testing for questions',
//   answerType: 'date',
// }, {
//   name: 'range-test',
//   question: 'Test for range?',
//   description: 'Testing for range',
//   answerType: 'range',
// }, {
//   name: 'dropdown-test',
//   question: 'Test for dropdown?',
//   description: 'Testing for dropdown',
//   answerType: 'radio',
//   answers: [{
//     answer: 'answer1',
//   }, {
//     answer: 'answer2',
//   }, {
//     answer: 'answer3',
//   }, {
//     answer: 'answer4',
//   }, {
//     answer: 'answer5',
//   }, {
//     answer: 'answer6',
//   }],
// }, {
//   name: 'radio-test',
//   question: 'Test for radio?',
//   description: 'Testing for radio',
//   answerType: 'radio',
//   answers: [{
//     answer: 'answer1',
//   }, {
//     answer: 'answer2',
//   }, {
//     answer: 'answer3',
//   }],
// }, {
//   name: 'slider-test',
//   question: 'Test for slider',
//   description: 'Testing for slider',
//   answerType: 'range',
//   minValue: 100,
//   maxValue: 200,
//   leftLabel: '$100',
//   rightLabel: '$200',
// }, {
  name: 'covOneSlider',
  question: 'Slider one',
  answerType: 'range',
  defaultValue: 150000,
  minValue: 100000,
  maxValue: 200000,
}, {
  name: 'pp-bool',
  question: 'Do you want personal property?',
  answerType: 'bool',
}, {
  name: 'pp-slider',
  question: 'Personal Property',
  answerType: 'range',
  conditional: {
    value: {
      dependency: 'covOneSlider',
      min: 0.25,
      default: 0.35,
      max: 0.5,
      hardMin: 30000,
      hardMax: 90000,
    },
    display: [{
      dependency: 'pp-bool',
      trigger: true,
      operator: 'equal',
      type: 'hidden',
    }],
  },
}, {
  name: 'dep-test1',
  question: 'Disabled test 1',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'dep-test2',
  question: 'Disabled test 2',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'dep-test3',
  question: 'Disabled test 3',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'dep-test4',
  question: 'Hidden test 4',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'dep-test5',
  question: 'Hidden test 5',
  answerType: 'bool',
  defaultValue: false,
}, {
  name: 'dependent-test',
  question: 'Test me',
  answerType: 'text',
  conditional: {
    display: [{
      type: 'disabled',
      operator: 'equal',
      trigger: true,
      dependency: 'dep-test1',
    }, {
      type: 'disabled',
      operator: 'equal',
      trigger: true,
      dependency: 'dep-test3',
    }, {
      type: 'disabled',
      operator: 'equal',
      trigger: true,
      dependency: 'dep-test2',
    }, {
      type: 'hidden',
      operator: 'equal',
      trigger: true,
      dependency: 'dep-test4',
    }, {
      type: 'hidden',
      operator: 'equal',
      trigger: true,
      dependency: 'dep-test5',
    }],
  },
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
  render() {
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <div className="workflow-content">
            <section>
              <Survey
                questions={surveyQuestions}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
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
