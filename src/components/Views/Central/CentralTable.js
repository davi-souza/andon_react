import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CentralTable = (props) => {
  if(props.data.length === 0) {
    return (
      null
    );
  }

  let tableHeadCells = Object.keys(props.data[0]);

  return (
    <Paper className='overflow-auto'>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadCells.map(key => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(data => (
            <TableRow key={data[tableHeadCells[0]]}>
              {tableHeadCells.map(key => (
                <TableCell key={data[key]}>{data[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CentralTable;