// Test page for components
import React, { Component } from 'react';
import Question from './common/question/Question';
import Survey from './common/question/Survey';

const boolQuestion = {
  question: {
    id: 'bool-test',
    question: 'Test for bool?',
    description: 'Testing for bool',
    answerType: 'bool',
  },
};

const textQuestion = {
  question: {
    id: 'text-test',
    question: 'Test for text?',
    description: 'Testing for text',
    answerType: 'text',
  },
};

const passwordQuestion = {
  question: {
    id: 'password-test',
    question: 'Test for password?',
    description: 'Testing for password',
    answerType: 'password',
  },
};

// Needs 6 or more answers to activate
const dropdownQuestion = {
  question: {
    id: 'dropdown-test',
    question: 'Test for dropdown?',
    description: 'Testing for dropdown',
    answerType: 'radio',
    answers: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6'],
  },
};

const radioQuestion = {
  question: {
    id: 'radio-test',
    question: 'Test for radio?',
    description: 'Testing for radio',
    answerType: 'radio',
    answers: ['answer1', 'answer2', 'answer3'],
  },
};

const surveyQuestions = [{
  id: 'bool-test',
  question: 'Test for bool?',
  description: 'Testing for bool',
  answerType: 'bool',
}, {
  id: 'text-test',
  question: 'Test for text?',
  description: 'Testing for text',
  answerType: 'text',
}, {
  id: 'password-test',
  question: 'Test for password?',
  description: 'Testing for password',
  answerType: 'password',
}, {
  id: 'dropdown-test',
  question: 'Test for dropdown?',
  description: 'Testing for dropdown',
  answerType: 'radio',
  answers: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5', 'answer6'],
}, {
  id: 'radio-test',
  question: 'Test for radio?',
  description: 'Testing for radio',
  answerType: 'radio',
  answers: ['answer1', 'answer2', 'answer3'],
}];

class TestPage extends Component {
  state = {
    'bool-test': false,
    'text-test': '',
    'password-test': '',
    'dropdown-test': 'answer1',
    'radio-test': 'answer1',
  }
  handleChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("wew"); // eslint-disable-line
  }
  render() {
    return (
      <div>
        <br />
        <Question {...boolQuestion} handleChange={this.handleChange} value={this.state['bool-test']} />
        <Question {...textQuestion} handleChange={this.handleChange} value={this.state['text-test']} />
        <Question {...passwordQuestion} handleChange={this.handleChange} value={this.state['password-test']} />
        <Question {...dropdownQuestion} handleChange={this.handleChange} value={this.state['dropdown-test']} />
        <Question {...radioQuestion} handleChange={this.handleChange} value={this.state['radio-test']} />
        <Survey questions={surveyQuestions} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default TestPage;
