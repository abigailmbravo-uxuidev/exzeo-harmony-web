import React, { Component, PropTypes } from 'react';
import localStorage from 'localStorage';
import FormGenerator from '../../form/FormGenerator';
import Footer from '../../common/Footer';

class UnderwritingForm extends Component {
  static propTypes = {
    data: PropTypes.any, // eslint-disable-line
    completeStep: PropTypes.func, // eslint-disable-line
    push: PropTypes.func,
    submitting: PropTypes.bool
  }

  state = {}

  handleOnSubmit = async (data) => {
    console.log('submitting');
    const workflowId = localStorage.getItem('newWorkflowId');
    try {
      const result = await this.props.completeStep({
        variables: {
          input: {
            workflowId,
            stepName: 'askUWAnswers',
            data
          }
        }
      });
      const activeLink = result.data.completeStep.link;
      this.props.push(`${activeLink}`);
    } catch (error) {
      // eslint-disable-next-line
      console.log('errors from graphql', error);
    }
  }


  render() {
    const { data, submitting } = this.props;
    return (
      <div className="workflow-content">
        <section>
          {data && data.steps && data.steps.questions &&
            <div className="fade-in">
              <FormGenerator
                name="Underwriting"
                questions={data.steps.questions}
                handleOnSubmit={this.handleOnSubmit}
              >
                <button className="btn btn-primary" type="submit" form="Underwriting" disabled={submitting}>
                  next
                </button>
              </FormGenerator>
              <Footer />
            </div>
          }
        </section>
      </div>
    );
  }
}

export default UnderwritingForm;
