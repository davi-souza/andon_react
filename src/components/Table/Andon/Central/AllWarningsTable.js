import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class AllWarningsTable extends Component {
  render() {
    if(this.props.warnings.length === 0) {
      return (
        null
      );
    }
    return (
      <Paper className='overflow-auto'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='txt-align-center'>Tipo</TableCell>
              <TableCell className='txt-align-center'>Motivo</TableCell>
              <TableCell className='txt-align-center'>Local</TableCell>
              <TableCell className='txt-align-center'>Criado por</TableCell>
              <TableCell className='txt-align-center'>Responsáveis</TableCell>
              <TableCell className='txt-align-center'>Profissão/serviço do autor</TableCell>
              <TableCell className='txt-align-center'>Criado em</TableCell>
              <TableCell className='txt-align-center'>Resolvido em</TableCell>
              <TableCell className='txt-align-center'>Tempo em aberto</TableCell>
              {/* <TableCell className='txt-align-center'>Resolver</TableCell> */}
              {/* <TableCell className='txt-align-center'>Apagar</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.warnings.map(warning => (
              <TableRow key={warning.id} className="table-row-hover">
                <TableCell className='txt-align-center'>
                  <Button className={this.getWarningRowColor(warning)}>
                    <i className="material-icons">warning</i>
                  </Button>
                </TableCell>
                <TableCell className='txt-align-center'>{warning.reason.name}</TableCell>
                <TableCell className='txt-align-center'>{warning && this.renderPlace(this.props.places, warning.place)}</TableCell>
                <TableCell className='txt-align-center'>{`${warning.userThatCreated.firstname} ${warning.userThatCreated.lastname}`}</TableCell>
                <TableCell className='txt-align-center'>
                {
                  [
                    ...new Set(warning.userThatCreated.userLeaders.map(leader => (
                      `${leader.firstname} ${leader.lastname}`
                    )))
                  ].join(', ')
                }
                </TableCell>
                <TableCell className='txt-align-center'>
                  {warning.userThatCreated.jobTitle}
                </TableCell>
                <TableCell className='txt-align-center'>{
                  new Date(warning.createdDate).toLocaleString('pt-BR')
                }</TableCell>
                <TableCell className='txt-align-center'>{
                  warning.resolvedDate ? new Date(warning.resolvedDate).toLocaleString('pt-BR') : "-"
                }</TableCell>
                <TableCell className='txt-align-center'>
                  {
                    this.handleOpenTime(warning.createdDate,warning.resolvedDate)
                  }
                </TableCell>
                {/* <TableCell className="txt-align-center">
                  <Button
                    variant="contained"
                    className='bg-color-gray txt-color-black'
                    onClick={()=>{this.props.resolve(warning.id)}}
                    disabled={warning.resolvedDate!==null}
                  >
                    <i className='material-icons'>
                      {warning.resolvedDate!==null ? 
                        "block":"done"
                      }
                    </i>
                  </Button>
                </TableCell> */}
                {/* <TableCell className='txt-align-center'>
                  <Button color='secondary' disabled>
                    <i className='material-icons'>delete</i>
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  getWarningRowColor = (warning) => {
    // if(warning.resolvedDate) {
    //   return "bg-color-green txt-color-white"
    // }
    if(warning.type === "ALERTA") {
      return "bg-color-yellow-dark txt-color-white";
    }
    return "bg-color-red-dark txt-color-white";
  }

  handleOpenTime = (createdDate,resolvedDate) => {
    let now = (new Date(resolvedDate)).getTime() || Date.now();
    let label = "segundo";
    let openTime = (now - (new Date(createdDate)).getTime())/1000;
    if(openTime > 60 && label === "segundo") {
      label = "minuto";
      openTime /= 60;
    }
    if(openTime > 60 && label === "minuto") {
      label = "hora";
      openTime /= 60;
    }
    if(openTime > 24 && label === "hora") {
      label = "dia";
      openTime /= 24;
    }
    return `${openTime.toFixed(0)} ${label}(s)`;
  }

  renderPlace = (places, place) => {
    if (places && place){
      try {
        let array = [place];
        while(place.superPlaceId !== null) {
          const superPlace = places.find(placeAux => placeAux.id === place.superPlaceId);
          array = [superPlace, ...array];
          place = superPlace;
        }
        return array.map(p => p.name).join(", ");
      } catch (err) {
        // ...
      }
    }
    return "";
  }
}

export default AllWarningsTable;