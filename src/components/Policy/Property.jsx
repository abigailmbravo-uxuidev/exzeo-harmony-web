import React from 'react';
import PropTypes from 'prop-types';
import PolicyTabs from '../Common/PolicyTabs';
import normalizeNumbers from '../Form/normalizeNumbers';

export const Property = ({ policy, policyNumber }) => {
  const { property, rating } = policy;
  return (
    <React.Fragment>
      <PolicyTabs activeTab="property" policyNumber={policyNumber} />
      <section>
        <h3>Home and Location</h3>
        <div className="property-info">
          <dl>
            <div>
              <dt className="yearHomeBuilt">Year Home Built</dt>
              <dd className="yearHomeBuilt">{property.yearBuilt}</dd>
              <dt className="construction">Construction</dt>
              <dd className="construction">{property.constructionType}</dd>
              <dt className="yearRoofBuilt">Year Roof Built</dt>
              <dd className="yearRoofBuilt">{property.yearOfRoof}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="protectionClass">Protection Class</dt>
              <dd className="protectionClass">{property.protectionClass}</dd>
              <dt className="BCEG">BCEG</dt>
              <dd className="BCEG">{property.buildingCodeEffectivenessGrading}</dd>
              <dt className="familyUnits">Family Units</dt>
              <dd className="familyUnits">{property.familyUnits}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="distToTidalWaters">Dist. to Tidal Waters</dt>
              <dd className="distToTidalWaters">{normalizeNumbers(property.distanceToTidalWater)} ft.</dd>
              <dt className="distToFireHydrant">Dist. to Fire Hydrant</dt>
              <dd className="distToFireHydrant">{property.distanceToFireHydrant ? `${normalizeNumbers(property.distanceToFireHydrant)} ft.` : '-'}</dd>
              <dt className="distToFireStation">Dist. to Fire Station</dt>
              <dd className="distToFireStation">{property.distanceToFireStation} mi.</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="residenceType">Residence Type</dt>
              <dd className="residenceType">{property.residenceType}</dd>
              <dt className="squareFootage">Square Footage</dt>
              <dd className="squareFootage">{property.squareFeet}</dd>
              <dt className="floodZone">Flood Zone</dt>
              <dd className="floodZone">{property.floodZone}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section>
        <h3>Wind Mitigation</h3>
        <div className="wind-mitigation">
          <dl>
            <div>
              <dt className="roofCovering">Roof Covering</dt>
              <dd className="roofCovering">{property.windMitigation.roofCovering}</dd>
              <dt className="roofDeckAttachment">Roof Deck Attachment</dt>
              <dd className="roofDeckAttachment">{property.windMitigation.roofDeckAttachment}</dd>
              <dt className="roofToWallAttachment">Roof to Wall Attachment</dt>
              <dd className="roofToWallAttachment">{property.windMitigation.roofToWallConnection}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="roofGeometry">Roof Geometry</dt>
              <dd className="roofGeometry">{property.windMitigation.roofGeometry}</dd>
              <dt className="SWR">Secondary Water Resistance (SWR)</dt>
              <dd className="SWR">{property.windMitigation.secondaryWaterResistance}</dd>
              <dt className="openingProtection">Opening Protection</dt>
              <dd className="openingProtection">{property.windMitigation.openingProtection}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="windSpeed">FBC Wind Speed</dt>
              <dd className="windSpeed">{property.windMitigation.floridaBuildingCodeWindSpeed}</dd>
              <dt className="windSpeedDesign">FBC Wind Speed Design</dt>
              <dd className="windSpeedDesign">{property.windMitigation.floridaBuildingCodeWindSpeedDesign}</dd>
              <dt className="terrain">Terrain</dt>
              <dd className="terrain">{property.windMitigation.terrain}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="internalPressureDesign">Internal Pressure Design</dt>
              <dd className="internalPressureDesign">{property.windMitigation.internalPressureDesign}</dd>
              <dt className="WBDR">Wind Borne Debris Region (WBDR)</dt>
              <dd className="WBDR">{property.windMitigation.windBorneDebrisRegion}</dd>
              <dt className="windMitFactor">Wind Mit Factor</dt>
              <dd className="windMitFactor">{rating.worksheet.elements.windMitigationFactors.windMitigationDiscount}</dd>
            </div>
          </dl>
        </div>
      </section>
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
