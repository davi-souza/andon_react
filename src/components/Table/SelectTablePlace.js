import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  flex: {
    flex: 1,
  }
}

class SelectTablePlace extends Component {
  render() {
    console.log(this.props.places);
    return (
      <Paper>
        <Toolbar>
          <IconButton component={Link} to={"/andon/central/places"} color="secondary">
            <i className="material-icons">navigate_before</i>
          </IconButton>
          <Typography variant="title" style={styles.flex}>
            { this.props.placeLeader ? `${this.props.placeLeader.id} - ${this.props.placeLeader.name}` : "" }
          </Typography>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sub-Local</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.places && this.props.places.map(place => (
              <TableRow key={place.id}>
                <TableCell>
                  {this.props.updatePlaceLoading ?
                    <CircularProgress color="secondary" size={32} className="margin-top-8 margin-bottom-8" />
                    :
                    <Checkbox
                      color="secondary"
                      checked={this.handleChecked(place.id)}
                      onChange={() => { this.handleCheckboxChange(place) }}
                    />
                  }
                </TableCell>
                <TableCell>
                  {place.id}
                </TableCell>
                <TableCell>
                  {place.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  handleChecked = (placeId) => {
    if(this.props.placeLeader) {
      let member = this.props.placeLeader.subPlaces.find(s => s.id === placeId);
      if(member) {
        return true;
      }
      return false;
    }
    return false;
  }

  handleCheckboxChange = async (place) => {
    if(this.props.placeLeader.subPlaces.filter(sub => sub.id === place.id).length === 0) {

      if(window.confirm(`Tem certeza que deseja adicionar ${place.name}?`)) {
        await this.props.addSubPlace(this.props.placeLeader.id,place.id);
      }

    } else {

      if(window.confirm(`Tem certeza que deseja remover ${place.name}?`)) {
        await this.props.removeSubPlace(this.props.placeLeader.id,place.id);
      }

    }
  }
}

export default SelectTablePlace;