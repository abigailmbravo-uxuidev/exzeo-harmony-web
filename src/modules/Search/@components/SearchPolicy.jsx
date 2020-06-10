import React from 'react';
import {
  Field,
  Form,
  FormSpy,
  validation,
  Input,
  Date,
  Button,
  Select,
  Loader,
  date
} from '@exzeo/core-ui';
import {
  AppFooter,
  usePolicySearch,
  POLICY_STATUS_OPTIONS
} from '@exzeo/core-ui/src/@Harmony';

import { cspConfigForSearch } from '../../../utilities/userResources';
import { SORT_BY_OPTIONS, SORT_DIRECTION_MAP } from '../constants';
import NoResults from './NoResults';
import PolicyCard from './PolicyCard';
import Pagination from './Pagination';

const SearchPolicy = ({ userProfile = {} }) => {
  const { stateOptions, productOptions, productOptionMap } = cspConfigForSearch(
    userProfile,
    'PolicyData:Transactions:*',
    'READ'
  );
  const { state: searchState, handleSearchSubmit } = usePolicySearch();

  const handleSubmit = async values => {
    const sortDirection = SORT_DIRECTION_MAP[values.sort];
    await handleSearchSubmit({
      ...values,
      sortDirection,
      effectiveDate:
        values.effectiveDate &&
        date.formatDate(values.effectiveDate, date.FORMATS.SECONDARY)
    });
  };

  const handlePagination = values => page => {
    handleSubmit({ ...values, page });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      subscription={{ invalid: true, loading: true }}
    >
      {({ handleSubmit, invalid, loading }) => (
        <React.Fragment>
          <form id="PolicySearchBar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper search-policy-wrapper">
              <Field
                name="sort"
                validate={validation.isRequired}
                initialValue="policyNumber"
              >
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    dataTest="sortBy"
                    styleName="search-context"
                    label="Sort By"
                    answers={SORT_BY_OPTIONS}
                    showPlaceholder={false}
                    errorHint
                  />
                )}
              </Field>

              <Field name="firstName" validate={validation.isValidNameFormat}>
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    dataTest="firstName"
                    styleName="first-name-search"
                    placeholder="First Name Search"
                    label="First Name"
                  />
                )}
              </Field>

              <Field name="lastName" validate={validation.isValidNameFormat}>
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    dataTest="lastName"
                    styleName="last-name-search"
                    placeholder="Last Name Search"
                    label="Last Name"
                  />
                )}
              </Field>

              <Field name="propertyAddress" validate={validation.isValidChar}>
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    dataTest="address"
                    styleName="property-search"
                    placeholder="Property Street Address Search"
                    label="Property Street Address"
                  />
                )}
              </Field>

              <Field name="state">
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    dataTest="state"
                    styleName="state-search"
                    placeholder="All"
                    answers={stateOptions}
                    label="State"
                  />
                )}
              </Field>

              <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                  <Field name="product">
                    {({ input, meta }) => (
                      <Select
                        input={input}
                        meta={meta}
                        dataTest="product"
                        styleName="product-search"
                        label="Product"
                        placeholder="All"
                        answers={
                          values.state
                            ? productOptionMap[values.state]
                            : productOptions
                        }
                      />
                    )}
                  </Field>
                )}
              </FormSpy>

              <Field name="policyNumber" validate={validation.isValidChar}>
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    dataTest="policyNumber"
                    styleName="policy-no-search"
                    placeholder="Policy No Search"
                    label="Policy Number"
                  />
                )}
              </Field>

              <Field name="status">
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    dataTest="policyStatus"
                    styleName="policy-status-search"
                    answers={POLICY_STATUS_OPTIONS}
                    label="Policy Status"
                  />
                )}
              </Field>

              <Field name="effectiveDate">
                {({ input, meta }) => (
                  <Date
                    input={input}
                    meta={meta}
                    dataTest="effectiveDate"
                    styleName="effective-date-search"
                    label="Effective Date"
                  />
                )}
              </Field>

              <Button
                customClass="multi-input"
                type="submit"
                form="PolicySearchBar"
                data-test="submit"
                disabled={invalid || loading}
              >
                <i className="fa fa-search" />
                <span>Search</span>
              </Button>
            </div>
          </form>

          {searchState.results.length > 0 && searchState.totalPages > 1 && (
            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <Pagination
                  currentPage={searchState.currentPage}
                  handlePagination={handlePagination(values)}
                  totalPages={searchState.totalPages}
                />
              )}
            </FormSpy>
          )}

          <div className="survey-wrapper">
            <div className="results-wrapper">
              {searchState.status === 'pending' && <Loader />}

              {searchState.status === 'resolved' &&
                (searchState.totalRecords === 0 ? (
                  <NoResults header={<h4>No Results Found</h4>}>
                    <p>{`There are no policies found matching that search criteria. Please try
          to search again.`}</p>
                  </NoResults>
                ) : (
                  <ul className="policy-list">
                    {searchState.results.map(policy => (
                      <PolicyCard key={policy.policyNumber} policy={policy} />
                    ))}
                  </ul>
                ))}
            </div>
            <AppFooter />
          </div>
        </React.Fragment>
      )}
    </Form>
  );
};

export default SearchPolicy;
