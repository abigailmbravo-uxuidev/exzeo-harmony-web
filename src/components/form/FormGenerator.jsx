import React, { Component, PropTypes } from 'react';
import { reduxForm, Form } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import FieldGenerator from './FieldGenerator';

class FormGenerator extends Component {
  componentWillMount = () => {
    const { initialValues, initialize } = this.props;
    if (initialValues) {
      initialize(initialValues);
    }
  }
  render() {
    const {
      children,
      data,
      fieldValues,
      form,
      questions,
      handleSubmit,
      handleOnSubmit,
      styleName,
    } = this.props;
    return (
      <Form
        className={classNames('fade-in', styleName)}
        id={form}
        onSubmit={handleSubmit(handleOnSubmit)}
        noValidate
      >
        <div className="form-group survey-wrapper" role="group">
          {questions && questions.map((question, index) => (
            <FieldGenerator
              key={index}
              question={question}
              values={fieldValues}
              data={data}
            />
          ))}
        </div>
        <div className="workflow-steps">
          {children}
        </div>
      </Form>
    );
  }
}


FormGenerator.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  data: PropTypes.any, // eslint-disable-line
  fieldValues: PropTypes.any, // eslint-disable-line
  form: PropTypes.string,
  initialValues: PropTypes.any, // eslint-disable-line
  initialize: PropTypes.func,
  questions: PropTypes.any, // eslint-disable-line
  handleSubmit: PropTypes.func,
  handleOnSubmit: PropTypes.func,
  styleName: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
  form: ownProps.name,
  fieldValues: _.get(state.form, `${ownProps.name}.values`, {}),
});

export default compose(
    connect(mapStateToProps),
    reduxForm({})
)(FormGenerator);
