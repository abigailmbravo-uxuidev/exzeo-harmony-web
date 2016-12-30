import React, { Component } from 'react';
import Survey from '../common/question/Survey';
import ContentManager from './ContentManager';

function mapQuestions(state) {
  const { questions, answers } = state;
  // //////////////////////
  questions.forEach((question) => {
    let value = '';
    if ('defaultValue' in question) {
      value = question.defaultValue;
    } else if (question.answerType === 'bool') {
      value = false;
    } else if (question.answerType === 'range') {
      value = 0;
    }
    answers[question.name] = {
      value,
      hidden: false,
      disabled: false,
    };
  });
  // //////////////////
  return { questions, answers };
}

class CMS extends Component {
  state = {
    questions: [],
    answers: {},
  }
  handleChange = () => {}
  handleSubmit = () => {}
  addQuestion = () => {
    const newName = prompt('Name your question', 'Name');
    if (this.state.questions.find(q => q.name === newName)) {
      console.error('question already exists');
    } else {
      this.state.questions.push({
        name: newName,
        value: 'new',
      });
      console.log(mapQuestions(this.state));
      this.setState(mapQuestions(this.state));
    }
  }
  updateQuestions = (event, name) => {
    console.log(event.target.name, name);
    const target = event.target;
    this.state.answers[name][target.name] = target.value;
    this.state.questions.find(q => q.name === name)[target.name] = target.value;
    this.setState(this.state);
  }
  toggleEdit = (name) => {
    this.state.questions.find(q => q.name === name).editing =
      !this.state.questions.find(q => q.name === name).editing;
    this.setState(this.state);
  }
  addAnswer = (newAnswer, name) => {
    this.state.questions.find(q => q.name === name).answers =
      this.state.questions.find(q => q.name === name).answers || [];
    this.state.questions.find(q => q.name === name).answers.push({
      answer: newAnswer,
    });
  }
  render() {
    const { questions, answers } = this.state;
    return (
      <div>
        <Survey
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          questions={questions}
          answers={answers}
        />
        <ContentManager
          questions={questions}
          toggleEdit={this.toggleEdit}
          addAnswer={this.addAnswer}
          addQuestion={this.addQuestion}
          updateQuestions={this.updateQuestions}
        />
      </div>
    );
  }
}

export default CMS;
