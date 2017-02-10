/* eslint react/forbid-prop-types:0, jsx-a11y/no-static-element-interactions:0,
 react/no-direct-mutation-state:0 */
import React, { Component, PropTypes } from 'react';
import Question from '../common/question/Question';

const answerType = {
  answerType: 'radio',
  answers: [{
    answer: 'radio',
  }, {
    answer: 'bool',
  }, {
    answer: 'list',
  }, {
    answer: 'range',
  }],
};

class ContentManager extends Component {
  state = {
    newAnswer: '',
  }
  updateNewAnswer = (event) => {
    this.state.newAnswer = event.target.value;
    this.setState(this.state);
  }
  addAnswer = (event) => {
    this.props.addAnswer(this.state.answer, event.target.name);
  }
  render() {
    const { addQuestion, addAnswer, questions, toggleEdit, updateQuestions } = this.props;
    return (
      <div className="content">
        <div className="cms-header">
          <h3>Questions</h3>
          <button className="btn-success btn-round" onClick={() => { addQuestion(); }}><i className="fa fa-plus" /></button>
        </div>
        <div className="cms-question-wrapper">
          {
          questions.map((q, index) => (
            <div key={index} className={q.editing ? ' editing-question' : null}>
              <h4 onClick={() => { toggleEdit(q.name); }}>{q.name} <span>Edit {q.editing ? <i className="fa fa-plus" /> : <i className="fa fa-minus" /> }</span></h4>

              <label htmlFor="question">Question:</label>
              <input onChange={(event) => { updateQuestions(event, q.name); }} name="question" id="question" placeholder="question" />
              <label htmlFor="description">Description:</label>
              <input onChange={(event) => { updateQuestions(event, q.name); }} name="description" id="description" placeholder="description" />
              <label htmlFor="value">Value:</label>
              <input onChange={(event) => { updateQuestions(event, q.name); }} name="value" id="value" placeholder="value" />
              <Question
                question={answerType}
                handleChange={(e) => {
                  updateQuestions({ target: { value: e.target.value, name: 'answerType' } }, q.name);
                }}
              />
              <ul>
                {
                  q.answers ? q.answers.map((a, i) => (
                    <li key={i}>{a.answer}</li>
                  )) : null
                }
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addAnswer(this.state.newAnswer, q.name);
                    this.state.newAnswer = '';
                    this.setState(this.state);
                  }}
                >
                  <input onChange={this.updateNewAnswer} value={this.state.newAnswer} />
                </form>
              </ul>
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}

ContentManager.propTypes = {
  questions: PropTypes.any,
  addQuestion: PropTypes.any,
  updateQuestions: PropTypes.any,
  toggleEdit: PropTypes.any,
  addAnswer: PropTypes.any,
};

export default ContentManager;
