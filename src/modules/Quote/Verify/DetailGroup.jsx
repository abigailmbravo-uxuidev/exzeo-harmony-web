import React from 'react';
import classNames from 'classnames';
import { Switch, noop } from '@exzeo/core-ui';

export const DetailGroup = ({ children, header, detailClass, switchName, switchValue, switchOnChange, handleEditClick }) => {
  return (
    <div className={classNames('detail-group', detailClass)}>
      <h3 className="section-group-header">
        <i className="fa fa-map-marker"/> {header}
        <span data-test={detailClass} className="edit-btn" onClick={handleEditClick}>
        <i className="fa fa-pencil"/> Edit
      </span>
      </h3>
      {children}
      {switchName && <Switch
        input={{
          name: switchName,
          value: switchValue,
          onChange: (value) => switchOnChange(value),
          onFocus: noop,
          onBlur: noop
        }}
        styleName="switch"
        customClass="verification"
        label="Verified"
      />
      }
    </div>
  );
};

export default DetailGroup;
