import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TeamTable extends Component {
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
              <TableCell className='txt-align-center'>ID</TableCell>
              <TableCell className='txt-align-center'>Nome do líder</TableCell>
              <TableCell className='txt-align-center'>Nível de acesso</TableCell>
              <TableCell className='txt-align-center'>Membros do time</TableCell>
              {/* <TableCell className='txt-align-center'>Editar</TableCell>
              <TableCell className='txt-align-center'>Remover</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(interUser => {
              if(interUser.id === this.state.teamSelectedToEdit.id) {
                return (
                  <TableRow key={interUser.id}>
                    <TableCell className='txt-align-center'>{interUser.id}</TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='name'
                        value={this.state.teamSelectedToEdit.name}
                        onChange={this.HandleSelectedTeamChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      {interUser.level==='central' && 'Central'}
                      {interUser.level==='intermediate' && 'Recebe Avisos'}
                      {interUser.level==='leaf' && 'Envia Avisos'}
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        select
                        name='parentId'
                        value={this.state.teamSelectedToEdit.parentId}
                        onChange={this.HandleSelectedTeamChanges}
                      >
                        {this.props.data.map(parent => {
                          if(parent.id === interUser.id) {
                            return null;
                          } else {
                            return <option key={parent.id} value={parent.id}>{parent.id}</option>
                          }
                        })}
                      </TextField>
                    </TableCell>
                    {/* <TableCell className='txt-align-center'>
                      <Button onClick={this.ConfirmTeamEdit}>
                        <i className='material-icons'>done</i>
                      </Button>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={this.CancelTeamEdition}>
                        <i className='material-icons'>cancel</i>
                      </Button>
                    </TableCell> */}
                  </TableRow>
                )
              } else {
                return (
                  <TableRow key={interUser.id}>
                    <TableCell className='txt-align-center'>{interUser.id}</TableCell>
                    <TableCell className='txt-align-center'>{`${interUser.firstname} ${interUser.lastname}`}</TableCell>
                    <TableCell className='txt-align-center'>
                      { interUser.level === 'intermediate' && 'Recebe avisos'}
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      {interUser.teamMembers.map((member,index) => (
                        interUser.teamMembers.length-1===index ?
                        <span key={index}>{`${member.firstname} ${member.lastname}`}</span>
                        :
                        <span key={index}>{`${member.firstname} ${member.lastname}, `}</span>
                      ))}
                    </TableCell>
                    {/* <TableCell className='txt-align-center'>
                      <Button onClick={()=>{
                          this.SelectTeamToEdit(interUser);
                        }}
                        disabled
                      >
                        <i className='material-icons'>edit</i>
                      </Button>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button disabled onClick={()=>{
                          if(window.confirm('Deletar o usuário '+interUser.id+'?')) {
                            this.props.deleteteam(interUser.id);
                          }
                        }}
                      >
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
  SelectTeamToEdit = (interUser) => {
    this.setState({
      teamSelectedToEdit: interUser
    });
  }
  HandleSelectedTeamChanges = (event) => {
    let TeamData = this.state.teamSelectedToEdit;
    TeamData[event.target.name] = event.target.value;
    this.setState({
      teamSelectedToEdit: TeamData,
    });
  }
  ConfirmTeamEdit = () => {
    console.log(this.state.teamSelectedToEdit);
    if(window.confirm('Tem certeza das mudanças?')) {
      this.props.editTeam(this.state.teamSelectedToEdit);
      this.CancelTeamEdition();
    } 
  }
  CancelTeamEdition = () => {
    this.setState({
      teamSelectedToEdit: {},
    });
  }
}

export default TeamTable;