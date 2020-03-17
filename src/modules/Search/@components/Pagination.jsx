import React from 'react';
import { Pagination } from '@exzeo/core-ui/src/@Harmony';

const PaginationController = ({
  currentPage,
  handlePagination,
  totalPages
}) => {
  return (
    <Pagination
      pageUp={() => handlePagination(currentPage + 1)}
      pageDown={() => handlePagination(currentPage - 1)}
      pageNumber={currentPage}
      totalPages={totalPages}
    />
  );
};

export default PaginationController;
