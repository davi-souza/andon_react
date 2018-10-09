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
import Divider from '@material-ui/core/Divider';

const DrawerAppBar = (props) => {
  return (
    <div>
      <Drawer open={props.open} onClose={()=>props.handleOpenCloseDrawer(false)}>
        <div tabIndex={0} role="button" onClick={()=>props.handleOpenCloseDrawer(false)} onKeyDown={()=>props.handleOpenCloseDrawer(false)}>
          <AppBar position='static' color='primary'>
            <Toolbar>
              <IconButton className='app-bar-menu' color="inherit" aria-label="Menu" onClick={()=>props.handleOpenCloseDrawer(false)}>
                <i className='material-icons'>menu</i>
              </IconButton>
              <Typography variant='title' color='inherit'>{ props.title?props.title:'DS' }</Typography>
            </Toolbar>
          </AppBar>
          <List component="nav" className='width-drawer-18'>
            {
              props.drawerLinks.map(link => (
                <div key={link.name}>
                  {link.divider? <Divider /> : null}
                  <ListItem button component={Link} to={link.to}>
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
                </div>
              ))
            }
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default DrawerAppBar;