import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const ReportTable = ({ reportData, columns }) => {
  return (
    <div className="table-view">
      <BootstrapTable className="" data={reportData} striped hover>
        {columns &&
          columns.map(c => (
            <TableHeaderColumn
              isKey={c.isKey}
              dataField={c.title}
              className={c.title}
              columnClassName={c.title}
              dataFormat={c.format}
              width="150"
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
