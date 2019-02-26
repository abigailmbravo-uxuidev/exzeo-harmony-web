import React from 'react';
import { connect } from 'react-redux';
import { Switch } from '@exzeo/core-ui';


export const handleOnSubmit = async (data, dispatch, props) => {
  await props.updateQuote({ quoteNumber: props.quote.quoteNumber });
  props.history.replace('additionalInterests');
};

export const Assumptions = ({ handleSubmit, fieldValues, isLoading }) => {
  return (
    <div className="route-content">
      <div className="scroll">
        <div className="form-group survey-wrapper">
          <h3 className="section-group-header">All properties will be inspected within 30 days of the effective
            date.</h3>
          <p>Please be aware that assumptions to this property have been made in order to provide you this quote. If any
            of the below assumptions are not correct, please contact us before continuing.</p>
          <ul>
            <li>Properties with pools (or similar structures), are to be completely fenced, walled, or screened. There
              are no slides or diving boards.
            </li>
            <li>Properties located in Special Flood Hazard Areas, as defined by the National Flood Insurance Program
              maintain a separate flood policy.
            </li>
            <li>Property is not in state of disrepair or having existing unrepaired damage.</li>
            <li>Roof covering does not exceed the age as defined below
              <ul>
                <li>Roof cannot be over 20 years old if Asphalt, Fiberglass, Composition/Wood Shake Shingles; Built-up
                  Tar and Gravel; or other roof covering types not included below
                </li>
                <li>Roof cannot be over 40 years old if Tile, Slate, Concrete, or Metal</li>
              </ul>
            </li>
          </ul>
          <Switch
            name="confirmAssumptions"
            styleName="confirm"
            label="Confirmed"
            autoFocus
            input={{}}
            meta={{}}
          />
        </div>
        <div className="workflow-steps">
          <button
            className="btn btn-primary"
            type="submit"
            form="Assumptions"
            disabled={!(fieldValues || {}).confirmAssumptions || isLoading}
            tabIndex="0"
            data-test="submit"
          >Next
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  quote: state.quoteState.quote
});

export default connect(mapStateToProps)(Assumptions);
