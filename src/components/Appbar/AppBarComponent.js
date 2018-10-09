import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// import FullGridPage from '../Grid/FullGridPage';
import DrawerAppBar from '../Drawer/DrawerAppBar';

class AppBarComponent extends Component {
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
      <div>
        <AppBar position={this.props.position?this.props.position:'static'}>
          <Toolbar>
            {
              this.props.drawerLinks?
              <IconButton className='app-bar-menu' color="inherit" aria-label="Menu" onClick={()=>this.handleOpenCloseDrawer(true)}>
                <i className='material-icons'>menu</i>
              </IconButton>
              :
              null
            }
            <Typography variant='title' color='inherit' className='app-bar-title'>{ this.props.title || 'ANDON' }</Typography>
            {
              this.props.toolbarLinks?
              this.props.toolbarLinks.map(link => (
                <div key={link.name}>
                  <Button color='inherit' className='hide-when-not-sm' component={Link} to={link.to}>
                    <i className='material-icons'>{link.icon}</i>
                  </Button>
                  <Button color='inherit' className='hide-when-sm' component={Link} to={link.to}>
                    {link.name}
                  </Button>
                </div>
              ))
              :
              null
            }
          </Toolbar>
        </AppBar>
        {
          this.props.drawerLinks?
          <DrawerAppBar title={this.props.title||'Menu'} drawerLinks={this.props.drawerLinks} open={this.state.drawerOpen} handleOpenCloseDrawer={this.handleOpenCloseDrawer} />
          :
          null
        }
      </div>
    );
  }
}

export default AppBarComponent;