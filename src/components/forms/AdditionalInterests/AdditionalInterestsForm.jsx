
import React, { PropTypes, Component } from 'react';
import { Form, FieldArray } from 'redux-form';
import localStorage from 'localStorage';
import Interest from './Interest';

class AdditionalInterestsForm extends Component {
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
    //  this.props.initialize(this.props.initialValues);
    }
  }

  handleOnSubmit = async (data) => {
    const workflowId = localStorage.getItem('newWorkflowId');

    try {
      const result = await this.props.completeStep({
        variables: {
          input: {
            workflowId,
            stepName: 'askAdditionalInterests',
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
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="workflow-content">
        <section>
          <div className="fade-in">

            <Form
              className="fade-in"
              id="AdditionalInterests"
              onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="workflow-content">

                <div className="detail-wrapper">
                  <h3 className="section-group-header"><i className="fa fa-users" /> Additional Interests</h3>

                  <div className="detail-group quote-details">
                    <FieldArray name="Mortgagee" component={Interest} InterestType={'Mortgagee'} InterestTypeName={'Mortgagee'} limit={2} /><hr />
                  </div>
                  <div className="detail-group quote-details">
                    <FieldArray name="Lienholder" component={Interest} InterestType={'Lienholder'} InterestTypeName={'Lienholder'} limit={2} /><hr />
                  </div>
                  <div className="detail-group quote-details">
                    <FieldArray name="AdditionalInterest" component={Interest} InterestType={'AdditionalInterest'} InterestTypeName={'Additional Interest'} limit={2} /><hr />
                  </div>
                  <div className="detail-group quote-details">
                    <FieldArray name="AdditionalInsured" component={Interest} InterestType={'AdditionalInsured'} InterestTypeName={'Additional Insured'} limit={2} /><hr />
                  </div>
                  <div className="detail-group quote-details">
                    <FieldArray name="BillPayer" component={Interest} InterestType={'BillPayer'} InterestTypeName={'Bill Payer'} limit={1} /><hr />
                  </div>
                </div>
              </div>
              <div className="workflow-steps">
                <button
                  className="btn btn-primary"
                  type="submit"
                  form="AdditionalInterests"
                  disabled={submitting}
                >
                    next
                  </button>
              </div>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

export default AdditionalInterestsForm;
