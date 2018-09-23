import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import FullGridPage from '../../../components/Grid/FullGridPage';
import UserTable from '../../../components/Views/Central/UserTable';

import CentralContext from '../../../contexts/CentralContext';

class AndonCentralUsersContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fieldToFilter: 'Matrícula',
      filterValue: '',
    };
  }
  handleFilterChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }
  render() {
    let regexFilter = new RegExp(`[a-zA-Z0-9]*${this.state.filterValue}[a-zA-Z0-9]*`);
    return (
      <div>
        <AppBarComponent
          title='Central - Usuários'
          position='fixed'
          drawerLinks={[
            {name:'Gerenciar Avisos',to:'/andon/central/warnings',icon:'warning'},
            {name:'Gerenciar Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Gerenciar Times',to:'/andon/central/teams',icon:'people'},
            {to:'/andon/logout',name:'Log Out',icon:'exit_to_app',divider:true}
          ]}  
        />
        <FullGridPage viewContent appBarFixed>
          {
            this.props.central.loadingUsers && 
            <div className='txt-align-center'>
              <CircularProgress color='secondary' size={60} />
            </div>
          }
          {
            !this.props.central.loadingUsers && this.props.central.users.length !== 0 && 
            <div className='txt-align-center'>
              <Grid container>
                <Grid item xs={3}>
                  {this.props.central.users && this.props.central.users.length !== 0 &&
                    <TextField
                      select
                      name="fieldToFilter"
                      className='w-90 margin-top-0'
                      label="Campo"
                      placeholder="Campo"
                      value={this.state.fieldToFilter}
                      onChange={this.handleFilterChange}
                    >
                      {
                        ['Matrícula','Nome','Título'].map(key => (
                          <option key={key} value={key}>{key}</option>
                        ))
                      }
                    </TextField>
                  }
                </Grid>
                <Grid item xs={9}>
                <TextField
                  name="filterValue"
                  className='w-90 margin-top-0'
                  label='Filtro'
                  placeholder='Filtro'
                  value={this.state.filter}
                  margin='normal'
                  onChange={this.handleFilterChange}
                />
                </Grid>
              </Grid>
              <UserTable
                data={
                  this.props.central.users.sort((a,b) => b['ID'] < a['ID']).filter(userObj => {
                    if(this.state.filterValue === '') {
                      return true
                    }
                    return regexFilter.test(userObj[this.state.fieldToFilter]);
                  })
                }
                deleteUser={this.props.central.deleteUser}
                editUser={this.props.central.editUser}
              />
            </div>
          }
          <Button className='corner-right-bottom' variant='fab' color='secondary' onClick={this.handleMenuOpen}>
            <i className='material-icons'>add</i>
          </Button>
          <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleMenuClose} component={Link} to='/andon/central/users/add'>Adicionar usuário</MenuItem>
            {/* <MenuItem onClick={this.handleMenuClose}>Adicionar múltiplos usuários</MenuItem> */}
          </Menu>
        </FullGridPage>
      </div>
    );
  }
}

const AndonCentralUsers = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <AndonCentralUsersContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default AndonCentralUsers;