import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const Results = ({ addresses, handleClick }) => (
  <ul className="results result-cards">
    {
      addresses ? addresses.map((address, index) => (
        <li id={address.id} key={index}>
          <Link to="/workflow/demographics">
            <i className="card-icon fa fa-map-marker" />
            <section>
              <h4>{address.address1}</h4>
              <p>{address.city}, {address.state} {address.zip}</p>
            </section>
            <i className="fa fa-chevron-circle-right" />
          </Link>
        </li>
      )) : null
    }
  </ul>
);

class SearchResults extends Component {
  state = {
    results: [
      {address1:"12 CASTLE HARBOR ISLE",F:"FORT LAUDERDALE",state:"FL",zip:"33308",id:"1201129F0D1864E56"},
      {address1:"12 GABLES BLVD",city:"WESTON",state:"FL",zip:"33326",id:"1201120A968C6A45C"},
      {address1:"12 GATEHOUSE RD",city:"SEA RANCH LAKES",state:"FL",zip:"33308",id:"12011257C8C9C9439"},
      {address1:"12 ISLA BAHIA DR",city:"FORT LAUDERDALE",state:"FL",zip:"33316",id:"1201135B6DD696FE7"},
      {address1:"12 KEY WEST CT",city:"WESTON",state:"FL",zip:"33326",id:"1201122BB93299865"},
      {address1:"12 NE 16 AVE",city:"POMPANO BEACH",state:"FL",zip:"33060",id:"1201114899440E756"},
      {address1:"12 NE 26 ST",city:"WILTON MANORS",state:"FL",zip:"33305",id:"1201110CB915CBD0A"},
      {address1:"12 REDWOOD CIR",city:"PLANTATION",state:"FL",zip:"33317",id:"120111DF59C70753F"},
      {address1:"12 SE 8 TER",city:"DEERFIELD BEACH",state:"FL",zip:"33441",id:"12011115BBB770889"},
      {address1:"12 SW 24TH ST",city:"GAINESVILLE",state:"FL",zip:"32607",id:"120010347C3F6285F"}
      ]
  }

  render() {

    const {results} = this.state;

    return (
      <div className="workflow">
        <div className="fade-in">
          <div className="workflow-content">
            <section>
              <div className="fade-in">
                <div className="survey-wrapper">
                  <Results addresses={results}/>
                </div>
              </div>

            </section>
          </div>
        </div>
      </div>
    )
  }
};

export default SearchResults;
