/* eslint-disable */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector, Field } from 'redux-form';
import Footer from '../common/Footer';
import PolicyHolder from '../common/policyHolder/PolicyHolder';

const quoteInfo = {
  coverageLimits: {
    personalProperty: {
      // format: 'Currency',
      // amount: 238000,
      format: 'Percentage',
      amount: 50,
    },
    otherStructures: {
      format: 'Percentage',
      amount: 10,
    },
    medicalPayments: {
      format: 'Currency',
      amount: 2000,
    },
    moldProperty: {
      format: 'Currency',
      amount: 10000,
    },
    ordinanceOrLaw: {
      format: 'Percentage',
      amount: 25,
    },
    lossOfUse: {
      format: 'Percentage',
      amount: 10,
    },
    personalLiability: {
      format: 'Currency',
      amount: 100000,
    },
    dwelling: {
      format: 'Currency',
      maxAmount: 618800,
      amount: 476000,
      minAmount: 428400,
    },
    moldLiability: {
      format: 'Currency',
      amount: 50000,
    },
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      answer: false,
    },
    propertyIncidentalOccupanciesOtherStructures: {
      answer: false,
    },
    liabilityIncidentalOccupancies: {
      answer: false,
    },
    personalPropertyReplacementCost: {
      answer: false,
    },
    propertyIncidentalOccupanciesMainDwelling: {
      answer: false,
    },
  },
  deductibles: {
    sinkhole: {
      format: 'Percentage',
      amount: 10,
    },
    hurricane: {
      format: 'Percentage',
      amount: 10,
    },
    allOtherPerils: {
      format: 'Currency',
      amount: 2500,
    },
  },
};

class Customize extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    updated: false,
    dwellingAmount: quoteInfo.coverageLimits.dwelling.amount,
    otherStructuresAmount: quoteInfo.coverageLimits.otherStructures.amount,
    personalPropertyReplacementCostCoverage: false,
    personalPropertyAmount: quoteInfo.coverageLimits.personalProperty.amount,
    personalLiability: quoteInfo.coverageLimits.personalLiability.amount,
    moldProperty: quoteInfo.coverageLimits.moldProperty.amount,
    moldLiability: quoteInfo.coverageLimits.moldLiability.amount,
    lossOfUse: quoteInfo.coverageLimits.lossOfUse.amount,
    ordinanceOrLaw: quoteInfo.coverageLimits.ordinanceOrLaw.amount,
    propertyIncidentalOccupancies: 'None',
    sinkholeCoverage: quoteInfo.coverageOptions.sinkholePerilCoverage.answer,
    allOtherPerils: quoteInfo.deductibles.allOtherPerils.amount,
    hurricane: quoteInfo.deductibles.hurricane.amount,
  }

  handleChange = (event) => {
    const { state } = this;
    state[event.target.name] = event.target.value;
    state.updated = true;
    this.setState(state);
  }

  handleOnSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    const { state } = this;
    if (state.updated) {
      // Do two mutations
      state.updated = false;
      this.setState(state);
    } else {
      this.context.router.push('/workflow/shareQuote');
    }
  }

  render() {
    const {
      state,
      formName,
      effectiveDate,
      styleName,
      handleSubmit,
      handleChange,
      pristine,
      reset,
      submitting,
      error,
      invalid,
    } = this.props;
    return (
      <Form
        className={`fade-in ${styleName}`}
        id="Customize"
        onSubmit={handleSubmit(this.handleOnSubmit)}
        noValidate
      >

        <div className="workflow-steps">
          <button
            className="btn btn-primary"
            type="submit"
            form="Customize"
          >
            {this.state.updated ? 'update' : 'save'}
          </button>
        </div>
        <Footer />
      </Form>
    );
  }
}

const CustomizeQuote = reduxForm({
  form: 'Customize',
})(Customize);

const selector = formValueSelector('Customize'); // <-- same as form name

export default connect(
  state => ({
    initialValues: {
    },
  }),
)(CustomizeQuote);
