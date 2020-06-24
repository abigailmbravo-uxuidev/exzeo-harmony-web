import React from 'react';
import {
  Form,
  Field,
  OnChangeListener,
  validation,
  Input,
  Button,
  Select,
  composeValidators,
  emptyArray,
  Loader
} from '@exzeo/core-ui';
import { useAddressSearch, AppFooter } from '@exzeo/core-ui/src/@Harmony';

import { cspConfigForSearch } from '../../../utilities/userResources';
import NoResults from './NoResults';
import AddressCard from './AddressCard';

const { isValidAddressFormat, isRequired } = validation;

const SearchAddress = ({ createQuote, userProfile = {}, history }) => {
  const { companyCodeMap, stateOptions, productOptionMap } = cspConfigForSearch(
    userProfile,
    'QuoteData:Quotes:*',
    'READ' // TODO: this needs to be changed to "INSERT" in a separate ticket.
  );
  const { searchState, loading, handleSearchSubmit } = useAddressSearch();

  const handleSelectAddress = formValues => async address => {
    const companyCode =
      companyCodeMap[`${formValues.state}:${formValues.product}`];
    const quote = await createQuote(
      address.id,
      formValues.state,
      companyCode,
      formValues.product
    );

    if (quote) {
      history.replace(`/quote/${quote.quoteNumber}/customerInfo`);
    }
  };

  return (
    <Form onSubmit={handleSearchSubmit}>
      {({ handleSubmit, values, invalid }) => (
        <React.Fragment>
          <form id="SearchBar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper search-new-quote-wrapper">
              <Field name="state" validate={isRequired}>
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    id="state"
                    dataTest="state"
                    label="Select State"
                    styleName="property-search products"
                    answers={stateOptions}
                    segmented
                    errorHint
                  />
                )}
              </Field>

              <Field name="product" validate={isRequired}>
                {({ input, meta }) => (
                  <React.Fragment>
                    <Select
                      input={input}
                      meta={meta}
                      id="product"
                      dataTest="product"
                      label="Select Product"
                      styleName="property-search products"
                      answers={productOptionMap[values.state] || emptyArray}
                      segmented
                      errorHint
                      disabled={!values.state}
                    />
                    <OnChangeListener name="state">
                      {() => {
                        input.onChange('');
                      }}
                    </OnChangeListener>
                  </React.Fragment>
                )}
              </Field>
              <div className="property-search-wrappper">
                <Field
                  name="address"
                  validate={composeValidators([
                    isValidAddressFormat,
                    isRequired
                  ])}
                >
                  {({ input, meta }) => (
                    <Input
                      input={input}
                      meta={meta}
                      id="address"
                      dataTest="address"
                      label="Property Street Address"
                      placeholder="Search for Property Address"
                      styleName="property-search"
                      errorHint
                    />
                  )}
                </Field>

                <Button
                  customClass="multi-input"
                  type="submit"
                  disabled={loading || invalid}
                  dataTest="submit"
                  form="SearchBar"
                >
                  <i className="fa fa-search" />
                  <span>Search</span>
                </Button>
              </div>
            </div>
          </form>

          <div className="survey-wrapper">
            <div className="results-wrapper">
              {loading && <Loader />}
              {searchState.hasSearched &&
                (searchState.noResults ? (
                  <NoResults header={<h4>No Results Found</h4>}>
                    <p>
                      {`We're sorry we couldn't find any results matching your
                  search parameters. Please check your spelling and try a new
                  search. You can also try a less specific search (such as
                  street number and name).`}
                    </p>
                  </NoResults>
                ) : (
                  <div>
                    <ul
                      className="results result-cards"
                      data-test="search-results"
                    >
                      {searchState.results.map(address => (
                        <AddressCard
                          key={address.id}
                          address={address}
                          handleClick={handleSelectAddress(values)}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              <div className="search-help" data-test="search-help">
                <small>
                  <p>
                    If you don't see your address in the list provided, try
                    entering less address information to see if that improves
                    your search results. Please note, at this time we are only
                    writing single family dwellings in Florida, New Jersey and
                    South Carolina.
                  </p>
                  <p>
                    If you still have problems finding an address, please{' '}
                    <a href="tel:844-289-7968">
                      <strong>call us</strong>
                    </a>{' '}
                    and one of our representatives will be glad to help you.
                  </p>
                </small>
              </div>
            </div>
            <AppFooter />
          </div>
        </React.Fragment>
      )}
    </Form>
  );
};

export default SearchAddress;
