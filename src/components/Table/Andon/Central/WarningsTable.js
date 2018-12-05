import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class WarningsTable extends Component {
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
              <TableCell className='txt-align-center'>Autor</TableCell>
              <TableCell className='txt-align-center'>Criado em</TableCell>
              <TableCell className='txt-align-center'>Tempo pendente</TableCell>
              <TableCell className='txt-align-center'>Resolver</TableCell>
              {/* <TableCell className='txt-align-center'>Apagar</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.warnings.map(warning => (
              <TableRow key={warning.id} className={this.getWarningRowColor(warning.type)}>
                <TableCell className='txt-align-center'>{warning.type}</TableCell>
                <TableCell className='txt-align-center'>{warning.reason.name}</TableCell>
                <TableCell className='txt-align-center'>{warning.place.name}</TableCell>
                <TableCell className='txt-align-center'>{`${warning.userThatCreated.firstname} ${warning.userThatCreated.lastname}`}</TableCell>
                <TableCell className='txt-align-center'>{
                  new Date(warning.createdDate).toLocaleString('pt-BR')
                }</TableCell>
                <TableCell className='txt-align-center'>
                  {
                    this.handleOpenTime(warning.createdDate)
                  }
                </TableCell>
                <TableCell className="txt-align-center">
                  <Button
                    variant="contained"
                    color='secondary'
                    onClick={()=>{this.props.resolve(warning.id)}}
                    disabled={warning.resolvedDate!==null}
                  >
                    <i className='material-icons'>
                      {warning.resolvedDate!==null ? 
                        "block":"done"
                      }
                    </i>
                  </Button>
                </TableCell>
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

  getWarningRowColor = (type) => {
    if(type === "ALERTA") {
      return "bg-color-yellow-light";
    } else {
      return "bg-color-red-light";
    }
  }

  handleOpenTime = (createdDate) => {
    let label = "segundo";
    let openTime = (Date.now() - (new Date(createdDate)).getTime())/1000;
    if(openTime > 60) {
      label = "minuto";
      openTime /= 60;
    }
    if(openTime > 60) {
      label = "hora";
      openTime /= 60;
    }
    if(openTime > 24) {
      label = "dia";
      openTime /= 24;
    }
    return `${openTime.toFixed(0)} ${label}(s)`;
  }
}

export default WarningsTable;