import React from 'react';

const WorkflowBanner = ({ content }) => {
  return (
    <div className={content.className}>
      <div className={`icon ${content.icon}`} />
      <h3>
        {content.title}
        {' | '}
        <span>{content.subTitle}</span>
      </h3>
    </div>
  );
};

export default WorkflowBanner;
