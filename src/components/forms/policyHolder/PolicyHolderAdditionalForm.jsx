import React, { PropTypes, Component } from 'react';
import { Form, FieldArray } from 'redux-form';
import localStorage from 'localStorage';
import PolicyHolderFormFields from '../policyHolder/PolicyHolderFormFields';

const renderPolicyHolder = ({ fields, InterestType, InterestTypeName, type,
   handleChange, meta: { touched, error } }) => (
     <div>
       {fields.length < type && <button type="button" className="btn btn-secondary" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>}
       {touched && error && <span>{error}</span>}
       {fields.map((ai, index) =>
         <div key={index}>
           <button
             type="button" className="btn btn-secondary"
             onClick={() => fields.remove(index)}
           >Remove {InterestTypeName}</button>
           <br /> <br />
           <h4>{InterestTypeName}</h4>
           <PolicyHolderFormFields handleChange={handleChange} name={`${`${InterestType}2`}`} />
         </div>,
    )}
     </div>
);

renderPolicyHolder.propTypes = {
  fields: PropTypes.any,// eslint-disable-line
  InterestType: PropTypes.any,// eslint-disable-line
  InterestTypeName: PropTypes.any,// eslint-disable-line
  handleChange: PropTypes.func,
  type: PropTypes.string,
  meta: PropTypes.any,// eslint-disable-line
};


class PolicyHolderAdditionalForm extends Component {
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
            stepName: 'askAdditionalPolicyHolder',
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
              id="PolicyHolderAdditional"
              onSubmit={handleSubmit(this.handleOnSubmit)}
              noValidate
            >
              <div className="workflow-content">

                <div className="detail-wrapper">
                  <h3 className="section-group-header"><i className="fa fa-users" /> Additional Policyholder</h3>

                  <div className="detail-group quote-details">
                    <FieldArray name="AdditionalPolicyHolder" component={renderPolicyHolder} InterestType={'AdditionalPolicyHolder'} InterestTypeName={'Additional Policy Holder'} type={1} /><hr />
                  </div>
                </div>
              </div>
              <div className="workflow-steps">
                <button
                  className="btn btn-primary"
                  type="submit"
                  form="PolicyHolderAdditional"
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

export default PolicyHolderAdditionalForm;
