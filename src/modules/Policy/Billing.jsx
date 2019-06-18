import React from 'react';
import classNames from 'classnames';
import Title from '@exzeo/core-ui/src/@Harmony/Gandalf/@components/Title';

const Billing = ({
  config,
  initialValues,
  size,
}) => {
  // const { watchField } = config.extendedProperties;
  return (
    <section className={classNames('billing-info', size)} data-test="billing-info">
    <Title config={{ icon: "fa fa-dollar", text: "Billing Information"}} />
    </section>
  );
};

export default Billing;
