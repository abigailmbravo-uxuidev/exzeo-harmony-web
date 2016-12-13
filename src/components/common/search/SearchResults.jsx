import React from 'react';

const Results = ({addresses}) => (
    <ul>
        {
            addresses ? addresses.map((address, index) => (
                    <li id={address.id} key={index}>
                        <a>
                                <i className="card-icon fa fa-map-marker"></i>
                                <section>
                                        <h4>{address.address1}</h4>
                                        <p>{address.city}, {address.state} {address.zip}</p>
                                </section>
                                <i className="fa fa-chevron-circle-right"></i>
                        </a>
                    </li>
            )) : null
        }
    </ul>
);



const SearchResults = ({data}) => {
    console.log(data)
    return(
        <div className="results fade-in">
            <Results addresses={data.searchAddress} />
        </div>
    );
};

export default SearchResults;
