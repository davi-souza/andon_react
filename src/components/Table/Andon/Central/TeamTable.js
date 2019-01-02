import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class TeamTable extends Component {
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
              <TableCell className='txt-align-center'>Responsável</TableCell>
              <TableCell className='txt-align-center'>Nível de acesso</TableCell>
              <TableCell className='txt-align-center'>Equipe</TableCell>
              <TableCell className='txt-align-center'>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map(interUser => {
              return (
                <TableRow key={interUser.id}>
                  <TableCell className='txt-align-center'>{interUser.login}</TableCell>
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
                  <TableCell className='txt-align-center'>
                    <Button onClick={() => { this.props.history.push(`/andon/central/teams/${interUser.id}`) }} color="secondary">
                      <i className='material-icons'>edit</i>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default TeamTable;