import React from "react";
import PropTypes from "prop-types";

import BaseConnect from "./Base";
import Footer from "../components/Common/Footer";

const Training = props => (
  <BaseConnect {...props}>
    <div className="train" role="article">
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="survey-wrapper">
              <section>
                <h2>Reference Guides</h2>
                <ul className="link-list">
                  <li>
                    <h5><a href="https://cdn.typtap.com/2018/12/TT-Pilot-Agents-one-pager-112818.pdf" target="_blank">TypTap Homeowners Insurance Agent Program Guide</a></h5>
                    <p>Single page agent guide with how-to information, answers to FAQ, and agency support contact information.</p>
                  </li>
                  <li>
                    <h5><a href="https://blog.typtap.com/wp-content/uploads/2018/12/TT-HO3-Quick-Ref-Guide.pdf" target="_blank">HO3 Quick Reference Guide</a></h5>
                    <p>Comprehensive list of TypTap Homeowners coverage, deductible, underwriting & risk guidelines.</p>
                  </li>
                </ul>
              </section>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </BaseConnect>
);

Training.propTypes = {
  children: PropTypes.shape()
};

export default Training;
