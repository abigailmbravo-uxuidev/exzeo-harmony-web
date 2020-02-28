import React from 'react';

const FancyExternalLink = ({
  productIcon,
  url,
  title,
  description,
  linkIcon
}) => (
  <li>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-labelledby="fancy-link-header"
    >
      <div className={productIcon} />
      <div className="link-details">
        <h5 id="fancy-link-header">{title}</h5>
        <p>{description}</p>
      </div>
      <div className="link-icon">
        <span className={linkIcon} />
      </div>
    </a>
  </li>
);

export default FancyExternalLink;
