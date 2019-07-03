import React from 'react';
import { defaultMemoize } from 'reselect';
import {
  AdditionalInterestCard,
  getSortedAdditionalInterests
} from '@exzeo/core-ui/src/@Harmony';

const sortAdditionalInterests = defaultMemoize(getSortedAdditionalInterests);

export const AdditionalInterestDetails = ({ additionalInterests }) => {
  const sortedAdditionalInterests = sortAdditionalInterests(
    additionalInterests
  );

  return (
    <section className="display-element additional-interests">
      <ul>
        {sortedAdditionalInterests.map(additionalInterest => (
          <AdditionalInterestCard
            key={additionalInterest._id}
            ai={additionalInterest}
          />
        ))}
      </ul>
    </section>
  );
};

AdditionalInterestDetails.defaultProps = {
  additionalInterests: []
};
export default AdditionalInterestDetails;
