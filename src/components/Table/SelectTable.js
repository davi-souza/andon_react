import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  flex: {
    flex: 1,
  }
}

class SelectTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.teamLeader);
    return (
      <Paper>
        <Toolbar>
          <Typography variant="title" style={styles.flex}>
            { this.props.teamLeader && `Líder: ${this.props.teamLeader.firstname} ${this.props.teamLeader.lastname}` || "" }
          </Typography>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Membro</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.leafUsers && this.props.leafUsers.map(leaf => (
              <TableRow key={leaf.id}>
                <TableCell>
                  <Checkbox
                    color="secondary"
                    checked={this.handleChecked(leaf.id)}
                    onChange={this.handleCheckboxChange}
                  />
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
      let member = this.props.teamLeader.teamMembers.find(m => m.id == leafId);
      if(member) {
        return true;
      }
      return false;
    }
    return false;
  }

  handleCheckboxChange = (e) => {
    if(window.confirm("Tem certeza?")) {
      
    }
    // console.log(e.target.value);
  }
}

export default SelectTable;