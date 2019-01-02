import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';

class UserTable extends Component {
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
              <TableCell className='txt-align-center'>Matrícula</TableCell>
              <TableCell className='txt-align-center'>Nome</TableCell>
              <TableCell className='txt-align-center'>Título</TableCell>
              <TableCell className='txt-align-center'>Nível de Acesso</TableCell>
              <TableCell className='txt-align-center'>Senha</TableCell>
              {/* <TableCell className='txt-align-center'>Editar</TableCell>
              <TableCell className='txt-align-center'>Remover</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(user => (
              <TableRow key={user.id}>
                <TableCell className='txt-align-center'>{user.login}</TableCell>
                <TableCell className='txt-align-center'>{`${user.firstname} ${user.lastname}`}</TableCell>
                <TableCell className='txt-align-center'>
                  {user.jobTitle ? user.jobTitle : 'Sem título'}
                </TableCell>
                <TableCell className='txt-align-center'>
                  {user.level==='central' && 'Central'}
                  {user.level==='intermediate' && 'Recebe de avisos'}
                  {user.level==='leaf' && 'Envia de avisos'}
                </TableCell>
                <TableCell className='txt-align-center'>{user.password || ''}</TableCell>
                {/* <TableCell className='txt-align-center'>
                  <Button
                    disabled={this.state.centralRegex.test(`${user.firstname} ${user.lastname}`) || true}
                    onClick={()=>{
                      this.SelectUserToEdit(user);
                    }}
                  >
                    <i className='material-icons'>edit</i>
                  </Button>
                </TableCell>
                <TableCell className='txt-align-center'>
                  <Button
                    disabled={this.state.centralRegex.test(`${user.firstname} ${user.lastname}`.toLowerCase()) || true}
                    onClick={()=>{
                      if(window.confirm('Deletar o usuário '+user.id+'?')) {
                        this.props.deleteUser(user.id);
                      }
                    }}>
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
}

export default UserTable;