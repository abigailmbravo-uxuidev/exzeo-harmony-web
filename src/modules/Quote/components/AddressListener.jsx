import React from 'react';
import classNames from 'classnames';
import { OnChangeListener, WhenFieldChanges, Field, Input, Switch } from '@exzeo/core-ui';
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
            />
          )}
        </Field>
      }

      <Field name={`${fieldPrefix}.address1`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address1"
            styleName="input"

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
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="City"
            size="view-col-9"
            styleName="input"
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.state`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="State"
            size="view-col-1"
            styleName="input"
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.zip`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Zip"
            size="view-col-2"
            styleName="input"
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.address1`} subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name={watchField}>
            {(value) => {
              if (value) {
                onChange(_get(formValues, `${matchPrefix}.address1`, ''))

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
                onChange(_get(formValues, `${matchPrefix}.address2`, ''))

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
                onChange(_get(formValues, `${matchPrefix}.city`, ''))

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
                onChange(_get(formValues, `${matchPrefix}.state`, ''))

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
                onChange(_get(formValues, `${matchPrefix}.zip`, ''))

              }
            }}
          </OnChangeListener>
        )}
      </Field>

      {/*<Field name={watchField} subscription={{ active: true }}>*/}
        {/*{({ input: { onChange }, meta: { active } }) => (*/}
          {/*<OnChangeListener name={`${fieldPrefix}.zip`}>*/}
            {/*{() => {*/}
              {/*if (!active && _get(formValues, watchField)) {*/}
                {/*onChange(false)*/}
              {/*}*/}
            {/*}}*/}
          {/*</OnChangeListener>*/}
        {/*)}*/}
      {/*</Field>*/}
    </section>
  );
};

export default AddressListener;
