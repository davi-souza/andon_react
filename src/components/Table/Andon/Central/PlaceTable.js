import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const PlaceTable = (props) => {
  if(!props.places) {
    return null;
  }
  return (
    <Paper className='overflow-auto'>
      <Toolbar>
        <Typography variant="title">Locais</Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='txt-align-center'>ID</TableCell>
            <TableCell className='txt-align-center'>Nome</TableCell>
            <TableCell className='txt-align-center'>Ativo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.places.map((place,index) => (
            <TableRow key={index}>
              <TableCell className='txt-align-center'>{place.id}</TableCell>
              <TableCell className='txt-align-center'>{place.name}</TableCell>
              <TableCell className='txt-align-center'>{`${place.active? 'Sim' : 'Não'}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default PlaceTable;