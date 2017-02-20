// Test page for components
/* eslint max-len:0, jsx-a11y/label-has-for:0 */
import React, { Component } from 'react';
import Survey from '../components/question/Survey';
import './TestPage.css';
// Uncomment and change the surveyQuestions object name below
// import surveyQuestions from './CoverageQuestions';

const surveyQuestions = [
  {
    name: 'dep-test1',
    question: 'Disabled test 1',
    answerType: 'bool',
    defaultValue: false,
  },
];

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
                questions[question.name][condition.type] = !(questions[condition.dependency].value === condition.trigger);
              }
              break;
            case 'greaterThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] = !(questions[condition.dependency].value > condition.trigger);
              }
              break;
            case 'lessThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] = !(questions[condition.dependency].value < condition.trigger);
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
                questions[question.name][condition.type] = !(questions[condition.dependency].value === condition.trigger);
              }
              break;
            case 'greaterThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] = !(questions[condition.dependency].value > condition.trigger);
              }
              break;
            case 'lessThan':
              if (!questions[question.name][condition.type]) {
                questions[question.name][condition.type] = !(questions[condition.dependency].value < condition.trigger);
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
      answers.push({ key, value: this.state.questions[key] });
    });
    return answers;
  }
  handleSubmit = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    console.log(this.state.questions); // eslint-disable-line
  }
  render() {
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <div className="workflow-content">
            <section>
              <Survey questions={surveyQuestions} handleChange={this.handleChange} handleOnSubmit={this.handleSubmit} answers={this.state.questions} />
            </section>

            {/* DEMOGRAPHICS COMPONENT*/}
            <section>
              <form className="fade-in" id="survey">
                <div className="form-group survey-wrapper" role="group">
                  <div className="form-group  FirstName">
                    <label>Policyholder First Name</label><input type="text" name="FirstName" value="" /></div>
                  <div className="form-group  LastName">
                    <label>Policyholder Last Name</label><input type="text" name="LastName" value="" /></div>
                  <div className="form-group  EamilAddress">
                    <label>Policyholder Email Address</label><input type="email" name="EmailAddress" value="" /></div>
                  <div className="form-group  phoneNumber">
                    <label>Policyholder Contact Phone</label><input type="tel" name="phoneNumber" value="" /></div>
                  <div className="form-group  effectiveDate">
                    <label>Policy Effective Date</label><input type="date" name="effectiveDate" value="" /></div>
                </div>
              </form>
            </section>
            <div className="workflow-steps">
              <button className="btn btn-primary" type="submit" form="survey">next</button>
            </div>
            {/* END DEMOGRAPHICS COMPONENT*/}

            {/* UW QUESTIONS COMPONENT*/}
            <section>
              <form className="fade-in" id="survey">
                <div className="form-group survey-wrapper" role="group">

                  <div className="form-group segmented monthsOccupied  " role="group">
                    <label className="group-label label-segmented">How many months a year does the owner live in the home?</label>
                    <div className="segmented-answer-wrapper">
                      <div className="radio-column-4">
                        <label className="label-segmented" htmlFor="0"><input type="radio" value="0-3" name="monthsOccupied" />
                          <span>0-3</span>
                        </label>
                      </div>
                      <div className="radio-column-4">
                        <label className="label-segmented" htmlFor="1"><input type="radio" value="4-6" name="monthsOccupied" />
                          <span>4-6</span>
                        </label>
                      </div>
                      <div className="radio-column-4">
                        <label className="label-segmented" htmlFor="2"><input type="radio" value="7-9" name="monthsOccupied" />
                          <span>7-9</span>
                        </label>
                      </div>
                      <div className="radio-column-4">
                        <label className="label-segmented" htmlFor="3"><input type="radio" value="10+" name="monthsOccupied" />
                          <span>10+</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group segmented floodCoverage  " role="group">
                    <label className="group-label label-segmented">Does this property have a separate insurance policy covering flood losses?</label>
                    <div className="segmented-answer-wrapper">
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="0"><input type="radio" value="Yes" name="floodCoverage" />
                          <span>Yes</span>
                        </label>
                      </div>
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="1"><input type="radio" value="No" name="floodCoverage" />
                          <span>No</span>
                        </label>
                      </div>
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="2"><input type="radio" value="Unsure" name="floodCoverage" />
                          <span>Unsure</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group segmented rented  " role="group">
                    <label className="group-label label-segmented">Is the home or any structures on the property ever rented?</label>
                    <div className="segmented-answer-wrapper">
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="0"><input type="radio" value="Yes" name="rented" />
                          <span>Yes</span>
                        </label>
                      </div>
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="1"><input type="radio" value="Occasionally" name="rented" />
                          <span>Occasionally</span>
                        </label>
                      </div>
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="2"><input type="radio" value="Never" name="rented" />
                          <span>Never</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group segmented fourPointUpdates  " role="group">
                    <label className="group-label label-segmented">Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?</label>
                    <div className="segmented-answer-wrapper">
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="0"><input type="radio" value="Yes" name="fourPointUpdates" />
                          <span>Yes</span>
                        </label>
                      </div>
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="1"><input type="radio" value="No" name="fourPointUpdates" />
                          <span>No</span>
                        </label>
                      </div>
                      <div className="radio-column-3">
                        <label className="label-segmented" htmlFor="2"><input type="radio" value="Unknown" name="fourPointUpdates" />
                          <span>Unknown</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group segmented previousClaims  " role="group">
                    <label className="group-label label-segmented">How many claims in the past 5 years?</label>
                    <div className="segmented-answer-wrapper">
                      <div className="radio-column-5">
                        <label className="label-segmented" htmlFor="0"><input type="radio" value="0" name="previousClaims" />
                          <span>0</span>
                        </label>
                      </div>
                      <div className="radio-column-5">
                        <label className="label-segmented" htmlFor="1"><input type="radio" value="1" name="previousClaims" />
                          <span>1</span>
                        </label>
                      </div>
                      <div className="radio-column-5">
                        <label className="label-segmented" htmlFor="2"><input type="radio" value="2" name="previousClaims" />
                          <span>2</span>
                        </label>
                      </div>
                      <div className="radio-column-5">
                        <label className="label-segmented" htmlFor="3"><input type="radio" value="3+" name="previousClaims" />
                          <span>3+</span>
                        </label>
                      </div>
                      <div className="radio-column-5">
                        <label className="label-segmented" htmlFor="4"><input type="radio" value="Unknown" name="previousClaims" />
                          <span>Unknown</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
            <div className="workflow-steps">
              <button className="btn btn-primary" type="submit" form="survey">next</button>
            </div>
            {/* END UW QUESTIONS COMPONENT*/}

            {/* MAILING ADDRESS COMPONENT*/}
            <section>
              <form className="fade-in" id="MailingAddress">
                <div className="form-group survey-wrapper" role="group">
                  <div className="form-group  CompanyName">
                    <label>Company Name</label><input type="text" name="CompanyName" value="" /></div>
                  <div className="form-group  MailingAddress">
                    <label>Mailing Address</label><input type="text" name="MailingAddress" value="" /></div>
                  <div className="form-group  MailingAddress2">
                    <label>Mailing Address 2</label><input type="text" name="MailingAddress2" value="" /></div>
                  <div className="form-group  City">
                    <label>City</label><input type="text" name="City" value="" /></div>
                  <div className="form-group  State">
                    <label>State</label>
                    <select name="State" value="">
                      <option value="al">Alabama</option>
                      <option value="ak">Alaska</option>
                      <option value="az">Arizona</option>
                      <option value="ar">Arkansas</option>
                      <option value="ca">California</option>
                    </select>
                  </div>
                  <div className="form-group  Zip">
                    <label>City</label><input type="number" name="Zip" value="" /></div>
                  <div className="form-group  LoanNumber">
                    <label>Loan Number</label><input type="text" name="LoanNumber" value="" /></div>
                </div>
                <div className="form-group  Mortgage">
                  <label>MortgageType</label>
                  <select name="MortgageType" value="">
                    <option value="primary">1st Mortgage</option>
                    <option value="secondary">2nd Mortgage</option>
                  </select>
                </div>
              </form>
            </section>
            {/* END MAILING ADDRESS COMPONENT*/}

          </div>
        </div>
      </div>
    );
  }
}

export default TestPage;
