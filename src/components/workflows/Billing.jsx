import React, { Component } from 'react';

class Billing extends Component {
  state = {
    // Some state will go here
  };
  render() {
    return (
      <div>
        <div className="form-group  BillTo">
          <label>Bill To</label>
          <select name="BillTo" value="">
            <option value="ph1">Policy Holder1</option>
            <option value="mh1">Bank of America</option>
            <option value="mh2">Capital One</option>
          </select>
        </div>
        <div className="form-group segmented BillType  " role="group">
          <label className="group-label label-segmented">Bill Plan</label>
          <div className="segmented-answer-wrapper">
            <div className="radio-column-3">
              <label className="label-segmented" for="0"><input type="radio" value="A" name="Annual"/>
                <span>Annual</span>
              </label>
            </div>
            <div className="radio-column-3">
              <label className="label-segmented" for="1"><input type="radio" value="S" name="semiannual"/>
                <span>Semi-Annual</span>
              </label>
            </div>
            <div className="radio-column-3">
              <label className="label-segmented" for="2"><input type="radio" value="Q" name="quaterly"/>
                <span>Quaterly</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Billing;
