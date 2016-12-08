import React from 'react';

const Results = ({addresses}) => (
    <ul>
        {
            addresses ? addresses.map((address, index) => (
                    <li id={address.id} key={index}>
                        <a>
                            <section>
                                <h4>{address.address1}</h4>
                                <p>{address.city}, {address.state} {address.zip}</p>
                            </section>
                        </a>
                    </li>
            )) : null
        }
    </ul>
);



const SearchResults = ({data, type}) => {
    return(
        <div className="results">
            <Results addresses={data.searchAddress} />
        </div>
    );
};

export default SearchResults;