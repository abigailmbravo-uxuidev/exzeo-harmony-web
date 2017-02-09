import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import * as searchActions from '../../../actions/searchActions';

const Details = ({ details }) => (
  <div className="detail-group quote-details">
    <h4><i className="fa fa-list" /> Quote Details</h4>
    <section className="display-element">
      {details.map((d, index) => {
        if (d.name.replace(/\s+/g, '') === 'AnnualPremium' ||
        d.name.replace(/\s+/g, '') === 'CoverageA' || d.name.replace(/\s+/g, '') === 'CoverageB' ||
         d.name.replace(/\s+/g, '') === 'CoverageC') {
          return (
            <dl key={`${index}d`}>
              <div>
                <dt>{d.name}</dt>
                <dd>{`$ ${d.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</dd>
              </div>
            </dl>
          );
        }
        return (
          <dl key={`${index}d`}>
            <div>
              <dt>{d.name}</dt>
              <dd>{d.value}</dd>
            </div>
          </dl>
        );
      })
  }
    </section>
  </div>);

Details.propTypes = {
    details: PropTypes.any,// eslint-disable-line
};

class Customize extends Component {
  static propTypes = {
    // workflowId: PropTypes.string,
    completeStep: PropTypes.func,
  }
  static contextTypes = {
    router: PropTypes.any,
  }

  componentWillMount() {

  }
  submit = async () => {
    console.log('SUBMITTING');
    const buildSubmission = (stepName, data) => ({
      variables: {
        input: {
          workflowId: localStorage.getItem('newWorkflowId'), // plugin workflow id or uncomment next line
          // workflowId: localStorage.getItem('newWorkflowId'),
          stepName,
          data,
        },
      },
    });
    try {
      let data;
      data = await this.props.completeStep(buildSubmission('askToCustomizeDefaultQuote', [{
        key: 'shouldCustomizeQuote',
        value: 'No',
      }]));
      console.log('ask to customize defuault quote submit', data);
      data = await this.props.completeStep(buildSubmission('showCustomizedQuoteAndContinue', []));
      console.log('show customize quote and cont submit', data);
      data = await this.props.completeStep(buildSubmission('saveAndSendEmail', [{
        key: 'shouldGeneratePdfAndEmail',
        value: 'No',
      }]));
      console.log('should generate pdf and email submit', data);
      data = await this.props.completeStep(buildSubmission('askAdditionalQuestions', []));
      console.log('ask additional questions submit', data);
      data = await this.props.completeStep(buildSubmission('askScheduleInspectionDates', []));
      console.log('Last data');
      this.context.router.push('thankyou');
    } catch (error) {
      console.log(error);
      this.context.router.push('error');
    }
  }
  render() {
    const details = JSON.parse(localStorage.getItem('details'));
    console.log(details);

    return (
      <div className="workflow-steps">
        <div className="form-group survey-wrapper">
          <section className="display-element demographics">
            <Details details={details} />
          </section>
          <button
            className="btn btn-primary"
            onClick={this.submit}
          >
          Submit
        </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});


export default (connect(null, mapDispatchToProps))(graphql(gql `
    query GetActiveStep($workflowId:ID!) {
      steps(id: $workflowId) {
          name
          details {
            name
            value
          }
          showDetail
          type
          completedSteps
      }
    }`, { options: { variables: { workflowId: localStorage.getItem('newWorkflowId') } } })(graphql(gql `
      mutation CompleteStep($input:CompleteStepInput) {
        completeStep(input:$input) {
          name
          completedSteps
        }
      }
    `, { name: 'completeStep' })(Customize)));
