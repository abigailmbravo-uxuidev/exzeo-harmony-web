import React from 'react';
// import PropTypes from 'prop-types';

import BaseConnect from './Base';
import FancyExternalLink from '../components/FancyExternalLink';
import Footer from '../components/Common/Footer';

const externalLinks = [
  {
    url: 'https://cdn.typtap.com/2018/12/TT-Pilot-Agents-one-pager-112818.pdf',
    title: 'Agent Program Guide | TypTap Homeowners Insurance',
    description: 'Single page agent guide with how-to information, answers to FAQ, and agency support contact information.'
  },
  {
    url: 'https://blog.typtap.com/wp-content/uploads/2018/12/TT-HO3-Quick-Ref-Guide.pdf',
    title: 'Quick Reference Guide | TypTap Homeowners Insurance',
    description: 'Comprehensive list of TypTap Homeowners coverage, deductible, underwriting & risk guidelines.'
  },
  {
    url: 'https://cdn.typtap.com/2018/12/home-pw-change.pdf',
    title: 'Password Change | TypTap Homeowners Insurance',
    description: 'Quick how-to for changing your password.'
  },
  {
    url: 'https://www.youtube.com/watch?v=atCdv0FLWQg&feature=youtu.be',
    title: 'Training Video | TypTap Homeowners Insurance',
    description: 'How-to quote and bind instructional video for the TypTap Insurance App.'
  }
];

const Training = props => (
  <BaseConnect {...props}>
    <div className="train" role="article">
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="survey-wrapper">
              <section>
                <h2>Reference</h2>
                <ul className="link-list">
                  {externalLinks.map(links => (
                    <FancyExternalLink {...links} />
                  ))}
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

// Training.propTypes = {
//   children: PropTypes.shape()
// };

export default Training;
