import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const SimpleTable = (props) => {
  if(!props.data /*|| props.data.length === 0*/) {
    return null;
  }
  const paperStyle = {
    height: '100%',
    maxHeight: '400px',
    overflowY: 'auto',
  };
  return (
    <Paper className='overflow-auto' style={paperStyle}>
      {props.title && 
        <Toolbar>
          <Typography variant="title">{props.title}</Typography>
        </Toolbar>
      }
      <Table>
        <TableHead>
          <TableRow>
            {props.data[0] && Object.keys(props.data[0]).map((column,index) => (
              <TableCell className='txt-align-center' key={index}>{ column }</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row,index) => (
            <TableRow key={index}>
              {Object.keys(row).map((column,i) => (
                <TableCell className='txt-align-center' key={i}>{ row[column] }</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default SimpleTable;