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
              <TableCell className='txt-align-center'>Nome</TableCell>
              <TableCell className='txt-align-center'>Time Gerente</TableCell>
              <TableCell className='txt-align-center'>Editar</TableCell>
              <TableCell className='txt-align-center'>Remover</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(team => {
              if(team['ID'] === this.state.teamSelectedToEdit['ID']) {
                return (
                  <TableRow key={team['ID']}>
                    <TableCell className='txt-align-center'>{team['ID']}</TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        name='Nome'
                        value={this.state.teamSelectedToEdit['Nome']}
                        onChange={this.HandleSelectedTeamChanges}
                      />
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <TextField
                        select
                        name='ID do time gerente'
                        value={this.state.teamSelectedToEdit['ID do time gerente']}
                        onChange={this.HandleSelectedTeamChanges}
                      >
                        {this.props.data.map(parentId => {
                          if(parentId['ID'] === team['ID']) {
                            return null;
                          } else {
                            return <option key={parentId['ID']} value={parentId['ID']}>{parentId['ID']}</option>
                          }
                        })}
                      </TextField>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={this.ConfirmTeamEdit}>
                        <i className='material-icons'>done</i>
                      </Button>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={this.CancelTeamEdition}>
                        <i className='material-icons'>cancel</i>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              } else {
                return (
                  <TableRow key={team['ID']}>
                    <TableCell className='txt-align-center'>{team['ID']}</TableCell>
                    <TableCell className='txt-align-center'>{team['Nome']}</TableCell>
                    <TableCell className='txt-align-center'>
                      {team['ID do time gerente'] || '' }
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button onClick={()=>{
                          this.SelectTeamToEdit(team);
                        }}
                      >
                        <i className='material-icons'>edit</i>
                      </Button>
                    </TableCell>
                    <TableCell className='txt-align-center'>
                      <Button disabled onClick={()=>{
                          if(window.confirm('Deletar o usuário '+team['ID']+'?')) {
                            this.props.deleteteam(team['ID']);
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
  SelectTeamToEdit = (team) => {
    this.setState({
      teamSelectedToEdit: team
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