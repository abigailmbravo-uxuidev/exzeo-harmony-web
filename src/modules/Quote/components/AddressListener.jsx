import React from 'react';
import classNames from 'classnames';
import { OnChangeListener, Field, Input, Switch, validation } from '@exzeo/core-ui';
import _get from 'lodash/get';

const AddressListener = ({ config, formValues, size }) => {
  const { watchField, fieldPrefix, matchPrefix } = config.extendedProperties;
  return (
    <section className={classNames('address-component', size)}>
      {watchField &&
        <Field name={watchField}>
          {({ input, meta }) => (
            <Switch
              input={input}
              meta={meta}
              label="Is the mailing address the same as the property address?"
              customClass="switch"
              dataTest={watchField}
            />
          )}
        </Field>
      }

      <Field name={`${fieldPrefix}.address1`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address1"
            styleName="input"
            dataTest={`${fieldPrefix}.address1`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.address2`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address2"
            styleName="input"
            dataTest={`${fieldPrefix}.address2`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="City"
            size="view-col-9"
            styleName="input"
            dataTest={`${fieldPrefix}.city`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.state`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="State"
            size="view-col-1"
            styleName="input"
            dataTest={`${fieldPrefix}.state`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.zip`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Zip"
            size="view-col-2"
            styleName="input"
            dataTest={`${fieldPrefix}.zip`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.address1`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {(value) => {
              if (value) {
                onChange(_get(formValues, `${matchPrefix}.address1`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.address2`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {(value) => {
              if (value) {
                onChange(_get(formValues, `${matchPrefix}.address2`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {(value) => {
              if (value) {
                onChange(_get(formValues, `${matchPrefix}.city`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.state`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {(value) => {
              if (value) {
                onChange(_get(formValues, `${matchPrefix}.state`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>

      <Field name={`${fieldPrefix}.zip`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {(value) => {
              if (value) {
                onChange(_get(formValues, `${matchPrefix}.zip`, ''));
              } else {
                onChange('');
              }
            }}
          </OnChangeListener>
        )}
      </Field>
    </section>
  );
};

export default AddressListener;
