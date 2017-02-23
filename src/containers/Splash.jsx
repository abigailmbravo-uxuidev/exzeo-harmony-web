import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Splash = () => {
    return (
      // TEMP HOME PAGE - TRANSFER ONCE AUTHENTICATION IS WORKING
      <div className="dashboard" role="article">
      <div className="fade-in">
        <div className="route">
                <div className="fade-in">
          <div className="dashboard-message">
            <h2 className="app-header">Agency Portal</h2>
            <h4>Welcome to the agency portal</h4>
            <p>Brief description of agency portal.</p>
          </div>
          <div className="product-wrapper">
            <div className="product card">
              <div className="card-header image card-header-image-flood">
                <h4 className="product-name"><i className="fa fa-tint" /> Flood Insurance</h4>
              </div>
              <div className="card-block">
                <h4>New quote / retrieve quote</h4>
                <p>TypTap currently offers stand-alone flood policies for single family residential dwellings in Florida.</p>
              </div>
              <div className="card-footer">
                <Link to="https://www.typtap.com/agency?agentToken=eFE3Sv8NG5fgjH4Bj1MfOb6vxx9ikSiFZ4lAxepkxZqbDyO4ORoTKDPg_eVBr2AtsOT8YAGSeQLXLsdRedZbyzm7VTU5DxTkDx1Zq4F8rauLsur6ins3h47AZZMuZfg44Tkbk5PTdl5P7dIhnh7SdNv80PBbFmMMza_S0cMV4zR1frqxhsmr8y8jUspE-_lJgAsvkRQYcNOeMcs0ZXxAsqlGZI0n2-k6qQnaRy-Of85fcO2_Ymg7zlDplgl8vjbIWxQwp2kk8pNPhqUbDdGW9tgCHfZK5uIInXI38PWZ88GnaNXPTnW9guJDZNkfgYxHAfbad0vEDiX3oJ-s4LoP-thQgqmx2ruZxRsOa_dop2NcmLOtbI65apdHcagIhj72BfCLYL3DtnlSb-JaZJKeNxcmWydErMXXpu_b4hwlIHx9a-2tewhJCxAABESWDGJU0D9BMQuNHsXltUw74FgVUtJjEEzvZF0ThCvu0smpgmrgecIBLoI_eUE_yNMu7xwo5fzykp75ZPRdlCKU7x_w84S8imdI-vfJvzyYcpb0dEPerd7OhvpkT-qX9wrqhDaB6N24s8Mz4bP5I0nRM-uFyuXfuV-fYGStCQbWVosb73xSs3aFKuFJ08BIAxU2i06C_mTxA5i0Oy7NW6xep0IKchxP7KbBcdki4J3VU2GQONqJWcle1MPHO1L2Us4Pnk1UlvdPyw" className="btn btn-primary">Start</Link>
              </div>
            </div>
            <div className="product card">
              <div className="card-header image card-header-image-home">
                <h4 className="product-name"><i className="fa fa-home" /> Homeowners Insurance</h4>
              </div>
              <div className="card-block">
                <h4>New quote / retrieve quote</h4>
                <p>TypTap currently offers HO3 home owner's policies for single family residential dwellings in Florida.</p>
              </div>
              <div className="card-footer">
                <Link to="/quote" className="btn btn-primary">Start</Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>);};

Splash.propTypes = {
  splashScreen: PropTypes.bool,
};

Splash.displayName = 'Splash';

const mapStateToProps = state => ({
  splashScreen: state.features.get('splash-screen'),
  loginMessage: state.features.get('login-message'),
});

export default connect(mapStateToProps)(Splash);
