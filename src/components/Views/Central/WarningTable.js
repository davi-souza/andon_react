import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class WarningTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSelectedToEdit : {},
    };
  }

  render() {
    if(this.props.data.length === 0) {
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
              <TableCell className='txt-align-center'>Resolvido em</TableCell>
              <TableCell className='txt-align-center'>Resolvido por</TableCell>
              <TableCell className='txt-align-center'>Resolver</TableCell>
              <TableCell className='txt-align-center'>Apagar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(warning => (
              <TableRow key={warning.id}>
                <TableCell>{warning.type}</TableCell>
                <TableCell>{warning.reasonName}</TableCell>
                <TableCell>{warning.placeName}</TableCell>
                <TableCell>{warning.userThatCreated}</TableCell>
                <TableCell>{
                  new Date(warning.createdDate).toLocaleString('pt-BR')
                }</TableCell>
                <TableCell>{
                  warning.resolvedDate ?
                  new Date(warning.resolvedDate).toLocaleString('pt-BR') : null
                }</TableCell>
                <TableCell>{warning.userThatResolved}</TableCell>
                <TableCell>
                  <Button
                    color='secondary'
                    onClick={()=>{this.HandleResolveWarning(warning.id)}}
                    disabled={warning.resolvedDate!==null}
                  >
                    <i className='material-icons'>done</i>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color='secondary' disabled>
                    <i className='material-icons'>delete</i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  HandleResolveWarning = (warningId) => {
    if(window.confirm('Confirma a resolução do aviso?')) {
      this.props.resolveWarning(warningId);
    }
  }
}

export default WarningTable;