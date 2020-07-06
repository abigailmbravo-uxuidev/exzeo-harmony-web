import React, { useState } from 'react';
import {
  Field,
  Form,
  FormSpy,
  validation,
  Input,
  Button,
  Select,
  Loader
} from '@exzeo/core-ui';
import { useQuoteSearch } from '@exzeo/core-ui/src/@Harmony';

import { cspConfigForSearch } from '../../../utilities/userResources';
import NoResults from './NoResults';
import QuoteCard from './QuoteCard';
import QuoteError from './QuoteError';
import Pagination from './Pagination';
import { VALID_QUOTE_STATES } from '../constants';

const SearchQuote = ({ userProfile = {}, history, retrieveQuote }) => {
  const { stateOptions, productOptions, productOptionMap } = cspConfigForSearch(
    userProfile,
    'QuoteData:Quotes:*',
    'UPDATE'
  );
  const { state: searchState, handleSearchSubmit } = useQuoteSearch();
  const [blockedQuote, setBlockedQuote] = useState(null);

  const handlePagination = values => page => {
    handleSearchSubmit({ ...values, page });
  };

  const handleSelectQuote = async quote => {
    if (VALID_QUOTE_STATES.includes(quote.quoteState)) {
      // get full quote document and set in state before navigating to workflow
      await retrieveQuote({ quoteNumber: quote.quoteNumber });
      history.replace(`/quote/${quote.quoteNumber}/customerInfo`);
    } else {
      setBlockedQuote(quote);
    }
  };

  return (
    <Form
      onSubmit={handleSearchSubmit}
      subscription={{ invalid: true, loading: true }}
    >
      {({ handleSubmit, invalid, loading }) => (
        <React.Fragment>
          <form id="SearchBar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper retrieve-quote-wrapper">
              <Field name="firstName" validate={validation.isValidNameFormat}>
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    dataTest="firstName"
                    styleName="first-name-search"
                    placeholder="First Name Search"
                    label="First Name"
                    errorHint
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
                    errorHint
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
                    errorHint
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

              <Field name="quoteNumber" validate={validation.isValidChar}>
                {({ input, meta }) => (
                  <Input
                    input={input}
                    meta={meta}
                    dataTest="quoteNumber"
                    styleName="quote-no-search"
                    placeholder="Quote No Search"
                    label="Quote Number"
                    errorHint
                  />
                )}
              </Field>

              <Button
                customClass="multi-input"
                type="submit"
                form="SearchBar"
                dataTest="submit"
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
                    <p>{`There are no quotes found matching that search criteria. Please
                try to search again, or start a new quote.`}</p>
                  </NoResults>
                ) : (
                  <ul className="quote-list" data-test="quote-list">
                    {searchState.results.map(quote => (
                      <QuoteCard
                        key={quote._id}
                        quote={quote}
                        handleClick={handleSelectQuote}
                      />
                    ))}
                  </ul>
                ))}
            </div>
          </div>

          {blockedQuote && (
            <QuoteError
              quote={blockedQuote}
              handleClose={() => setBlockedQuote(null)}
            />
          )}
        </React.Fragment>
      )}
    </Form>
  );
};

export default SearchQuote;
