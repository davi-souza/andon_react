import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectedToEdit : {},
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
              <TableCell className='txt-align-center'>Matrícula</TableCell>
              <TableCell className='txt-align-center'>Nome</TableCell>
              <TableCell className='txt-align-center'>Título</TableCell>
              <TableCell className='txt-align-center'>Senha</TableCell>
              <TableCell className='txt-align-center'>Times</TableCell>
              <TableCell className='txt-align-center'>Editar</TableCell>
              <TableCell className='txt-align-center'>Remover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(user => {
              if(user['ID'] === this.state.userSelectedToEdit['ID']) {
                return (
                  <TableRow key={user['ID']}>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='Matrícula'
                        value={this.state.userSelectedToEdit['Matrícula']}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='Nome'
                        value={this.state.userSelectedToEdit['Nome']}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='Título'
                        value={this.state.userSelectedToEdit['Título']}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='Senha'
                        value={this.state.userSelectedToEdit['Senha']}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>{user.Times.map(time => String(time)+' ')}</TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={this.ConfirmUserEdit}>
                        <i className='material-icons'>done</i>
                      </Button>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={this.CancelUserEdition}>
                        <i className='material-icons'>cancel</i>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              } else {
                return (
                  <TableRow key={user['ID']}>
                    <TableCell className='txt-align-center'>{user['Matrícula']}</TableCell>
                    <TableCell className='txt-align-center'>{user['Nome']}</TableCell>
                    <TableCell className='txt-align-center'>
                      {user['Título']? user['Título'] : 'Sem título'}
                    </TableCell>
                    <TableCell className='txt-align-center'>{user.Senha}</TableCell>
                    <TableCell className='txt-align-center'>{user.Times.map(time => String(time)+' ')}</TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={()=>{
                          this.SelectUserToEdit(user);
                        }}
                      >
                        <i className='material-icons'>edit</i>
                      </Button>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={()=>{
                          if(window.confirm('Deletar o usuário '+user['ID']+'?')) {
                            this.props.deleteUser(user['ID']);
                          }
                        }}>
                        <i className='material-icons'>delete</i>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  SelectUserToEdit = (user) => {
    this.setState({
      userSelectedToEdit: user
    });
  }
  HandleSelectedUserChanges = (event) => {
    let UserData = this.state.userSelectedToEdit;
    UserData[event.target.name] = event.target.value;
    this.setState({
      userSelectedToEdit: UserData,
    });
  }
  ConfirmUserEdit = () => {
    if(window.confirm('Tem certeza das mudanças?')) {
      this.props.editUser(this.state.userSelectedToEdit);
      this.CancelUserEdition();
    } 
  }
  CancelUserEdition = () => {
    this.setState({
      userSelectedToEdit: {},
    });
  }
}

export default UserTable;