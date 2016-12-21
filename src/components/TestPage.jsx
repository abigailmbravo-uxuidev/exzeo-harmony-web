// Test page for components
import React, { Component } from 'react';
import Survey from './common/question/Survey';
import './TestPage.css';

const surveyQuestions = [{
  name: 'firstName',
  question: 'First Name',
  description: 'Test for first name',
  answerType: 'text',
}, {
  name: 'lastName',
  question: 'Last Name',
  description: 'Test for last name',
  answerType: 'text',
}, {
  name: 'bool-test',
  question: 'Test for bool?',
  description: 'Testing for bool',
  answerType: 'bool',
}, {
  name: 'text-test',
  question: 'Test for text?',
  description: 'Testing for text',
  answerType: 'text',
}, {
  name: 'password-test',
  question: 'Test for password?',
  description: 'Testing for password',
  answerType: 'password',
}, {
  name: 'date-test',
  question: 'Test for dates?',
  description: 'Testing for questions',
  answerType: 'date',
}, {
  name: 'range-test',
  question: 'Test for range?',
  description: 'Testing for range',
  answerType: 'range',
}, {
  name: 'dropdown-test',
  question: 'Test for dropdown?',
  description: 'Testing for dropdown',
  answerType: 'radio',
  answers: [{
    answer: 'answer1',
  }, {
    answer: 'answer2',
  }, {
    answer: 'answer3',
  }, {
    answer: 'answer4',
  }, {
    answer: 'answer5',
  }, {
    answer: 'answer6',
  }],
}, {
  name: 'radio-test',
  question: 'Test for radio?',
  description: 'Testing for radio',
  answerType: 'radio',
  answers: [{
    answer: 'answer1',
  }, {
    answer: 'answer2',
  }, {
    answer: 'answer3',
  }],
}];

class TestPage extends Component {
  state = {
    questions: {},
  }
  handleChange = (event) => {
    const { questions } = this.state;
    // console.log(event.target.name, event.target.value);
    questions[event.target.name] = Number(event.target.value) ?
     Number(event.target.value) : event.target.value;
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
            <aside>
              <div className="side-panel" role="contentinfo">
                <section id="premium" className="premium">
                  <dl>
                    <div>
                      <dt>Annual premium</dt>
                      <dd>$1000.00</dd>
                    </div>
                  </dl>
                </section>
                <section id="quoteDetails" className="quoteDetails">
                  <dl>
                    <div>
                      <dt>Quote number</dt>
                      <dd>TTIC-HO3-1234567890</dd>
                    </div>
                  </dl>
                </section>
                <section id="propertyDetails" className="propertyDetails">
                  <dl>
                    <div>
                      <dt>Address</dt>
                      <dd>123 Main Street<small>Fort Lauderdale, FL, 12345</small></dd>
                    </div>
                    <div className="hide-for-phone-only">
                      <dt>Year built</dt>
                      <dd>2000</dd>
                    </div>
                  </dl>
                </section>
              </div>
            </aside>
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
