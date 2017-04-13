import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const AdditionalInterestPopup = ({ submitting, handleSubmit, primaryButtonHandler, secondaryButtonHandler }) => (
  <div className="email-modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <div className="card card-additional-interest">
          <Form className={'fade-in'} id="AddAdditionalInterest" onSubmit={handleSubmit(primaryButtonHandler)} noValidate>
            <div className="card-header">
              <h4><i className="fa      DYNAMIC-AI-TYPE-HERE     " /> DYNAMIC AI TYPE HERE</h4>
            </div>
            <div className="card-block">
              <TextField type="text" name={'name1'} value styleName={'name'} label={'Name 1'} validations={['required']} />
              <TextField type="text" name={'name2'} value styleName={'name'} label={'Name 2'} />
              <TextField type="text" name={'address1'} styleName={'address'} label={'Address 1'} validations={['required']} />
              <TextField type="text" name={'address2'} styleName={'address'} label={'Address 2'} />
              <TextField type="text" name={'city'} styleName={'city'} label={'City'} validations={['required']} />
              <TextField type="text" name={'state'} styleName={'state'} label={'State'} validations={['required']} />
              <TextField type="text" name={'zip'} styleName={'zip'} label={'Zip'} validations={['required']} />
            </div>
            <div className="card-footer">
              <button className="btn btn-secondary" onClick={secondaryButtonHandler} type="button">Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={submitting}>Save &amp; Add</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
);

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default AdditionalInterestPopup;
