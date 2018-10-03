import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '@exzeo/core-ui';
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
            <div className="left">
              <dl>
                <div data-test="yearHomeBuilt">
                  <dt>Year Home Built</dt>
                  <dd>{property.yearBuilt}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="protectionClass">
                  <dt>Protection Class</dt>
                  <dd>{property.protectionClass}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="distToTidalWaters">
                  <dt>Dist. to Tidal Waters</dt>
                  <dd>{numbers(property.distanceToTidalWater)} ft.</dd>
                </div>
              </dl>
              <dl>
                <div data-test="residenceType">
                  <dt>Residence Type</dt>
                  <dd>{property.residenceType}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="construction">
                  <dt>Construction</dt>
                  <dd>{property.constructionType}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="BCEG">
                  <dt>BCEG</dt>
                  <dd>{property.buildingCodeEffectivenessGrading}</dd>
                </div>
              </dl>
            </div>
            <div className="right">
              <dl>
                <div data-test="distToFireHydrant">
                  <dt>Dist. to Fire Hydrant</dt>
                  <dd>{
                    property.distanceToFireHydrant
                      ? `${numbers(property.distanceToFireHydrant)} ft.`
                      : '-'
                  }</dd>
                </div>
              </dl>
              <dl>
                <div data-test="squareFootage">
                  <dt>Square Footage</dt>
                  <dd>{property.squareFeet}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="yearRoofBuilt">
                  <dt>Year Roof Built</dt>
                  <dd>{property.yearOfRoof}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="familyUnits">
                  <dt>Family Units</dt>
                  <dd>{property.familyUnits}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="distToFireStation">
                  <dt>Dist. to Fire Station</dt>
                  <dd>{property.distanceToFireStation}
                  mi.</dd>
                </div>
              </dl>
              <dl>
                <div data-test="floodZone">
                  <dt>Flood Zone</dt>
                  <dd>{property.floodZone}</dd>
                </div>
              </dl>
            </div>
          </section>
          <section className="display-element wind-mit">
            <h3 className="section-group-header"><i className="fa fa-flag" /> Wind Mitigation</h3>
            <div className="left">
              <dl>
                <div data-test="roofCovering">
                  <dt>Roof Covering</dt>
                  <dd>{property.windMitigation.roofCovering}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="roofGeometry">
                  <dt>Roof Geometry</dt>
                  <dd>{property.windMitigation.roofGeometry}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="windSpeed">
                  <dt>FBC Wind Speed</dt>
                  <dd>{property.windMitigation.floridaBuildingCodeWindSpeed}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="internalPressureDesign">
                  <dt>Internal Pressure Design</dt>
                  <dd>{property.windMitigation.internalPressureDesign}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="roofDeckAttachment">
                  <dt>Roof Deck Attachment</dt>
                  <dd>{property.windMitigation.roofDeckAttachment}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="SWR">
                  <dt>Secondary Water Resistance (SWR)</dt>
                  <dd>{property.windMitigation.secondaryWaterResistance}</dd>
                </div>
              </dl>
            </div>
            <div className="right">
              <dl>
                <div data-test="windSpeedDesign">
                  <dt>FBC Wind Speed Design</dt>
                  <dd>{property.windMitigation.floridaBuildingCodeWindSpeedDesign}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="WBDR">
                  <dt>Wind Borne Debris Region (WBDR)</dt>
                  <dd>{property.windMitigation.windBorneDebrisRegion}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="roofToWallAttachment">
                  <dt>Roof to Wall Attachment</dt>
                  <dd>{property.windMitigation.roofToWallConnection}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="openingProtection">
                  <dt>Opening Protection</dt>
                  <dd>{property.windMitigation.openingProtection}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="terrain">
                  <dt>Terrain</dt>
                  <dd>{property.windMitigation.terrain}</dd>
                </div>
              </dl>
              <dl>
                <div data-test="windMitFactor">
                  <dt>Wind Mit Factor</dt>
                  <dd>{rating.worksheet.elements.windMitigationFactors.windMitigationDiscount}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

Property.contextTypes = {
  router: PropTypes.object
};

Property.propTypes = {
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

export default Property;
