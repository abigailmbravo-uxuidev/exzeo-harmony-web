/* eslint-disable */
// TODO: REMOVE THIS PAGE
import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import {
  SelectField,
  SliderField,
  CheckField,
  TextField,
  RadioField,
} from '../_inputs';

class TestInputPage extends Component {

  onSubmit = (e) => {
    console.log(e);
  }

  render() {
    const {
      handleSubmit
    } = this.props;
    const formSubmit = handleSubmit(this.onSubmit);
    return (
      <Form className="fade-in" id="survey" onSubmit={formSubmit} noValidate>
        <div className="form-group survey-wrapper" role="group">
          <SliderField
            label="Slider Test?"
            name="sliderCheck"
            hint="Slider Check"
            max={100}
            min={10}
            step={10}
          />
          <CheckField
            label="Bool Test?"
            name="boolCheck"
            hint="Bool hint"
            isSwitch
          />
          <RadioField
            label="Radio Test?"
            name="radioCheck"
            hint="Radio Test"
            answers={[{
              answer: "one",
            },{
              answer: "two",
            }]}
            segmented
          />
          <SelectField
            label="Radio Test?"
            name="radioCheck"
            hint="Radio Test"
            answers={[{
              answer: "one",
            },{
              answer: "two",
            }]}
            segmented
          />
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="survey" disabled={false}>next</button>
        </div>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'survey', // a unique identifier for this form
  initialValues: {
    sliderCheck: 50,
    boolCheck: true,
    radioCheck: 'one',
  }
})(TestInputPage);
