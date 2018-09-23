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
                <TableCell>{warning.Tipo}</TableCell>
                <TableCell>{warning.Motivo}</TableCell>
                <TableCell>{warning.Local}</TableCell>
                <TableCell>{warning.Autor}</TableCell>
                <TableCell>{
                  new Date(warning['Criado em']).toLocaleString('pt-BR')
                }</TableCell>
                <TableCell>{
                  warning['Resolvido em'] ?
                  new Date(warning['Resolvido em']).toLocaleString('pt-BR') : null
                }</TableCell>
                <TableCell>{warning['Resolvido por']}</TableCell>
                <TableCell>
                  <Button color='secondary'>
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
}

export default WarningTable;