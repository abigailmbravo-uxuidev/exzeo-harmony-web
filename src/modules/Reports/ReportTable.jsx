import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const ReportTable = ({ reportData, columns }) => {
  return (
    <div className="table-view">
      <BootstrapTable
        className=""
        data={reportData}
        striped
        hover
        pagination
        options={{
          hideSizePerPage: true,
          sizePerPage: 100,
          pageStartIndex: 1,
          paginationSize: 12
        }}
      >
        {columns &&
          columns.map(c => (
            <TableHeaderColumn
              key={c.title}
              isKey={c.isKey}
              dataField={c.title}
              thStyle={{ minWidth: '150px' }}
              dataFormat={c.format}
              width="150px"
              dataAlign="center"
              dataSort
            >
              {c.title}
            </TableHeaderColumn>
          ))}
      </BootstrapTable>
    </div>
  );
};

export default ReportTable;
