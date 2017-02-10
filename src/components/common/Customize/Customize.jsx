import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import localStorage from 'localStorage';
import Footer from '../Footer';
import * as searchActions from '../../../actions/searchActions';

const Details = ({ details }) => (
  <div className="side-panel">
    {details.map((d, index) => {
      if (d.name.replace(/\s+/g, '') === 'AnnualPremium' || d.name.replace(/\s+/g, '') === 'CoverageA' || d.name.replace(/\s+/g, '') === 'CoverageB' || d.name.replace(/\s+/g, '') === 'CoverageC') {
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
    })}
  </div>);

Details.propTypes = {
  details: PropTypes.any, // eslint-disable-line
};

class Customize extends Component {
  static propTypes = {
    // workflowId: PropTypes.string,
    completeStep: PropTypes.func,
  }
  static contextTypes = {
    router: PropTypes.any,
  }

  componentWillMount() {}

  componentWillReceiveProps(newProps) {
    if ((!this.props.data.steps && newProps.data.steps) ||
      (!newProps.data.loading &&
        this.props.data.steps &&
        // newProps.data.steps &&
        this.props.data.steps.name !== newProps.data.steps.name
      )) {
      const { steps } = newProps.data;

      console.log('steps.details', steps.details);
      localStorage.setItem('details', JSON.stringify(steps.details));
    }
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
      data = await this.props.completeStep(buildSubmission('askToCustomizeDefaultQuote', [
        {
          key: 'shouldCustomizeQuote',
          value: 'No',
        },
      ]));
      console.log('ask to customize defuault quote submit', data);
      data = await this.props.completeStep(buildSubmission('showCustomizedQuoteAndContinue', []));
      console.log('show customize quote and cont submit', data);
      data = await this.props.completeStep(buildSubmission('saveAndSendEmail', [
        {
          key: 'shouldGeneratePdfAndEmail',
          value: 'No',
        },
      ]));
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
      <div className="workflow-content">
        <aside><Details details={details} /></aside>
        <section className="">
          <div className="fade-in">
            <div className="form-group survey-wrapper">CUSTOMIZE QUOTE GOES HERE</div>
            <div className="workflow-steps">
              <button className="btn btn-primary" onClick={this.submit}>Submit</button>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch),
});

export default(connect(null, mapDispatchToProps))(graphql(gql `
    query GetActiveStep($workflowId:ID!) {
        steps(id: $workflowId) {
            name
            details {
                name
                value
            }
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
    `)(Customize)));
