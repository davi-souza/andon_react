import React, {Component} from 'react';
// import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import Container from '../../../components/Grid/Container';
import UserTable from '../../../components/Table/Andon/Central/UsersTable';

import CentralContext from '../../../contexts/CentralContext';

class AndonCentralUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fieldToFilter: 'login',
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
      <CentralContext.Consumer>
        { central => 
          <div>
            <AppBarComponent
              title='ANDON'
              position='fixed'
              drawerLinks={[
                {name:'Avisos',to:'/andon/central/warnings',icon:'warning'},
                {name:'Usuários',to:'/andon/central/users',icon:'person'},
                {name:'Times',to:'/andon/central/teams',icon:'people'},
                {name:'Dashboard',to:'/andon/central/dashboard',icon:'show_chart'},
                {name:'Log Out',to:'/andon/logout',icon:'exit_to_app',divider:true}
              ]}  
            />
            <Container appbarFixed fullPage>
              {
                central.leafUsersLoading && 
                <div className='txt-align-center'>
                  <CircularProgress color='secondary' size={60} />
                </div>
              }
              {
                !central.leafUsersLoading && central.leafUsers.length !== 0 &&
                <div className='txt-align-center'>
                  <Paper className='margin-bottom-8 padding-top-8 padding-bottom-8'>
                    <Grid container>
                      <Grid item xs={3}>
                        {central.leafUsers && central.leafUsers.length !== 0 &&
                          <TextField
                            select
                            name="fieldToFilter"
                            className='width-perc-90 margin-top-0'
                            label="Campo"
                            placeholder="Campo"
                            value={this.state.fieldToFilter}
                            onChange={this.handleFilterChange}
                          >
                            <option value={'login'}>Matrícula</option>
                            <option value={'name'}>Nome</option>
                            <option value={'jobTitle'}>Título</option>
                          </TextField>
                        }
                      </Grid>
                      <Grid item xs={9}>
                      <TextField
                        name="filterValue"
                        className='width-perc-90 margin-top-0'
                        label='Filtro'
                        placeholder='Filtro'
                        value={this.state.filter}
                        margin='normal'
                        onChange={this.handleFilterChange}
                      />
                      </Grid>
                    </Grid>
                  </Paper>
                  <UserTable
                    data={
                      central.leafUsers.sort((a,b) => b.id < a.id).filter(userObj => {
                        if(this.state.filterValue === '') {
                          return true
                        }
                        if (this.state.fieldToFilter === 'login' || this.state.fieldToFilter === 'jobTitle') {
                          return regexFilter.test(userObj[this.state.fieldToFilter].toLowerCase());
                        } else {
                          return regexFilter.test(`${userObj.firstname} ${userObj.lastname}`.toLowerCase());
                        }
                      })
                    }
                  />
                </div>
              }
              {/* <Button className='corner-right-bottom' variant='fab' color='secondary' onClick={this.handleMenuOpen}>
                <i className='material-icons'>add</i>
              </Button>
              <Menu
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleMenuClose} component={Link} to='/andon/central/users/add'>Adicionar usuário</MenuItem>
              </Menu> */}
            </Container>
          </div>
        }
      </CentralContext.Consumer>
    );
  }
}

const AndonCentralUsersContext = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <AndonCentralUsersContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default AndonCentralUsers;