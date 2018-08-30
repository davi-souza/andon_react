import React from 'react';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerAppBar = (props) => {
  return (
    <div>
      <Drawer open={props.open} onClose={()=>props.handleOpenCloseDrawer(false)}>
        <div tabIndex={0} role="button" onClick={()=>props.handleOpenCloseDrawer(false)} onKeyDown={()=>props.handleOpenCloseDrawer(false)}>
          <AppBar position='static' color='primary'>
            <Toolbar className='ds-app-bar-drawer-toolbar'>
              <IconButton className='ds-app-bar-drawer-toolbar-menu' color="inherit" aria-label="Menu" onClick={()=>props.handleOpenCloseDrawer(false)}>
                <i className='material-icons'>menu</i>
              </IconButton>
              <Typography variant='title' color='inherit'>{ props.title?props.title:'DS' }</Typography>
            </Toolbar>
          </AppBar>
          <List component="nav" className='ds-app-bar-drawer-list'>
            {
              props.drawerLinks.map(link => (
                <ListItem button component={Link} to={link.to} key={link.name}>
                  {
                    link.icon?
                    <ListItemIcon>
                      <i className='material-icons'>{link.icon}</i>
                    </ListItemIcon>
                    :
                    null
                  }
                  <ListItemText primary={link.name} />
                </ListItem>
              ))
            }
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default DrawerAppBar;