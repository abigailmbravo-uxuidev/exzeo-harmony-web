import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '@exzeo/core-ui/lib/InputLifecycle/index';
import PolicyTabs from '../Common/PolicyTabs';

const { numbers } = normalize;

export const Property = ({ policy, policyNumber }) => {
  const { property, rating } = policy;
  return (
    <React.Fragment>
      <PolicyTabs activeTab="property" policyNumber={policyNumber} />
      <div className="route-content">
        <div className="detail-group property-details">
          <section className="display-element home-and-location">
            <h3 className="section-group-header"><i className="fa fa-map-marker" /> Home and Location</h3>
            <dl>
              <div>
                <dt className="yearHomeBuilt">Year Home Built</dt>
                <dd className="yearHomeBuilt">{property.yearBuilt}</dd>
              </div>
              <div>
                <dt className="construction">Construction</dt>
                <dd className="construction">{property.constructionType}</dd>
              </div>
              <div>
                <dt className="yearRoofBuilt">Year Roof Built</dt>
                <dd className="yearRoofBuilt">{property.yearOfRoof}</dd>
              </div>
              <div>
                <dt className="squareFootage">Square Footage</dt>
                <dd className="squareFootage">{property.squareFeet}</dd>
              </div>
              <div>
                <dt className="residenceType">Residence Type</dt>
                <dd className="residenceType">{property.residenceType}</dd>
              </div>
              <div>
                <dt className="familyUnits">Family Units</dt>
                <dd className="familyUnits">{property.familyUnits}</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt className="floodZone">Flood Zone</dt>
                <dd className="floodZone">{property.floodZone}</dd>
              </div>
              <div>
                <dt className="distToTidalWaters">Dist. to Tidal Waters</dt>
                <dd className="distToTidalWaters">{numbers(property.distanceToTidalWater)} ft.</dd>
              </div>
              <div>
                <dt className="distToFireHydrant">Dist. to Fire Hydrant</dt>
                <dd className="distToFireHydrant">{property.distanceToFireHydrant ? `${numbers(property.distanceToFireHydrant)} ft.` : '-'}</dd>
              </div>
              <div>
                <dt className="distToFireStation">Dist. to Fire Station</dt>
                <dd className="distToFireStation">{property.distanceToFireStation} mi.</dd>
              </div>
              <div>
                <dt className="protectionClass">Protection Class</dt>
                <dd className="protectionClass">{property.protectionClass}</dd>
              </div>
              <div>
                <dt className="BCEG">BCEG</dt>
                <dd className="BCEG">{property.buildingCodeEffectivenessGrading}</dd>
              </div>
            </dl>
          </section>
          <section className="display-element wind-mit">
              <h3 className="section-group-header"><i className="fa fa-flag" /> Wind Mitigation</h3>
              <dl>
                <div>
                  <dt className="roofCovering">Roof Covering</dt>
                  <dd className="roofCovering">{property.windMitigation.roofCovering}</dd>
                </div>
                <div>
                  <dt className="roofDeckAttachment">Roof Deck Attachment</dt>
                  <dd className="roofDeckAttachment">{property.windMitigation.roofDeckAttachment}</dd>
                </div>
                <div>
                  <dt className="roofToWallAttachment">Roof to Wall Attachment</dt>
                  <dd className="roofToWallAttachment">{property.windMitigation.roofToWallConnection}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="roofGeometry">Roof Geometry</dt>
                  <dd className="roofGeometry">{property.windMitigation.roofGeometry}</dd>
                </div>
                <div>
                  <dt className="SWR">Secondary Water Resistance (SWR)</dt>
                  <dd className="SWR">{property.windMitigation.secondaryWaterResistance}</dd>
                </div>
                <div>
                  <dt className="openingProtection">Opening Protection</dt>
                  <dd className="openingProtection">{property.windMitigation.openingProtection}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="windSpeed">FBC Wind Speed</dt>
                  <dd className="windSpeed">{property.windMitigation.floridaBuildingCodeWindSpeed}</dd>
                </div>
                <div>
                  <dt className="windSpeedDesign">FBC Wind Speed Design</dt>
                  <dd className="windSpeedDesign">{property.windMitigation.floridaBuildingCodeWindSpeedDesign}</dd>
                </div>
                <div>
                  <dt className="terrain">Terrain</dt>
                  <dd className="terrain">{property.windMitigation.terrain}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="internalPressureDesign">Internal Pressure Design</dt>
                  <dd className="internalPressureDesign">{property.windMitigation.internalPressureDesign}</dd>
                </div>
                <div>
                  <dt className="WBDR">Wind Borne Debris Region (WBDR)</dt>
                  <dd className="WBDR">{property.windMitigation.windBorneDebrisRegion}</dd>
                </div>
                <div>
                  <dt className="windMitFactor">Wind Mit Factor</dt>
                  <dd className="windMitFactor">{rating.worksheet.elements.windMitigationFactors.windMitigationDiscount}</dd>
                </div>
              </dl>
            </section>
        </div>
      </div>
    </React.Fragment>);
};

Property.contextTypes = {
  router: PropTypes.object
};

Property.propTypes = {
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

export default Property;
