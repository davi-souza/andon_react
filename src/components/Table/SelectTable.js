import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
    console.log(this.props.data);
    return (
      <Paper>
        <Toolbar>
          <Typography variant="title" style={styles.flex}>Fulano</Typography>
          <p>a</p>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    )
  }
}

export default SelectTable;