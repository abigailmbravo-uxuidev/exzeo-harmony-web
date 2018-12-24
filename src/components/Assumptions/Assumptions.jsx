import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';

import { updateQuote } from '../../actions/quoteState.actions';
import Footer from '../Common/Footer';
import { CheckField } from '../Form/inputs';

export const handleOnSubmit = async (data, dispatch, props) => {
  await props.updateQuote({ quoteNumber: props.quote.quoteNumber });
  props.history.push('additionalInterests');
};

export const Assumptions = (props) => {
  const { handleSubmit, fieldValues, isLoading } = props;
  return (
    <div className="route-content">
      <Form id="Assumptions" onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper">
            <h3 className="section-group-header">All properties will be inspected within 30 days of the effective date.</h3>
            <p>Please be aware that assumptions to this property have been made in order to provide you this quote. If any of the below assumptions are not correct, please contact us before continuing.</p>
            <ul>
              <li>Properties with pools (or similar structures), are to be completely fenced, walled, or screened. There are no slides or diving boards.</li>
              <li>Properties located in Special Flood Hazard Areas, as defined by the National Flood Insurance Program maintain a separate flood policy.</li>
              <li>Property is not in state of disrepair or having existing unrepaired damage.</li>
              <li>Roof covering does not exceed the age as defined below
                <ul>
                  <li>Roof cannot be over 20 years old if Asphalt, Fiberglass, Composition/Wood Shake Shingles; Built-up Tar and Gravel; or other roof covering types not included below</li>
                  <li>Roof cannot be over 40 years old if Tile, Slate, Concrete, or Metal</li>
                </ul>
              </li>
            </ul>
            <CheckField styleName="confirm" name="confirmAssumptions" label="Confirmed" isSwitch autoFocus tabIndex={'0'} />
          </div>
          <div className="workflow-steps">
            <button className="btn btn-primary" type="submit" form="Assumptions" disabled={!fieldValues.confirmAssumptions || isLoading} tabIndex={'0'}>Next</button>
          </div>
          <Footer />
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  fieldValues: _.get(state.form, 'Assumptions.values', {}),
  quote: state.quoteState.quote
});

export default connect(mapStateToProps, { 
  updateQuote
  })(reduxForm({
  form: 'Assumptions'
})(Assumptions));
