// Test page for components
import React, { Component } from 'react';
import Survey from './common/question/Survey';

const surveyQuestions = [{
  id: 'firstName',
  question: 'First Name',
  description: 'Test for first name',
  answerType: 'text',
  styleName: 'firstName',
}, {
  id: 'lastName',
  question: 'Last Name',
  description: 'Test for last name',
  answerType: 'text',
  styleName: 'lastName',
}, {
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
  handleSubmit = (form) => {
    console.log(form); // eslint-disable-line
  }
  render() {
    return (
        <div className="survey" role="article">
                <div className="fade-in">
                        <Survey questions={surveyQuestions} handleSubmit={this.handleSubmit} />
                </div>
        </div>
    );
  }
}

export default TestPage;
