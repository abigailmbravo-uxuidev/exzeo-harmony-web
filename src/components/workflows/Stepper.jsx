import React from 'react';
let steps = [
    {
        name: 'Property address',
        icon: 'fa-map-marker',
        url: '/property-address',
        status: 'selected',
        required: true
    },
    {
        name: 'Undewriting Q & A',
        icon: 'fa-file-text-o',
        url: '/underwriting',
        status: 'disabled',
        required: true

    },
    {
        name: 'Demographics',
        icon: 'fa fa-user',
        url: '/demographics',
        status: 'disabled',
        required: true

    },
    {
        name: 'Coverage',
        icon: 'fa-umbrella',
        url: '/coverage',
        status: 'disabled',
        required: true

    },
    {
        name: 'Share',
        icon: 'fa-share-alt',
        url: '/share',
        status: 'disabled',
        required: true
    },
    {
        name: 'Billing Info',
        icon: 'fa-dollar',
        url: '/billing',
        status: 'disabled',
        required: true
    },
    {
        name: 'Verify & write',
        icon: 'fa-check-square',
        url: '/verify',
        status: 'disabled',
        required: true
    },
];
const Step = ({name, icon, url, status, required}) => (
    <a href={url} className={status}><i className={"fa " + icon}></i><span>{name}</span></a>
);

const Stepper = () => {

    console.log(steps);
    return (
        <nav>
            {
                steps && steps.map((step, index) => {
                    return <Step name={step.name} icon={step.icon} url={step.url} status={step.status} required={step.required}/>
                })
            }
        </nav>
    );
};

export default Stepper;