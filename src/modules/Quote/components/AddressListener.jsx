import React from 'react';
import { WhenFieldChanges } from '@exzeo/core-ui';
import _get from 'lodash/get';

const AddressListener = ({ config, formValues }) => {
  const { watchField, fieldPrefix, matchPrefix } = config.extendedProperties;
  return (
    <React.Fragment>
      {/* When field is true */}
      <WhenFieldChanges
        field={watchField}
        becomes={true}
        set={`${fieldPrefix}.address1`}
        to={_get(formValues, `${matchPrefix}.address1`, '')}
      />
      <WhenFieldChanges
        field={watchField}
        becomes={true}
        set={`${fieldPrefix}.address2`}
        to={_get(formValues, `${matchPrefix}.address2`, '')}
      />
      <WhenFieldChanges
        field={watchField}
        becomes={true}
        set={`${fieldPrefix}.city`}
        to={_get(formValues, `${matchPrefix}.city`, '')}
      />
      <WhenFieldChanges
        field={watchField}
        becomes={true}
        set={`${fieldPrefix}.state`}
        to={_get(formValues, `${matchPrefix}.state`, '')}
      />
      <WhenFieldChanges
        field={watchField}
        becomes={true}
        set={`${fieldPrefix}.zip`}
        to={_get(formValues, `${matchPrefix}.zip`, '')}
      />

      {/* When field is false */}
      <WhenFieldChanges
        field={watchField}
        becomes={false}
        set={`${fieldPrefix}.address1`}
        to=""
      />
      <WhenFieldChanges
        field={watchField}
        becomes={false}
        set={`${fieldPrefix}.address2`}
        to=""
      />
      <WhenFieldChanges
        field={watchField}
        becomes={false}
        set={`${fieldPrefix}.city`}
        to=""
      />
      <WhenFieldChanges
        field={watchField}
        becomes={false}
        set={`${fieldPrefix}.state`}
        to=""
      />
      <WhenFieldChanges
        field={watchField}
        becomes={false}
        set={`${fieldPrefix}.zip`}
        to=""
      />
    </React.Fragment>
  );
};

export default AddressListener;
