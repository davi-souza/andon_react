import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// import FullGridPage from '../Grid/FullGridPage';
import DrawerAppBar from '../Drawer/DrawerAppBar';

class Appbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  handleOpenCloseDrawer = (value) => {
    this.setState({
      drawerOpen: value,
    });
  }

  render() {
    return (
      <AppBar position={this.props.position?this.props.position:'static'}>
        <Toolbar>
          {
            this.props.drawerLinks?
            <IconButton className='appbar-menu' color="inherit" aria-label="Menu" onClick={()=>this.handleOpenCloseDrawer(true)}>
              <i className='material-icons'>menu</i>
            </IconButton>
            :
            null
          }
          <Typography variant='title' color='inherit' className='appbar-title'>
            { this.props.title || 'DIA' }
          </Typography>
          {
            this.props.toolbarLinks ?
            this.props.toolbarLinks.map(link => (
              <Button color='inherit' component={Link} to={link.to} key={link.name}>
                {link.name}
              </Button>
            ))
            :
            null
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default Appbar;