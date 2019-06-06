import React from 'react';

const TriggerRecalc = React.memo(({ currentPage, isRecalc, dirty, setRecalc }) => {
  if (currentPage === 2 && isRecalc !== dirty) {
    // this.setState({ isRecalc: dirty });
    setRecalc(dirty);
  } else if (currentPage !== 2 && isRecalc) {
  // this.setState({ isRecalc: false});
    setRecalc(false);
  }
  return null;
});

export default TriggerRecalc;
