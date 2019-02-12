import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
            <TableCell className='txt-align-center'>Super Local(s)</TableCell>
            <TableCell className='txt-align-center'>Sub Local(s)</TableCell>
            <TableCell className='txt-align-center'>Ativo</TableCell>
            <TableCell className='txt-align-center'>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.places.map((place,index) => (
            <TableRow key={index}>
              <TableCell className='txt-align-center'>{place.id}</TableCell>
              <TableCell className='txt-align-center'>{place.name}</TableCell>
              <TableCell className='txt-align-center'>
                {renderSuperPlace(props.places, place)}
              </TableCell>
              <TableCell className='txt-align-center'>{place.subPlaces.map(sub => sub.name).join(", ")}</TableCell>
              <TableCell className='txt-align-center'>{`${place.active? 'Sim' : 'Não'}`}</TableCell>
              <TableCell className='txt-align-center'>
                <Button onClick={() => { props.history.push(`/andon/central/places/${place.id}`) }} color="secondary">
                  <i className='material-icons'>edit</i>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const renderSuperPlace = (places, place) => {
  const superPlace = places.find(p => p.id===place.superPlaceId);
  if (superPlace) {
    return superPlace.id + " - " + superPlace.name;
  }
  return "";
};

export default PlaceTable;