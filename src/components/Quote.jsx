import React from 'react';
import Workflow from './workflows/Workflow';

const Step1 = () => <h1 className="workflow-active-step">Step 1</h1>;
const Step2 = () => <h1 className="workflow-active-step">Step 2</h1>;

const steps = [{
  name: 'Property address',
  icon: 'fa-map-marker',
  url: '/property-address',
  status: 'selected',
  required: true,
  component: <Step1 />,
}, {
  name: 'Undewriting Q & A',
  icon: 'fa-file-text-o',
  url: '/underwriting',
  status: 'disabled',
  required: true,
  component: <Step2 />,
}, {
  name: 'Demographics',
  icon: 'fa fa-user',
  url: '/demographics',
  status: 'disabled',
  required: true,
  component: <Step1 />,
}, {
  name: 'Coverage',
  icon: 'fa-umbrella',
  url: '/coverage',
  status: 'disabled',
  required: true,
  component: <Step2 />,
}, {
  name: 'Share',
  icon: 'fa-share-alt',
  url: '/share',
  status: 'disabled',
  required: true,
  component: <Step1 />,
}, {
  name: 'Billing Info',
  icon: 'fa-dollar',
  url: '/billing',
  status: 'disabled',
  required: true,
  component: <Step2 />,
}, {
  name: 'Verify & write',
  icon: 'fa-check-square',
  url: '/verify',
  status: 'disabled',
  required: true,
  component: <Step1 />,
}];

const Quote = () => {
  return (
    <Workflow steps={steps} />
  );
};

export default Quote;
