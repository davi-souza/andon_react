import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  flex: {
    flex: 1,
  }
}

class SelectTable extends Component {
  render() {
    return (
      <Paper>
        <Toolbar>
          <IconButton component={Link} to={"/andon/central/teams"} color="secondary">
            <i className="material-icons">navigate_before</i>
          </IconButton>
          <Typography variant="title" style={styles.flex}>
            { this.props.teamLeader ? `Líder: ${this.props.teamLeader.firstname} ${this.props.teamLeader.lastname}` : "" }
          </Typography>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Membro</TableCell>
              <TableCell>Matrícula</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.leafUsers && this.props.leafUsers.map(leaf => (
              <TableRow key={leaf.id}>
                <TableCell>
                  {this.props.loadingTeamUpdate ?
                    <CircularProgress color="secondary" size={32} className="margin-top-8 margin-bottom-8" />
                    :
                    <Checkbox
                      color="secondary"
                      checked={this.handleChecked(leaf.id)}
                      onChange={() => { this.handleCheckboxChange(leaf) }}
                    />
                  }
                </TableCell>
                <TableCell>
                  {leaf.login}
                </TableCell>
                <TableCell>
                  {`${leaf.firstname} ${leaf.lastname}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  handleChecked = (leafId) => {
    if(this.props.teamLeader) {
      let member = this.props.teamLeader.teamMembers.find(m => m.id === leafId);
      if(member) {
        return true;
      }
      return false;
    }
    return false;
  }

  handleCheckboxChange = async (leaf) => {
    if(this.props.teamLeader.teamMembers.filter(member => member.id === leaf.id).length === 0) {

      if(window.confirm(`Tem certeza que deseja adicionar ${leaf.firstname} ${leaf.lastname}?`)) {
        await this.props.addTeamMember(this.props.teamLeader.id,leaf.id);
      }

    } else {

      if(window.confirm(`Tem certeza que deseja remover ${leaf.firstname} ${leaf.lastname}?`)) {
        await this.props.removeTeamMember(this.props.teamLeader.id,leaf.id);
      }

    }
  }
}

export default SelectTable;