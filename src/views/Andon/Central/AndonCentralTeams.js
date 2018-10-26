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
import FullGridPage from '../../../components/Grid/FullGridPage';
import TeamTable from '../../../components/Views/Central/TeamTable';

import CentralContext from '../../../contexts/CentralContext';

class AndonCentralTeamsContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      fieldToFilter: 'id',
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
          title='Central - Times'
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
            this.props.central.loadingIntermediateUsers && 
            <div className='txt-align-center'>
              <CircularProgress color='secondary' size={60} />
            </div>
          }
          {
            !this.props.central.loadingIntermediateUsers && 
            <div className='txt-align-center'>
              <Paper className='margin-bottom-8 padding-top-8 padding-bottom-8'>
                <Grid container>
                  <Grid item xs={3}>
                    {this.props.central.intermediateUsers && this.props.central.intermediateUsers.length !== 0 &&
                      <TextField
                        name="fieldToFilter"
                        className='width-perc-90 margin-top-0'
                        label="Campo"
                        placeholder="Campo"
                        select
                        value={this.state.fieldToFilter}
                        onChange={this.handleFilterChange}
                      >
                        <option value='id'>ID</option>
                        <option value='name'>Nome do líder</option>
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
              <TeamTable
                data={
                  this.props.central.intermediateUsers.sort((a,b) => b.id < a.id).filter(intUserObj => {
                    if(this.state.filterValue === '') {
                      return true
                    }
                    if(this.state.fieldToFilter === 'name') {
                      return regexFilter.test(`${intUserObj.firstname} ${intUserObj.lastname}`.toLowerCase());
                    }
                    return regexFilter.test(intUserObj[this.state.fieldToFilter].toString().toLowerCase());
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
            <MenuItem onClick={this.handleMenuClose} component={Link} to='/andon/central/teams/add'>Adicionar time</MenuItem>
          </Menu> */}
        </FullGridPage>
      </div>
    );
  }
}

const AndonCentralTeams = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <AndonCentralTeamsContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default AndonCentralTeams;