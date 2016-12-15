import React from 'react';

const Results = ({ addresses, handleClick }) => (
  <ul>
    {
      addresses ? addresses.map((address, index) => (
        <li id={address.id} key={index} onClick={() => { handleClick(address); }}>
          <a>
            <i className="card-icon fa fa-map-marker" />
            <section>
              <h4>{address.address1}</h4>
              <p>{address.city}, {address.state} {address.zip}</p>
            </section>
            <i className="fa fa-chevron-circle-right" />
          </a>
        </li>
      )) : null
    }
  </ul>
);

const SearchResults = (x) => {
  console.log('FFFFFFFFFFFFFFFFFFFFF', x);
  return (
    <div className="results fade-in">
      <Results addresses={x.data.searchAddress} handleClick={(args) => { x.completeStep(args); }} />
    </div>
  );
};

export default SearchResults;
