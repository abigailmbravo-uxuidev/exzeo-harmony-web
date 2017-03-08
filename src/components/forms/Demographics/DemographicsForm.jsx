import React, { PropTypes, Component } from 'react';
import { Form } from 'redux-form';
import localStorage from 'localStorage';
import FieldGenerator from '../../form/FieldGenerator';
import Footer from '../../common/Footer';

class DemographicsForm extends Component {
  static propTypes = {
    data: PropTypes.any, // eslint-disable-line
    fieldValues: PropTypes.any, // eslint-disable-line
    initialValues: PropTypes.any, // eslint-disable-line
    completeStep: PropTypes.func,
    initialize: PropTypes.func,
    push: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool
  }

  static defaultProps = {
    data: {},
    fieldValues: {},
    submitting: false
  }

  state = {
    questions: []
  }

  componentWillMount() {
    const { initialize, initialValues } = this.props;
    if (initialize && initialValues) {
      this.props.initialize(this.props.initialValues);
    }
  }

  handleOnSubmit = async (data) => {
    const workflowId = localStorage.getItem('newWorkflowId');

    try {
      const result = await this.props.completeStep({
        variables: {
          input: {
            workflowId,
            stepName: 'askAdditionalCustomerData',
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
    const { data, handleSubmit, fieldValues, submitting } = this.props;

    return (
      <div className="workflow-content">
        <section>
          {data && data.steps && data.steps.questions &&
            <div className="fade-in">
              <Form
                className="fade-in"
                id="Demographics"
                onSubmit={handleSubmit(this.handleOnSubmit)}
                noValidate
              >
                <div className="form-group survey-wrapper" role="group">
                  {data.steps.questions.map((question, index) =>
                    <FieldGenerator
                      data={this.state.quoteInfo}
                      question={question}
                      values={fieldValues}
                      key={index}
                    />
                  )}
                  <div className="form-group agentID" role="group">
                    <label htmlFor="agencyID">Agent</label>
                    <select name="agencyID">
                      <option value="60000">Adam Doe</option>
                      <option value="60001">Betsy Doe</option>
                      <option value="60002">Cathy Doe</option>
                      <option value="60003">Daniel Doe</option>
                      <option value="60004">Ethan Doe</option>
                      <option value="60005">Frank Doe</option>
                      <option value="60006">Gail Doe</option>
                      <option value="60007">Helen Doe</option>
                    </select>
                  </div>
                </div>
                <div className="workflow-steps">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    form="Demographics"
                    disabled={submitting}
                  >
                    next
                  </button>
                </div>
              </Form>
              <Footer />
            </div>
          }
        </section>
      </div>
    );
  }
}

export default DemographicsForm;
