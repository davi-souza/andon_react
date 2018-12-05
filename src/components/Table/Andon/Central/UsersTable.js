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
      centralRegex: new RegExp("central"),
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
              <TableCell className='txt-align-center'>Nível de Acesso</TableCell>
              <TableCell className='txt-align-center'>Senha</TableCell>
              {/* <TableCell className='txt-align-center'>Editar</TableCell>
              <TableCell className='txt-align-center'>Remover</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(user => {
              if(user.id === this.state.userSelectedToEdit.id) {
                return (
                  <TableRow key={user.id}>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='login'
                        value={this.state.userSelectedToEdit.login}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='name'
                        value={this.state.userSelectedToEdit.name}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='jobTitle'
                        value={this.state.userSelectedToEdit.jobTitle || ''}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      {user.level==='central' && 'Central'}
                      {user.level==='intermediate' && 'Recebe de avisos'}
                      {user.level==='leaf' && 'Envia de avisos'}
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='password'
                        value={this.state.userSelectedToEdit.password || ''}
                        onChange={this.HandleSelectedUserChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        select
                        name='teams'
                        value={this.state.userSelectedToEdit.teams[0] ? this.state.userSelectedToEdit.teams[0] : /*this.props.teams[this.props.teams.length-1]*/0}
                        onChange={this.HandleSelectedUserTeamChange}                   
                      >
                        {this.props.teams.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </TextField>
                    </TableCell>
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
      userSelectedToEdit: Object.assign({},user),
    });
  }
  HandleSelectedUserChanges = (event) => {
    let UserData = this.state.userSelectedToEdit;
    UserData[event.target.name] = event.target.value;
    this.setState({
      userSelectedToEdit: UserData,
    });
  }
  HandleSelectedUserTeamChange = (event) => {
    let UserData = this.state.userSelectedToEdit;
    UserData.teams = []
    UserData.teams.push(event.target.value);
    this.setState({
      userSelectedToEdit: UserData,
    });
  }
  ConfirmUserEdit = () => {
    if(window.confirm('Tem certeza das mudanças?')) {
      this.props.updateUser(this.state.userSelectedToEdit);
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