// Test page for components
import React, { Component } from 'react';
import Question from './common/question/Question';

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
  render() {
    return (
      <div>
        <Question {...boolQuestion} handleChange={this.handleChange} value={this.state['bool-test']} />
        <br />
        <Question {...textQuestion} handleChange={this.handleChange} value={this.state['text-test']} />
        <br />
        <Question {...passwordQuestion} handleChange={this.handleChange} value={this.state['password-test']} />
        <br />
        <Question {...dropdownQuestion} handleChange={this.handleChange} value={this.state['dropdown-test']} />
        <br />
        <Question {...radioQuestion} handleChange={this.handleChange} value={this.state['radio-test']} />
      </div>
    );
  }
}

export default TestPage;
